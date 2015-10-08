gulp = require 'gulp'
babel = require 'gulp-babel'
plumber = require 'gulp-plumber'

gulp.task 'build', =>
  gulp.src 'src/*'
  .pipe babel()
  .pipe gulp.dest 'lib'

gulp.task 'watch', ['build'], =>
  gulp.watch 'src/*.js', ['build']


gulp.task 'default', ['build']
