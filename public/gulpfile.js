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


gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});


gulp.task('less', function () {
    return gulp.src('src/less/main.less')
        .pipe(plumber())
        .pipe(less({
            'include css': true
        }))
        .pipe(autoprefixer('last 3 versions', '> 2%', 'ie 9'))
        .pipe(gulp.dest('./css/'))
        .pipe(connect.reload())
});


gulp.task('html', function() {
    return gulp.src('src/html/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
});


gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'))
        .pipe(connect.reload())
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/*.js'
    ])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js/'))
        //.pipe(uglify())
        //.pipe(rename('main.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/'))
        .pipe(connect.reload())
});


gulp.task('watch', function() {
    gulp.watch('src/less/**/*.styl', ['less'])
    gulp.watch('src/html/**/*.html', ['html'])
    gulp.watch('src/img/**/*', ['img'])
    gulp.watch('src/js/**/*.js', ['scripts'])
});

gulp.task('default', ['connect', 'html', 'less', 'scripts', 'watch']);
