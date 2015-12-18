var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var server = require('gulp-server-livereload');
var connect = require('connect');

gulp.task('browserify',function(){
	browserify('./scripts/main.js')
		.transform('reactify')
		.bundle()
		.pipe(source('bundled.js'))
		.pipe(gulp.dest('./build/js'))
});

gulp.task('copy',function(){
	gulp.src('./index.html')
		.pipe(gulp.dest('build'));
	gulp.src('css/**/*.*')
		.pipe(gulp.dest('build'));
	// gulp.src('eventdata/**/*.*')
	// 	.pipe(gulp.dest('build/eventdata'));    
});

gulp.task('watch', function() {
	gulp.watch(['scripts/**/*.*','index.html'], ['browserify','copy']);
});

gulp.task('webserver', function() {
	gulp.src('./build')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.html',
			directoryListing: false,
			open: true,
			
		}));
});
// Just running the two tasks
gulp.task('default', ['browserify','copy','webserver','watch']);