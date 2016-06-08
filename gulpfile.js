
var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var cssGlobbing = require('gulp-css-globbing');
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", ["dist-ts", "dist-scss", "dist-css"]);

gulp.task("dist-ts", function () {
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(rename('dotjem-angular-zoom.js'))
        .pipe(gulp.dest("dist"))
        .pipe(rename('dotjem-angular-zoom.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('dist-css', function() {
    gulp.src('./src/styles.scss')
        .pipe(cssGlobbing({ extensions: ['.scss'] }))
        //TODO: For now we only have a single file, so we can just pipe
        //      it to the output, but when/if we get more files we should
        //      build a single scss file that can be used by consumers of
        //      the library in their scss tool chain.
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('dotjem-angular-zoom.css'))
        .pipe(gulp.dest("dist"))
        .pipe(cleancss())
        .pipe(rename('dotjem-angular-zoom.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist-scss', function() {
    gulp.src('./src/styles.scss')
        .pipe(cssGlobbing({ extensions: ['.scss'] }))
        //TODO: For now we only have a single file, so we can just pipe
        //      it to the output, but when/if we get more files we should
        //      build a single scss file that can be used by consumers of
        //      the library in their scss tool chain.
        .pipe(rename('_dotjem-angular-zoom.scss'))
        .pipe(gulp.dest("dist"));
});