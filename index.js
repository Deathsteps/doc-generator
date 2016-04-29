'use strict';

let child_process = require('child_process');
let path = require('path');
let fs = require('fs');

let projectPath = process.argv.splice(2)[0];

let readmePath = path.join(projectPath, 'README.md');
if (!fs.existsSync(readmePath)) {
  readmePath = '';
}

let args = [
  projectPath,
  readmePath,
  '-r',
  '-t', './node_modules/minami',
  '-d', path.join(projectPath, 'doc')
]

child_process.exec(
  "./node_modules/.bin/jsdoc " + args.join(' '),
  function (err, stdout, stderr) {
    if(err || stderr)
      return console.log(err || stderr)
    console.log('Document created!')
  });

