var gulp            = require('gulp');
var postcss         = require('gulp-postcss');
var atImport        = require('postcss-import');
var cssnext         = require('postcss-cssnext');
var nano            = require('gulp-cssnano');
var mqpacker        = require('css-mqpacker');
var nested          = require('postcss-nested');
var colorAlpha      = require('postcss-color-alpha');
var reporter        = require('postcss-reporter');
var stylelint       = require('stylelint');
var typograf        = require('gulp-typograf');
var browserSync     = require('browser-sync').create();
var child           = require('child_process');
var gutil           = require('gulp-util');

var siteRoot = '_site';
var cssFiles = 'src/css/**/*.css';
var additionalCssFiles = 'src/css/posts/**/*.css';
var typografFiles = ['./**/*.md', '!_site/**/*.*'];

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
  mqpacker,
  stylelint,
  reporter({ clearReportedMessages: true })
];

gulp.task('typograf', function() {
  gulp.src(typografFiles, { base: './' })
    .pipe(typograf({
      locale: ['ru'],
      disableRule: [
        'common/number/mathSigns',
        'common/number/times',
        'common/punctuation/*',
        'common/space/*',
        'common/symbols/*',
        'common/other/*',
        'ru/dash/*',
        'ru/money/*',
        'ru/nbsp/ps',
        'ru/number/comma',
        'ru/other/phone-number',
        'ru/punctuation/*',
        'ru/typo/switchingKeyboardLayout'
      ]
    }))
    .pipe(gulp.dest('.'));
});

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
  return gulp.src(additionalCssFiles)
    .pipe(gulp.dest('css/posts'));
});

gulp.task('jekyll', function() {
  var jekyll = child.spawn('jekyll', ['build',
    '--watch',
    // '--incremental'
  ]);

  var jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', function() {

  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    open: false,
    notify: false,
    logLevel: 'silent'
  });

  gulp.watch(cssFiles, ['css']);
  gulp.watch(additionalCssFiles, ['additional-css']);
});

gulp.task('default', ['css', 'additional-css', 'jekyll', 'serve']);
