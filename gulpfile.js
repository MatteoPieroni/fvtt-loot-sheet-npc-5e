const { series, src, dest } = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const rename = require("gulp-rename");


function clean(cb) {
  del('dist/**', {force:true});
  cb();
}

function copyFiles(cb) {
  const folders = ['css', 'icons', 'images', 'template'];
  folders.forEach((folder) => {
      src([`${folder}/**/*`]).pipe(dest(`dist/sw5e/${folder}`));
      src([`${folder}/**/*`]).pipe(dest(`dist/aime/${folder}`));
  });

  cb();
}

function modules(cb) {
  src('./module-sw5e.json').pipe(rename({ basename: 'module' })).pipe(dest('dist/sw5e/'));
  src('./module-aime.json').pipe(rename({ basename: 'module' })).pipe(dest('dist/aime/'));
  
  cb();
}

function javascript(cb) {
  src('./lootsheetnpc5e.js').pipe(replace(/REPLACE/g, 'sw5e')).pipe(dest('dist/sw5e/'));
  src('./lootsheetnpc5e.js').pipe(replace(/REPLACE/g, 'aime')).pipe(dest('dist/aime/'));

  cb();
}

exports.default = series(clean, copyFiles, modules, javascript);