"use strict";

let gulp = require("gulp");
let plumber = require("gulp-plumber");
let sourcemap = require("gulp-sourcemaps");
let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let server = require("browser-sync").create();
let csso = require("gulp-csso");
let rename = require("gulp-rename");
let imagemin = require("gulp-imagemin");
let webp = require("gulp-webp");
let svgstore = require("gulp-svgstore");
let posthtml = require("gulp-posthtml");
let include = require("posthtml-include");
let del = require("del");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/img/*.jpg", gulp.series("copy"));
  gulp.watch("source/img/*.png", gulp.series("copy"));
  gulp.watch("source/js/*.js", gulp.series("copy"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest("source/img"));

});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source//*.ico"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
