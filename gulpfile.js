'use strict';

const gulp = require('gulp');



/**
 * Gulp plugins
 * */
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const browserify = require('gulp-browserify');
const tsProject = ts.createProject('tsconfig.json');
/**
 * Development Testbrowser
 * */
const express = require('express');

gulp.task('default', ['sass:watch', 'typescript:watch', 'browserify:watch', 'browserify', 'run']);
gulp.task('build', ['sass', 'typescript', 'browserify']);


/**
 * Atomar tasks
 * **/

gulp.task('run', function () {
    const app = express();
    const options = {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: "index.html",
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res, path, stat) {
            res.set('x-timestamp', Date.now());
        }
    };
    app.use(express.static('.', options));
    app.listen(3000, function () {
        console.log('Deployed example on  http://localhost:3000!');
    });
});


gulp.task('typescript', function () {
    gulp.src('src/**/*.{ts,tsx}')
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function () {
    gulp.src('dist/index.js')
        .pipe(rename("bundle.js"))
        .pipe(browserify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
    gulp.src('src/css/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('dist/src/css'))
});


/**
 * Watch tasks
 * **/

gulp.task('sass:watch', function () {
    gulp.watch('src/css/*.sass', ['sass']);
});


gulp.task('typescript:watch', function () {
    gulp.watch('src/**/*.ts', ['typescript']);
});

gulp.task('browserify:watch', function () {
    gulp.watch('dist/js/index.js', ['browserify']);
});
