var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var texturepacker = require('gulp-texturepacker');

var source_path = 'assets/js/';
var destination_path = 'static/js/';

var sprites_path = 'assets/sprites/';
var sprite_dest_path = 'static/sprites/';

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

function compile_sprites() {
  gulp.src([sprites_path + 'sprites.tps'])
  .pipe(texturepacker({
      sheet: sprite_dest_path + 'sprites.png',
      data: sprite_dest_path + 'sprites.json'
  }));
  // texturepacker --extrude 0 --algorithm Basic --trim-mode None --png-opt-level 0 --disable-auto-alias --data assets/sprites/sprites.json assets/images/
}

gulp.task('libraries', copy_libs);
gulp.task('compile_js', compile_js);
gulp.task('compile_sprites', compile_sprites);

gulp.task('default', ['libraries', 'compile_js', 'compile_sprites']);

gulp.task('watch_js', function() {
  gulp.watch('assets/js/*.js', ['compile_js']);
});
