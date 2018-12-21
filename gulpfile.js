// eslint-disable
const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');

const isProduction = () => process.env.NODE_ENV === 'production';
const constants = require('./gulp/constants');
const OUTPUT_DIRECTORY = constants.OUTPUT_DIRECTORY;

process.env.NODE_ENV = gutil.env.prod != null ? 'production' : 'development';

gulp.task('build-html', require('./gulp/build-html').buildHtml(gulp));
gulp.task('cachebuster', require('./gulp/build-html').addCachebuster(gulp));
gulp.task('build-less', require('./gulp/build-less')(gulp));
gulp.task('build-js', require('./gulp/build-js').buildJs(gulp));
gulp.task('build-js-watchify', require('./gulp/build-js').buildJsWatchify(gulp));
gulp.task('build-moment', require('./gulp/build-js').buildMoment(gulp));
gulp.task('build-vendors', gulp.series(['build-moment']), require('./gulp/build-js').buildVendors(gulp));
gulp.task('eslint', require('./gulp/eslint')(gulp));
gulp.task('copy-img', require('./gulp/copy-img').copyImg(gulp));
gulp.task('test', require('./gulp/tests').test(gulp, false));
gulp.task('test-tdd', require('./gulp/tests').test(gulp, true));
gulp.task('tdd', gulp.series(['test-tdd']), require('./gulp/tests').watch(gulp));

gulp.task('build', gulp.series(['eslint', 'build-js', 'build-vendors', 'build-html', 'build-less', 'copy-img']), () => {
    gulp.start(['cachebuster']);
});

gulp.task('clean', function (callback) {
    const del = require('del');
    return del([
        // Delete all copied images and built .js- and .css-files in outputDirectory
        OUTPUT_DIRECTORY + 'img/',
        OUTPUT_DIRECTORY + 'js/',
        OUTPUT_DIRECTORY + 'css/',
        OUTPUT_DIRECTORY + 'index.html'
    ], { 'force': true }, callback);
});

gulp.task('watch', gulp.series(['clean','build-html', 'build-vendors', 'build-js-watchify', 'build-less', 'copy-img']), function () {
    // process.env.NODE_ENV = 'development';

    // gulp.task([]);
    gulp.watch('./app/**/*.less', ['build-less']);
});

gulp.task('default', gulp.series(['build']), function () {
    // gutil.log("-------- Start building for " + (isProduction() ? "production" : "development"));
    // gulp.task('build');
});
