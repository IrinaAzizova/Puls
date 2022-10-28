const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

function server() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
};

function styles() {
    return src('src/sass/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      rename({
        prefix: '',
        suffix: '.min'
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
};

function watchUpdates() {
    watch('src/sass/*.+(scss|sass)', styles);
    watch('src/*.html').on('change', browserSync.reload);
};

function defaultTask() {
    server();
    styles();
    watchUpdates();
};

exports.default = defaultTask; 