const OUTPUT_DIRECTORY = require('./constants').OUTPUT_DIRECTORY;
const autoprefixer = require('gulp-autoprefixer');

const onError = function (err) {
    const gutil = require('gulp-util');
    gutil.beep();
    gutil.log("Error: [line " + err.lineNumber + "] " + err.message);
    this.emit('end');
};

function buildLess(gulp) {
    return () => {
        const less = require('gulp-less')({});
        less.on('error', onError);

        return gulp.src('./app/index.less')
            .pipe(less)
            .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
            .pipe(gulp.dest(OUTPUT_DIRECTORY + 'css/'));
    };
}

module.exports = buildLess;