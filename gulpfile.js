var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	rootPath = './'
;


// LESS
gulp.task('less', function() {
	return gulp.src(rootPath + 'rastr.less')
		.pipe(plugins.less({
			strictMath: true
		}))
		.pipe(plugins.autoprefixer('> 0.5%', 'last 2 versions', 'ie 10'))
		.pipe(plugins.cssnano({ safe: false, calc: false }))
		.pipe(plugins.replace(/\.col-([^\}]*)\{-webkit-box-flex:1\}/g, ''))
		.pipe(plugins.replace(/-webkit-box-flex:1;/g, ''))
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