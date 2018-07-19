const gulp = require('gulp');
const minifyCSS = require('gulp-minify-css');
const minify = require('gulp-babel-minify');

gulp.task('minify-css', function () {
  return gulp.src('./css/style.css')
    .pipe(minifyCSS({
      keepBreaks: true,
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task("minify", () =>
  gulp.src("./js/*.js")
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./build/js/"))
);

gulp.task('copyFiles', () => {
  gulp.src("./*.html")
    .pipe(gulp.dest("./build/"));
  gulp.src("./manifest.json")
    .pipe(gulp.dest("./build/"))
  gulp.src("./*.md")
    .pipe(gulp.dest("./build/"))
  gulp.src("./images/*.png")
    .pipe(gulp.dest("./build/images/"))
});

gulp.task('default', ['minify-css', 'minify', 'copyFiles']);