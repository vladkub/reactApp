//требуемые плагины: sass, jade, watch, browser-sync, gulp-autoprefixer

var gulp=require('gulp');
var sass=require('gulp-sass');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browserSync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        open: true,
        notify: false // Отключаем уведомления
    });
});

gulp.task('sass', function() {
	gulp.src('app/scss/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.reload({stream: true}));
});    
 
// чтобы запустить эту задачу, наберите в командной строке gulp jade
gulp.task('jade', function() {
    return gulp.src('app/jade/*.jade')
        .pipe(jade({pretty: true})) 
        .pipe(gulp.dest('app/html/')) // указываем gulp куда положить скомпилированные HTML файлы
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browserSync', 'sass', 'jade'], function() {
	gulp.watch('app/scss/*.sass', ['sass']);
	gulp.watch('app/jade/*.jade', ['jade']);
});

