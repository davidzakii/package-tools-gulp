const { src, dest, watch } = require('gulp')
const { parallel,  series } = require('gulp');
const GulpCleanCss = require('gulp-clean-css');
const gulpConcat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const gulpterser = require('gulp-terser')
const gulpimg = require('gulp-imagemin');

let globs = {
    html: './project/*.html',
    js: './project/js/*.js',
    css: './project/css/**/*.css',
    img:'./project/pics/*'
}

function htmltask() {
    return src(globs.html)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(dest('dist'));
}

function jsTask() {
    return src(globs.js)
        .pipe(gulpConcat('script.min.js'))
        .pipe(gulpterser())
        .pipe(dest('dist/assets'));
}

function cssTask() {
    return src(globs.css)
        .pipe(gulpConcat('style.min.css')).pipe(GulpCleanCss())
        .pipe(dest('dist/assets'))
}

function imgTask() {
    return src(globs.img)
        .pipe(gulpimg()).pipe(dest('dist/images'))
}

function watachTask() {
    watch(globs.html, htmltask)
    watch(globs.css, cssTask)
    watch(globs.js, jsTask)
    watch(globs.img, imgTask)
}

exports.default= series(parallel(htmltask, jsTask, cssTask, imgTask), watachTask) 