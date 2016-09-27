var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var source_path = 'assets/js/';
var destination_path = 'static/js/';

function compile_js() {

  return gulp.src(source_path + 'bundle.js', {read: false})
    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      gutil.log('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    // load and init sourcemaps
    .pipe(sourcemaps.init({loadMaps: true}))

    // turn this back on for prod compiling
    // .pipe(uglify())

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(destination_path));
}

function copy_libs() {
  return gulp.src(source_path + 'lib/*.js')
    .pipe(gulp.dest(destination_path + 'lib/'));
}

gulp.task('libraries', copy_libs);
gulp.task('compile', compile_js);

gulp.task('default', ['libraries', 'compile']);
