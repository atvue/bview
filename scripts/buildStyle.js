const gulp = require( `gulp` );
const cleanCSS = require( `gulp-clean-css` );
const less = require( `gulp-less` );
const postcss = require( `gulp-postcss` );
const autoprefixer = require( `autoprefixer` );
const rename = require( `gulp-rename` );
// const autoprefixer = require('gulp-autoprefixer');

const processors = [ autoprefixer ];
// 编译less
gulp.task( `css` , function() {
    gulp.src( `../src/style.less` )
        .pipe( less() )
        .pipe( postcss( processors ) )
        .pipe( cleanCSS() )
        .pipe( rename( `bview.css` ) )
        .pipe( gulp.dest( `../dist/styles` ) );
} );

gulp.task( `default` , [ `css` ] );
