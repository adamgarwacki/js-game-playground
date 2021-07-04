'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
 
gulp.task('pack-js', function () {    
    return gulp.src(
        [
            'assets/js/main.js',
            'assets/js/*.js'
        ]
    )
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/js/*.js', gulp.series('pack-js'));
});

gulp.task('default', gulp.series('pack-js', 'watch'));