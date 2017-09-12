#! /usr/bin/env node

const argv = require('minimist')(process.argv.slice(1));
const fs = require('fs');
const head = require('lodash.head');
// args
const name = argv.name || "index";
const ext = argv.ext || "react.js"
const path = argv.path;
const isConnected = argv.isConnected
  ? true
  : false;
const hasDependencies = argv.hasDependencies
  ? true
  : false;
const hasConstructor = argv.hasConstructor
  ? true
  : false;
const cdm = argv.cdm
  ? true
  : false;
const cwm = argv.cwm
  ? true
  : false;
const isPure = argv.isPure
  ? argv.isPure
  : true
const currentDir = head(argv._);

const importTemplateContainer = `import { connect } from 'react-redux';
import { makeConnectArgs } from 'redux-threads';
import * as selectors from '../selectors';
import * as actions from '../actions';`

const constructorTemplate = `constructor(props) {\n    super(props);\n  }\n`

const dependenciesTemplate = `static dependencies = [];\n`;

const connectContainerTemplate = `const pageThread = [
  selectors,
  actions,
  (stateProps, dispatchProps) => ({})
]

const connectArgs = makeConnectArgs(
  pageThread
);`

const importForContainer = (isConnected) => {
  return isConnected
    ? importTemplateContainer
    : "";
}

const importForDependencies = (hasDependencies) => {
  return hasDependencies
    ? "import resolveDependencies from 'react-resolve-dependencies';"
    : ""
}

const template = `import React from 'react';
import { compose } from 'redux';
${importForDependencies(hasDependencies)}
${importForContainer(isConnected)}

export class ${name} extends React.${isPure === true ? "Pure" : "" }Component {

  ${hasDependencies ? dependenciesTemplate : '\n' }
  ${hasConstructor ? constructorTemplate : '\n'}
  ${cwm ? `componentWillMount(){}\n` : '\n' }
  ${cdm ? `componentDidMount(){}\n` : '\n' }
  render() {
    return(

    );
  }

}

${isConnected ? connectContainerTemplate : "" }

export default compose(
  ${hasDependencies ? "resolveDependencies()" : "" }
  ${isConnected ? "connect(...connectArgs)" : "" }
)(${name});`

const file = `${name}.${ext}`

fs.writeFile(file, template, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Done: ${file}`)
});