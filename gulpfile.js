const browserSync = require('browser-sync');
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
 
function runServer() {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
  });
}
 
function sassToCss() {
  return src('src/sass/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      rename({
        prefix: '',
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}
 
function watchChanges() {
  watch('src/sass/**/*.+(scss|sass)', sassToCss);
  watch('src/*.html').on('change', browserSync.reload);
}
 
function defaultTask() {
  runServer();
  sassToCss();
  watchChanges();
}
 
exports.default = defaultTask;