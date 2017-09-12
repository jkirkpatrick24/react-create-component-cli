const gulp = require('gulp');
const minify = require('gulp-minify');
const rename = require('gulp-rename');

gulp.task('js', () => {
  return gulp.src('src/index.js')
    .pipe(minify({noSource: true}))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['js']);