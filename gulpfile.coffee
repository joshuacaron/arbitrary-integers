gulp = require 'gulp'
babel = require 'gulp-babel'
sourcemaps = require 'gulp-sourcemaps'
format = require 'format-error'
  .format

gulp.task 'build', =>
  x = gulp.src 'src/*'
  .pipe sourcemaps.init()
  y = x.pipe babel()
  y.on 'error', (err) =>
    console.error(format(err))
    y.end()
  .pipe sourcemaps.write '.'
  .pipe gulp.dest 'lib'

gulp.task 'watch', ['build'], =>
  gulp.watch 'src/*.js', ['build']


gulp.task 'default', ['build']
