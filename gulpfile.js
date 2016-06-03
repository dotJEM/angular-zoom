
var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["build-ts", "build-css"]);

gulp.task("build-ts", function () {
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(rename('dotjem-angular-zoom.js'))
        .pipe(gulp.dest("dist"))
        .pipe(rename('dotjem-angular-zoom.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
    gulp.src('./src/styles.scss')
        .pipe(cssGlobbing({ extensions: ['.scss'] }))
        .pipe(gulp.dest("dist"))
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('dotjem-angular-zoom.css'))
        .pipe(gulp.dest("dist"));
});