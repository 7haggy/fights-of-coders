/**
 * Created by libxes on 10.03.17.
 */

"use strict"

var gulp = require('gulp');
var rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

gulp.task('less', function () {
    return gulp.src('src/less/main.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer('last 3 versions', '> 2%', 'ie 9'))
        .pipe(gulp.dest('./css/'))
});


gulp.task('html', function() {
    return gulp.src('src/html/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./'))
});


gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('./img'))
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/*.js'
    ])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/'))
});


gulp.task('watch', function() {
    gulp.watch('src/less/**/*.less', ['less'])
    gulp.watch('src/html/**/*.html', ['html'])
    gulp.watch('src/img/**/*', ['img'])
    gulp.watch('src/js/**/*.js', ['scripts'])
});

gulp.task('default', ['html', 'less', 'scripts', 'watch']);
