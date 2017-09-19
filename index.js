#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(1));
const fs = require('fs');
const nunjucks = require('nunjucks');
const name = argv.name || "index";
const ext = argv.ext || "react.js";
const config = { 
  name,
  ext
}
config.isConnected = argv.isConnected
  ? true
  : false;
config.isFunctional = argv.isFunctional
  ? true
  : false;
config.hasDependencies = argv.hasDependencies
  ? true
  : false;
config.hasConstructor = argv.hasConstructor
  ? true
  : false;
config.cdm = argv.cdm
  ? true
  : false;
config.cwm = argv.cwm
  ? true
  : false;
config.isPure = argv.isPure
  ? argv.isPure
  : true

const writeFile = (data) => {
  const fileName = `${name}.${ext}`
  const config = {
    clobber: false
  }

  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Done: ${fileName}`)
  });
}

const templateFile = config.isFunctional
  ? 'functionalTemplate.njk'
  : 'classTemplate.njk'

fs.readFile(`templates/${templateFile}`, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  writeFile(nunjucks.renderString(data, config))
});