var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
	rootPath = './'
;


// LESS
gulp.task('less', function() {
	return gulp.src(rootPath + 'rastr.less')
		.pipe(plugins.less({
			strictMath: true
		}))
		.pipe(plugins.autoprefixer('> 0.5%', 'last 2 versions', 'ie 10'))
		.pipe(plugins.cssnano({ 
			safe: false, 
			calc: false 
		}))
		.pipe(plugins.replace(/\.col-([^\}]*)\{-webkit-box-flex:0\}/g, '')) // remove redundant rules
		.pipe(plugins.replace(/-webkit-box-flex:0;/g, '')) // remove redundant rules
		.pipe(gulp.dest(rootPath))
	;
});


// WATCH
gulp.task('watch', function() {
	gulp.watch([rootPath + '*.less'], ['less']);
});


// DEFAULT
gulp.task('default', ['watch']);