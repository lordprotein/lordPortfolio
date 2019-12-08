var gulp = require('gulp'),
	less = require('gulp-less'),
	babel = require('gulp-babel'),
	// autoprefixer_css = require('gulp-autoprefixer'),
	// csso = require('gulp-csso'),
	// minify = require('gulp-minify'),
	concat = require('gulp-concat');

var src = {
	modules: 'src/moduleRules',
	styles: {
		less: 'src/styles/less',
		css: 'src/styles/css'
	},
	js: 'src/js',
	// plugins: 'src/plugins',
	// img: 'src/img',
}

// var dist = {
// 	css: 'dest/css',
// 	js: 'dest/js',
// 	plugins: 'dest/plugins',
// 	img: 'dest/img',
// }

function less_compile(done) {
	gulp.src(src.styles.less + '/styles.less')
		.pipe(less())
		// .pipe(autoprefixer_css({
		//              overrideBrowserslist: ['last 20 versions', 'ie 9'],
		//              cascade: true
		//          }))
		.pipe(gulp.dest(src.styles.css))
	done();
}

function babel_compile(done) {
	gulp.src('src/modules/**/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.on('error', function (err) { console.log(err.message); })
		.pipe(gulp.dest(src.js))
	done();
}



gulp.task('less', less_compile);
gulp.task('babel', babel_compile);

gulp.task('watch', function () {
	gulp.watch(src.modules + '/**/*.less', gulp.parallel('less'));
	gulp.watch(src.styles.less + '/*.less', gulp.parallel('less'));
	gulp.watch(src.js.es + '/*.js', gulp.parallel('babel'));
});


// function build_minify_css(done)
// {
// 	gulp.src(src.styles.css + '/**/*.css')
//     .pipe(csso({
//         restructure: false,
//         sourceMap: true,
//         debug: true
//     }))
//     .pipe(gulp.dest(dist.css));
// 	done();
// }

// function build_minify_js(done)
// {
// 	gulp.src(src.js + '/**/*.js')
//     .pipe(minify())
// 	.pipe(gulp.dest(dist.js))
// 	done();
// }

// function build_copy_files(done)
// {
// 	gulp.src(src.plugins + '/**/*')
// 	.pipe(gulp.dest(dist.plugins))

// 	gulp.src(src.img + '/**/*')
// 	.pipe(gulp.dest(dist.img))

// 	gulp.src('src/*.html')
// 	.pipe(gulp.dest('dest'))

// 	done();
// }

// gulp.task('build_minify_css', build_minify_css);
// gulp.task('build_minify_js', build_minify_js);
// gulp.task('build_copy_files', build_copy_files);
// gulp.task('build', gulp.series('build_minify_css', 'build_minify_js', 'build_copy_files'));

