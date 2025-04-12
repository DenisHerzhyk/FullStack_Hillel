const {task, series, parallel, src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano')
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');

const PATH = {
    scssInputFolder: 'assets/scss/',
    scssInputFiles: 'assets/scss/**/*.scss',
    scssStyleFile: 'assets/scss/style.scss',
    cssOutputFolder: 'assets/css/',
    cssOutputFiles: 'assets/css/**/*.css',
    jsOutputFiles: 'assets/js/**/*.js',
    htmlInputFiles: '*.html'
}
const PLUGINS = [autoprefixer({
    overrideBrowserslist: ['last 5 versions', '> 1%'],
    cascade: true}),
    mqpacker({sort: sortCSSmq}),
];

const comb = () => {
    return src(PATH.scssInputFiles)
        .pipe(csscomb('csscomb.json'))
        .pipe(dest(PATH.cssOutputFolder));
}

const scss = () => {
    return src(PATH.scssStyleFile, {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(PATH.cssOutputFolder, {sourcemaps: true}))
        .pipe(browserSync.stream())

}

const scssMin = () => {
    const pluginsExtended = PLUGINS.concat([cssnano({preset: 'default'})])
    return src(PATH.scssStyleFile)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(pluginsExtended))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(PATH.cssOutputFolder));
}

async function sync() {
    await browserSync.reload();
}

const syncInit = () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

const watchFiles = () => {
    syncInit()
    watch(PATH.scssInputFiles, scss);
    watch(PATH.htmlInputFiles, sync);
    watch(PATH.jsOutputFiles, sync);
}

task('comb', comb)
task('min', scssMin);
task("scss", scss);
task("watch", watchFiles);