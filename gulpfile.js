var gulp = require('gulp');

var app = require('./app.js');


gulp.task('test', function () { 

    gulp.src('./index.html')
    .pipe(app())
    .pipe(gulp.dest('newIndex.html'));

});