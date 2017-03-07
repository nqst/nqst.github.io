var gulp           = require('gulp');
var postcss        = require('gulp-postcss');
var atImport       = require('postcss-import');
var cssnext        = require('postcss-cssnext');
var nano           = require('gulp-cssnano');
var mqpacker       = require('css-mqpacker');
var nested         = require('postcss-nested');
var colorAlpha     = require('postcss-color-alpha');
var browserSync    = require('browser-sync').create();
var child          = require('child_process');
var gutil          = require('gulp-util');

var siteRoot = '_site';
var cssFiles = 'src/css/**/*.css';

var processors = [
  atImport,
  cssnext({
    browsers: ['last 2 versions'],
    features: {
      nesting: false
    }
  }),
  nested,
  colorAlpha,
  mqpacker
];

gulp.task('css', function() {
  return gulp.src('src/css/main.css')
    .pipe(postcss(processors))
    .pipe(nano({
      safe: true,
      autoprefixer: false,
      normalizeUrl: false,
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('additional-css', function() {
  return gulp.src(['src/css/posts/**/*'])
    .pipe(gulp.dest('css/posts'));
});

gulp.task('jekyll', function() {
  var jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental'
  ]);

  var jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('watch', function() {
  gulp.watch(cssFiles, ['css', 'additional-css']);
});

gulp.task('serve', function() {

  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    open: false,
    notify: false
  });

  gulp.watch(cssFiles, ['css', 'additional-css']);
});

gulp.task('default', ['css', 'additional-css', 'jekyll', 'serve']);
