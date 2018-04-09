const gulp = require('gulp')
const browser = require('browser-sync').create()
const pug = require('gulp-pug')
const typescript = require('gulp-typescript')
const lint = require('gulp-tslint')
const plumber = require('gulp-plumber')
const styles = require('gulp-sass')
const del = require('del')
const size = require('gulp-size')
const images = require('gulp-imagemin')
const cache = require('gulp-cache')


const browserReload = browser.reload
const DIST = 'dist/'
const APP = 'app/'


gulp.task('clean', () => del([DIST], {dot: true}))


gulp.task('images', () => {

  gulp.src(APP.concat('images/**/*'))
    .pipe(cache(images({progressive: true, interlaced: true})))
    .pipe(gulp.dest(DIST.concat('images/')))
    .pipe(size({title: 'images'}))
})


gulp.task('styles', () => {

  return gulp.src(APP.concat('styles/*.scss'))
    .pipe(plumber())
    .pipe(styles({precision: 10}))
    .pipe(gulp.dest(DIST.concat('styles/')))
    .pipe(browser.stream())
    .pipe(size({title: 'styles'}))

})


gulp.task('copy-script', () => {
    return gulp.src([APP.concat('js/test.js')])
      .pipe(gulp.dest(DIST.concat('dist/js')))
})


gulp.task('lint', () => {
  gulp.src(APP.concat('js/main.ts'))
    .pipe(lint({formatter: 'verbose'}))
    .pipe(lint.report())
})


gulp.task('scripts', () => {
  return (gulp.src(APP.concat('js/**/*.ts'))
    .pipe(typescript({noImplicitAny: true, out: 'main.js'}))
    .pipe(gulp.dest(DIST.concat('js')))
    .pipe(browser.stream()))
    .pipe(size({title: 'scripts'}))
})


gulp.task('templates', () => {
  return (gulp.src(APP.concat('templates/*.pug'))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(DIST)))
    .pipe(size({title: 'templates'}))
})


gulp.task('launch', ['templates', 'scripts', 'styles', 'images'], () => {


 browser.init({
    notify: true,
    logPrefix: 'UPDATE',
    server: './'.concat(DIST),
    port: 3000,
    open: false
  })


  gulp.watch([APP.concat('templates/**/*.pug')], ['templates'], browserReload)
  gulp.watch([APP.concat('styles/**/*.{scss, css}')], ['styles'])
  gulp.watch([APP.concat('js/*.ts')], ['lint', 'scripts', browserReload])
  gulp.watch([APP.concat('images/**/*')], browserReload)

  console.log('*** gulp is running ***')
})


//todo need to compile everything
gulp.task('compile', ['clean', 'templates', 'scripts', 'styles', 'images'], () => {
  console.log('*** compile is done ***')
})


gulp.task('default', ['clean'], () => {
  console.log('*** clean the project ***')
})