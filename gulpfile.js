/* Needed gulp config */
var gulp = require('gulp');
var sass = require('sass');
var gulpSass = require('gulp-sass')(sass);
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

/* Setup scss path */
var paths = {
    scss: './sass/*.scss'
};

/* Scripts task */
gulp.task('scripts', function () {
    return gulp.src([
        'js/vendor/jquery.min.js',
        'js/vendor/jquery.easing.1.3.js',
        'js/vendor/jquery.stellar.min.js',
        'js/vendor/jquery.flexslider-min.js',
        'js/vendor/jquery.countTo.js',
        'js/vendor/jquery.appear.min.js',
        'js/vendor/jquery.magnific-popup.min.js',
        'js/vendor/owl.carousel.min.js',
        'js/vendor/bootstrap.min.js',
        'js/vendor/jquery.waypoints.min.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
});

gulp.task('minify-main', function () {
    return gulp.src('js/main.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

/* Sass task */
gulp.task('sass', async function () {
    const autoprefixer = (await import('gulp-autoprefixer')).default; // Import inside the task

    return gulp.src('scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(gulpSass({
            outputStyle: 'expanded',
            precision: 10
        }).on('error', gulpSass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

/* Merge styles task */
gulp.task('merge-styles', function () {
    return gulp.src([
        'css/vendor/bootstrap.min.css',
        'css/vendor/animate.css',
        'css/vendor/icomoon.css',
        'css/vendor/flexslider.css',
        'css/vendor/owl.carousel.min.css',
        'css/vendor/owl.theme.default.min.css',
        'css/vendor/magnific-popup.css',
        'css/vendor/photoswipe.css',
        'css/vendor/default-skin.css',
        'fonts/icomoon/style.css',
    ])
    .pipe(concat('styles-merged.css'))
    .pipe(gulp.dest('css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

/* Reload task */
gulp.task('bs-reload', function (done) {
    browserSync.reload();
    done();
});

/* Browser-sync task */
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: 'localhost/probootstrap/black'
    });
});

/* Default Task */
gulp.task('default', gulp.series('sass', 'scripts', 'browser-sync', function (done) {
    gulp.watch(['scss/*.scss', 'scss/**/*.scss'], gulp.series('sass'));
    gulp.watch(['js/main.js'], gulp.series('minify-main'));
    gulp.watch(['*.html'], gulp.series('bs-reload'));
    done();
}));




// /* Needed gulp config */

// var gulp = require('gulp');  
// //var sass = require('node-sass');
// var sass = require('sass');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var notify = require('gulp-notify');
// var minifycss = require('gulp-minify-css');
// var concat = require('gulp-concat');
// var plumber = require('gulp-plumber');
// var browserSync = require('browser-sync');
// var reload = browserSync.reload;
// const sourcemaps = require('gulp-sourcemaps');
// (async () => {
//     const autoprefixer = await import('gulp-autoprefixer');
//     // Your code here
//     })();
// //const autoprefixer = require('gulp-autoprefixer');

// /* Setup scss path */
// var paths = {
//     scss: './sass/*.scss'
// };

// /* Scripts task */
// gulp.task('scripts', function() {
//   return gulp.src([
//     /* Add your JS files here, they will be combined in this order */
//     'js/vendor/jquery.min.js',
//     'js/vendor/jquery.easing.1.3.js',
//     'js/vendor/jquery.stellar.min.js',
//     'js/vendor/jquery.flexslider-min.js',
//     'js/vendor/jquery.countTo.js',
//     'js/vendor/jquery.appear.min.js',
//     'js/vendor/jquery.magnific-popup.min.js',
//     'js/vendor/owl.carousel.min.js',
//     'js/vendor/bootstrap.min.js',
//     'js/vendor/jquery.waypoints.min.js'
//     ])
//     .pipe(concat('scripts.js'))
//     .pipe(gulp.dest('js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('js'));
// });

// gulp.task('minify-main', function() {
//   return gulp.src([
//     /* Add your JS files here, they will be combined in this order */
//     'js/main.js'
//     ])
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('js'));
// });

// /* Sass task */
// gulp.task('sass', function () {  
//     gulp.src('scss/style.scss')
//     .pipe(plumber())
//     .pipe(sass({
//       errLogToConsole: true,

//       //outputStyle: 'compressed',
//       // outputStyle: 'compact',
//       // outputStyle: 'nested',
//       outputStyle: 'expanded',
//       precision: 10
//     }))

//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//     }))
//     .pipe(gulp.dest('css'))

//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('css'))
//     /* Reload the browser CSS after every change */
//     .pipe(reload({stream:true}));
// });

// gulp.task('merge-styles', function () {

//     return gulp.src([
//         'css/vendor/bootstrap.min.css',
//         'css/vendor/animate.css',
//         'css/vendor/icomoon.css',
//         'css/vendor/flexslider.css',
//         'css/vendor/owl.carousel.min.css',
//         'css/vendor/owl.theme.default.min.css',
//         'css/vendor/magnific-popup.css',
//         'css/vendor/photoswipe.css',
//         'css/vendor/default-skin.css',
//         'fonts/icomoon/style.css',
//         ])
//         // .pipe(sourcemaps.init())
//         // .pipe(autoprefixer({
//         //     browsers: ['last 2 versions'],
//         //     cascade: false
//         // }))
//         .pipe(concat('styles-merged.css'))
//         .pipe(gulp.dest('css'))
//         // .pipe(rename({suffix: '.min'}))
//         // .pipe(minifycss())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('css'))
//         .pipe(reload({stream:true}));
// });

// /* Reload task */
// gulp.task('bs-reload', function () {
//     browserSync.reload();
// });

// /* Prepare Browser-sync for localhost */
// gulp.task('browser-sync', function() {
//     browserSync.init(['css/*.css', 'js/*.js'], {
        
//         proxy: 'localhost/probootstrap/black'
//         /* For a static server you would use this: */
//         /*
//         server: {
//             baseDir: './'
//         }
//         */
//     });
// });

// // /* Watch scss, js and html files, doing different things with each. */
// // gulp.task('default', ['sass', 'scripts', 'browser-sync'], function () {
// //     /* Watch scss, run the sass task on change. */
// //     gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass'])
// //     /* Watch app.js file, run the scripts task on change. */
// //     gulp.watch(['js/main.js'], ['minify-main'])
// //     /* Watch .html files, run the bs-reload task on change. */
// //     gulp.watch(['*.html'], ['bs-reload']);
// // });
// gulp.task('default', gulp.series('sass', 'scripts', 'browser-sync', function(done) {
//     /* Watch scss, run the sass task on change. */
//     gulp.watch(['scss/*.scss', 'scss/**/*.scss'], gulp.series('sass'));
//     /* Watch app.js file, run the scripts task on change. */
//     gulp.watch(['js/main.js'], gulp.series('minify-main'));
//     /* Watch .html files, run the bs-reload task on change. */
//     gulp.watch(['*.html'], gulp.series('bs-reload'));
//     done();
//   }));