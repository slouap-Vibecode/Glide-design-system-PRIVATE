const process = require('process');
const childProcess = require("child_process");

const REMOTE_HOST = 'neo-component-kit.kdsneo.kds.com';
const REMOTE_USER = 'pegasus';

// This script can be called with a version parameter, else it takes it from package.json
const version = process.argv[2] && process.argv[2] !== "--auto-confirm" || process.env.npm_package_version;
const autoConfirm = process.argv.some((value) => value === "--auto-confirm");

console.info('This script only publishes the documentation.');
console.info('If it\'s not up to date, please use npm \'run doc:build\'');
console.info('About to publish version ' + version);
console.info("Be careful you must SSH access to the server, the publish will use 'scp'");
const stdin = process.openStdin();
if (!autoConfirm) {
  console.info('Confirm (y/n) ?');
}

stdin.addListener('data', function(answer) {
  console.log("received", answer);
  if (answer.toString().trim() !== 'y') {
    console.error('Publish aborted.');
    process.exit();
  } else {
    // upload the contents of /styleguide/
    uploadDirectory('./documentation/styleguide', 'static/' + version);
  }
});

function uploadDirectory(sourceDir, destDir) {
  console.log('Uploading ' + sourceDir + ' to ' + destDir);
  childProcess.exec(`scp -r ${sourceDir} ${REMOTE_USER}@${REMOTE_HOST}:${destDir}`, (err) => {
    if (err) {
      console.error('SCP error : ' + err.message);
    } else {
      console.log('Done.');
      process.exit();
    }
  });
}

if (autoConfirm) {
  console.log("auto confirm");
  // upload the contents of /styleguide/
  uploadDirectory('./documentation/styleguide', 'static/' + version);
}
