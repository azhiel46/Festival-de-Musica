const { src, dest, watch, parallel } = require('gulp');

//Dependencias de css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Dependendias para convertir imagenes
const webp = require('gulp-webp');


function css(done) {

    src('src/scss/**/*.scss') //identificar el archivo .SCSS a compilar
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() ) //Compilarlo
        .pipe( postcss( [autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') ) //Almacenarla en disco duro
    done();

}


function versionWebp( done ) {
    
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png, jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img') )

    done();
}

function javascrip (done) {

    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done();
}

function dev(done) {

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascrip);

    done();
}



exports.css = css;
exports.js = javascrip;
exports.versionWebp = versionWebp;
exports.dev = parallel(dev, versionWebp, javascrip);
