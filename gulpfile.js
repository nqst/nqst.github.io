var gulp           = require('gulp');
var postcss        = require('gulp-postcss');
var atImport       = require('postcss-import');
var cssnext        = require('postcss-cssnext');
var nano           = require('gulp-cssnano');
var mqpacker       = require('css-mqpacker');
var nested         = require('postcss-nested');
var colorAlpha     = require('postcss-color-alpha');
var browserSync    = require('browser-sync').create();
var shell          = require('gulp-shell');
var cp             = require('child_process');

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

gulp.task('css', function(){
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

gulp.task('additional-css', function(){
  return gulp.src(['src/css/posts/**/*'])
    .pipe(gulp.dest('css/posts'));
});

gulp.task('js', function(){
  // @todo: add js
});

gulp.task('jekyll-build', shell.task(['jekyll build --incremental --watch']));

// gulp.task('jekyll-rebuild', ['jekyll-build'], function(){
//   browserSync.reload();
// });
// gulp.task('jekyll-build', function(done){
//   return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
// });

gulp.task('watch', function(){
  gulp.watch('src/css/**/*.css', ['css', 'additional-css']);
  // gulp.watch('_site/**/*.*').on('change', browserSync.reload);
  // gulp.watch([
  //   'index.html',
  //   'blog/index.html',

  //   '_layouts/*.html',
  //   '_posts/*.md',
    
  //   'css/main.css',
  //   'js/**/*.js',
  //   'i/**/*.*'
  // ], ['jekyll-rebuild']);

});

gulp.task('serve', function() {

  browserSync.init({
    server: {
      baseDir: '_site/'
    },
    open: false,
    notify: false
  });

  
  //gulp.watch('_site/**/*.*');
  //gulp.watch('_site/**/*.*').on('change', browserSync.reload);
  // gulp.watch('_assets/css/main.css').on('change', browserSync.reload);
});

// gulp.task('default', ['css', 'jekyll-build', 'watch', 'serve']);
gulp.task('default', ['css', 'additional-css', 'watch']);