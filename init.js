const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');
const yargs = require('yargs');

const projectName = yargs.argv._[0];
const root = path.resolve(projectName);
const appName = path.basename(root);

console.log(
  `Creating a new AmazingCo UI project ${chalk.yellow(
    appName
  )} in ${chalk.green(root)}.`
);
console.log();
fs.ensureDirSync(projectName);
fs.mkdirsSync(root);

//create package.json file
const packageJson = {
  name: appName,
  version: '0.1.0',
  private: true,
  scripts: {
    start: 'ryori start',
    test: 'ryori test',
    build: 'ryori build',
    lint: 'ryori lint',
    format: 'ryori format'
  }
};
fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
// test: node init.js Whatever-The-App-Name
//TODO: after npm install act: use command act init Whatever-The-App-Name

//install dependencies
const dependencies = ['react', 'react-dom', 'react-helmet'];

const install = (dep, dir) => new Promise((resolve, reject) => {
  console.log(root);
  fs.mkdirsSync(`${root}/node_modules`);
  const childProcess = spawn('npm', ['install', '--prefix', `${root}`, '--loglevel', 'error', ...dep], { stdio: 'inherit' });
  childProcess.on('close', code => (code === 0 ? resolve() : reject()));
});

install(dependencies).then(()=>{
  console.log('Done');
});
