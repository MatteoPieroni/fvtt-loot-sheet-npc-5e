const { series, src, dest } = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const rename = require("gulp-rename");


function clean(cb) {
  del('dist/**', {force:true});
  cb();
}

function copyFiles(cb) {
  const folders = ['css', 'icons', 'images'];
  folders.forEach((folder) => {
      src([`${folder}/**/*`]).pipe(dest(`dist/sw5efoundry/${folder}`));
      src([`${folder}/**/*`]).pipe(dest(`dist/aime/${folder}`));
  });

  cb();
}

function modules(cb) {
  src('./module-sw5efoundry.json').pipe(rename({ basename: 'module' })).pipe(dest('dist/sw5efoundry/'));
  src('./module-aime.json').pipe(rename({ basename: 'module' })).pipe(dest('dist/aime/'));
  
  cb();
}

function javascript(cb) {
  src('./lootsheetnpc5e.js').pipe(replace(/REPLACE/g, 'sw5efoundry')).pipe(dest('dist/sw5efoundry/'));
  src('./lootsheetnpc5e.js').pipe(replace(/REPLACE/g, 'aime')).pipe(dest('dist/aime/'));

  cb();
}

function html(cb) {
  src('./template/npc-sheet.html').pipe(replace(/REPLACE/g, 'lootsheetnpcsw5efoundry')).pipe(dest('dist/sw5efoundry/template/'));
  src('./template/npc-sheet.html').pipe(replace(/REPLACE/g, 'lootsheetnpcaime')).pipe(dest('dist/aime/template/'));

  cb();
}

exports.default = series(clean, copyFiles, modules, javascript, html);