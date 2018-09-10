const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
// const autoprefixer = require('gulp-autoprefixer');

const processors = [autoprefixer];
// 编译less
gulp.task('css', function() {
    gulp.src('../src/style.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(cleanCSS())
        .pipe(rename('nopvue.css'))
        .pipe(gulp.dest('../dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function() {
    gulp.src('../src/styles/iconfont/fonts/*.*').pipe(
        gulp.dest('../dist/styles/fonts')
    );
});

// gulp.task('default', ['css']);
gulp.task('default', ['css', 'fonts']);
