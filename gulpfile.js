var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	rootPath = './',
	pkg = require('./package.json')
;


// LESS
gulp.task('less', function() {
	return gulp.src(rootPath + 'rastr.less')
		.pipe(less())
		.pipe(autoprefixer('> 0.5%', 'last 2 versions', 'ie 10'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(rootPath))
		.pipe(reload({ stream: true }))
	;
});


// HTML
gulp.task('html', function() {
	reload();
});


// WATCH
gulp.task('watch', function() {
	browserSync.init({
		server: rootPath,
		notify: false,
		open: false
	});

	gulp.watch([rootPath + '*.html'], ['html']);
	gulp.watch([rootPath + '*.less'], ['less']);
});


// DEFAULT
gulp.task('default', ['watch']);