'use strict';

let child_process = require('child_process');
let path = require('path');
let fs = require('fs');

let projectPath = process.argv.splice(2)[0];

let readmePath = path.join(projectPath, 'README.md');
if (!fs.existsSync(readmePath)) {
  readmePath = '';
}

let tmplPath = process.platform === 'win32' ?
  path.join(__dirname, 'node_modules', 'minami') :
  './node_modules/minami';
let cmdPath = process.platform === 'win32' ?
  path.join(__dirname, 'node_modules', '.bin', 'jsdoc') :
  './node_modules/.bin/jsdoc';

let args = [
  projectPath,
  readmePath,
  '-r',
  '-t', tmplPath,
  '-d', path.join(projectPath, 'doc')
]

child_process.exec(
  cmdPath + " " + args.join(' '),
  function (err, stdout, stderr) {
    if(err || stderr)
      return console.log(err || stderr)
    console.log('Document created!')
  });
