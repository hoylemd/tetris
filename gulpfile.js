var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var texturepacker = require('gulp-texturepacker');

var js_source_path = 'assets/js/';
var js_dest_path = 'static/js/';
var js_dist_path = 'dist/js/';

var css_source_path = 'assets/css/';
var css_dest_path = 'static/css/';
var css_dist_path = 'dist/css/';

var sprites_source_path = 'assets/sprites/';
var sprites_dest_path = 'static/sprites/';
var sprites_dist_path = 'dist/sprites/';

gulp.task('compile_js', function compile_js() {
  return gulp.src(js_source_path + 'tetris_bundle.js', {read: false})
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

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(js_dest_path));
});

gulp.task('watch_js', function() {
  gulp.watch(js_source_path + '*.js', ['compile_js']);
});

gulp.task('dist_js', function dist_js() {
  return gulp.src(js_source_path + 'tetris_bundle.js', {read: false})
    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      gutil.log('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();
    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    .pipe(uglify())

    .pipe(gulp.dest(js_dist_path));
});

gulp.task('compile_css', function compile_css() {
  return gulp.src(css_source_path + '*.css')
    .pipe(gulp.dest(css_dest_path));
});

gulp.task('watch_css', function() {
  gulp.watch(css_source_path + '*.css', ['compile_css']);
});

gulp.task('dist_css', function dist_css() {
  return gulp.src(css_source_path + '*.css')
    .pipe(gulp.dest(css_dist_path));
});

gulp.task('libraries', function copy_libs() {
  return gulp.src(js_source_path + 'dev_libraries/*.js')
    .pipe(gulp.dest(js_dest_path + 'lib/'));
});

gulp.task('compile_sprites', function compile_sprites() {
  /* doesn't work with free version
  gulp.src([sprites_source_path + 'sprites.tps'])
  .pipe(texturepacker({
      sheet: sprite_dest_path + 'sprites.png',
      data: sprite_dest_path + 'sprites.json'
  }));
  */
  return gulp.src(sprites_source_path + '*.{png, json}')
    .pipe(gulp.dest(sprites_dest_path));
});

gulp.task('dist_sprites', function dist_sprites() {
  /* doesn't work with free version
  gulp.src([sprites_source_path + 'sprites.tps'])
  .pipe(texturepacker({
      sheet: sprite_dist_path + 'sprites.png',
      data: sprite_dist_path + 'sprites.json'
  }));
  */
  return gulp.src(sprites_source_path + '*.{png, json}')
    .pipe(gulp.dest(sprites_dist_path));
});

gulp.task('default', ['libraries', 'compile_js', 'compile_css', 'compile_sprites']);
gulp.task('deploy', ['dist_js', 'dist_css', 'dist_sprites']);
gulp.task('watch', ['watch_js', 'watch_css']);
