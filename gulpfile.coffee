gulp = require 'gulp'
babel = require 'gulp-babel'
plumber = require 'gulp-plumber'
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'build', =>
  gulp.src 'src/*'
  .pipe sourcemaps.init()
  .pipe babel()
  .pipe sourcemaps.write '.'
  .pipe gulp.dest 'lib'

gulp.task 'watch', ['build'], =>
  gulp.watch 'src/*.js', ['build']


gulp.task 'default', ['build']
