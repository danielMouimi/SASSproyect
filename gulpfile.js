// Importar dependencias
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// Ruta de los archivos SCSS
const paths = {
    scss: 'SCSS/**/*.scss', // Ruta de tus archivos SCSS
    css: 'CSS/style.css' // Ruta donde se guardarán los archivos CSS compilados
};

// Tarea para compilar SCSS a CSS
gulp.task('sass', () => {
    return gulp.src(paths.scss) // Toma los archivos SCSS
        .pipe(sourcemaps.init()) // Inicializa los sourcemaps
        .pipe(sass().on('error', sass.logError)) // Compila SCSS a CSS
        .pipe(autoprefixer()) // Agrega prefijos automáticos
        .pipe(cleanCSS()) // Minifica el CSS
        .pipe(sourcemaps.write('./')) // Escribe los sourcemaps
        .pipe(gulp.dest(paths.css)); // Guarda los archivos en la carpeta dist/css
});

// Tarea por defecto
gulp.task('default', gulp.series('sass','sassdoc'));

const sassdoc = require('sassdoc');

gulp.task('sassdoc', () => {
    return gulp.src('src/scss/**/*.scss') // Ajusta la ruta si es diferente
        .pipe(sassdoc({
            dest: 'docs' // Carpeta donde se guardará la documentación
        }));
});
