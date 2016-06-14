'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps = require('gulp-sourcemaps'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		htmlmin = require('gulp-htmlmin'),
		gulpif = require('gulp-if'),
		connect = require('gulp-connect');

// File Location vars
var htmlFiles = ['builds/development/*.html'],
		jsFiles   = [
			'components/scripts/libs/jquery-2.1.4.js',
			'components/scripts/libs/angular/angular.min.js',
			'components/scripts/libs/angular/angular-route.min.js',
			'components/scripts/libs/angular/angular-animate.min.js',
			'components/scripts/app.js',
			'components/scripts/controllers.js',
			'components/scripts/directives.js',
			'components/scripts/modules/modal.js',
			'components/scripts/global.js'
		],
		sassFiles  = ['components/sass/style.scss'],
		theneFiles = ['components/sass/themes/*.scss'],
		htmlFiles  = ['builds/development/*.html'],
		viewFiles  = ['builds/development/views/*.html'],
		imgFiles   = ['builds/development/img/**/*.*'];


// Check for environment and set deault to dev
var env = process.env.NODE_ENV || 'development';

// Options vars
var outputDir, sassStyle;


// Set options based on environment
if ( env ==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}


// JS files
gulp.task('js', function () {
	return gulp
		.src(jsFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload());
});

// CSS & SASS files
gulp.task('sass', function () {
 return gulp
 	 .src(sassFiles)
   .pipe(sass({
		 outputStyle: sassStyle,
		 image: outputDir + 'img',
	 }).on('error', sass.logError))
   .pipe(autoprefixer('last 2 version', 'safari 4', 'ie 8', 'ie 9'))
	 .pipe(gulp.dest(outputDir + 'css'))
	 .pipe(connect.reload());
});
// CSS & SASS files
gulp.task('themesass', function () {
 return gulp
 	 .src(theneFiles)
   .pipe(sass({
		 outputStyle: sassStyle,
		 image: outputDir + 'img/themes',
	 }).on('error', sass.logError))
   .pipe(autoprefixer('last 2 version', 'safari 4', 'ie 8', 'ie 9'))
	 .pipe(gulp.dest(outputDir + 'css/themes'))
	 .pipe(connect.reload());
});

// Images files
gulp.task('img', function () {
  return gulp
		.src(imgFiles)
		.pipe(gulpif(env === 'production', gulp.dest(outputDir+ 'img')))
		.pipe(connect.reload())
});

// HTML files
gulp.task('html', function () {
	return gulp
		.src(htmlFiles)
		.pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload());
});

// view files
gulp.task('views', function () {
	return gulp
		.src(viewFiles)
		.pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'views/')))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

// Gulp watch
gulp.task('watch', function () {
	gulp.watch(jsFiles, ['js']);
	gulp.watch('components/sass/*.scss', ['sass']);
	gulp.watch('components/sass/themes/*.scss', ['themesass']);
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(viewFiles, ['views']);
	gulp.watch(imgFiles, ['img']);
});


gulp.task('default', ['js', 'sass', 'themesass', 'img', 'watch', 'connect']);
