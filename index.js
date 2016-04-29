'use strict';

let child_process = require('child_process');
let path = require('path');
let fs = require('fs');

let projectPath = process.argv.slice(2)[0];
let theme = process.argv.slice(2)[1];

let readmePath = path.join(projectPath, 'README.md');
if (!fs.existsSync(readmePath)) {
  readmePath = '';
}

let tmplPath = process.platform === 'win32' ?
  theme === 'jaguar' ? path.join(__dirname, 'jaguarjs-jsdoc') : path.join(__dirname, 'node_modules', 'minami') :
  theme === 'jaguar' ? './jaguarjs-jsdoc' : './node_modules/minami';
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
if (theme === 'jaguar')
  args.push('-c', path.join(tmplPath, 'conf.json'))

child_process.exec(
  cmdPath + " " + args.join(' '),
  function (err, stdout, stderr) {
    if(err || stderr)
      return console.log(err || stderr)
    console.log('Document created!')
  });
