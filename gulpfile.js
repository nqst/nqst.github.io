var gulp               = require('gulp');
var postcss            = require('gulp-postcss');
var touch              = require('gulp-touch-cmd');
var atImport           = require('postcss-import');
var postcssPresetEnv   = require('postcss-preset-env');
var nano               = require('cssnano');
var cssVariables       = require('postcss-css-variables');
// var mqpacker           = require('node-css-mqpacker');
var nested             = require('postcss-nested');
var reporter           = require('postcss-reporter');
var stylelint          = require('stylelint');
var typograf           = require('gulp-typograf');
var browserSync        = require('browser-sync').create();
var child              = require('child_process');
var beeper             = require('beeper');
var log                = require('fancy-log');

var siteRoot = '_site';
var cssFiles = 'src/css/**/*.css';
var additionalCssFiles = 'src/css/posts/**/*.css';
var typografFiles = ['**/*.md', '!_posts/{2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022}-*.md', '!_site/**/*.*'];

function handleError(err) {
  console.log(err.toString());
  beeper();
  this.emit('end');
}

var processors = [
  atImport,
  cssVariables,
  nested,
  postcssPresetEnv({
    browsers: ['last 2 versions', '> 1%'],
    features: {
      'nesting-rules': false
    },
    // stage: 2,
  }),
  // mqpacker,
  stylelint,
  nano({
    safe: true,
    autoprefixer: false,
    normalizeUrl: false,
    discardComments: {
      removeAll: true
    }
  }),
  reporter({
    clearReportedMessages: true
  })
];

gulp.task('typograf', function() {
  return gulp.src(typografFiles, { base: './' })
    .pipe(typograf({
      locale: ['uk', 'ru'],
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
    .on('error', handleError)
    .pipe(gulp.dest('css/'))
    .pipe(touch());
});

gulp.task('additional-css', function() {
  return gulp.src(additionalCssFiles)
    .pipe(gulp.dest('css/posts'));
});

gulp.task('jekyll', function() {
  var jekyll = child.spawn('jekyll', ['build', '--watch']);

  var jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => log('Jekyll: ' + message));
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

  gulp.watch(cssFiles, gulp.series('css'));
  gulp.watch(additionalCssFiles, gulp.series('additional-css'));
});

gulp.task('default',
  gulp.parallel('css', 'additional-css', 'jekyll', 'serve')
);
