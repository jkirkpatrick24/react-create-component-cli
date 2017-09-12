#! /usr/bin/env node
const argv=require("minimist")(process.argv.slice(1)),fs=require("fs"),head=require("lodash.head"),name=argv.name||"index",ext=argv.ext||"react.js",path=argv.path,isConnected=!!argv.isConnected,hasDependencies=!!argv.hasDependencies,hasConstructor=!!argv.hasConstructor,cdm=!!argv.cdm,cwm=!!argv.cwm,isPure=!argv.isPure||argv.isPure,currentDir=head(argv._),importTemplateContainer=`import { connect } from 'react-redux';\nimport { makeConnectArgs } from 'redux-threads';\nimport * as selectors from '../selectors';\nimport * as actions from '../actions';`,constructorTemplate=`constructor(props) {\n    super(props);\n  }\n`,dependenciesTemplate=`static dependencies = [];\n`,connectContainerTemplate=`const pageThread = [\n  selectors,\n  actions,\n  (stateProps, dispatchProps) => ({})\n]\n\nconst connectArgs = makeConnectArgs(\n  pageThread\n);`,importForContainer=e=>e?importTemplateContainer:"",importForDependencies=e=>e?"import resolveDependencies from 'react-resolve-dependencies';":"",template=`import React from 'react';\nimport { compose } from 'redux';\n${(e=>e?"import resolveDependencies from 'react-resolve-dependencies';":"")(hasDependencies)}\n${(e=>e?importTemplateContainer:"")(isConnected)}\n\nexport class ${name} extends React.${!0===isPure?"Pure":""}Component {\n\n  ${hasDependencies?dependenciesTemplate:"\n"}\n  ${hasConstructor?constructorTemplate:"\n"}\n  ${cwm?`componentWillMount(){}\n`:"\n"}\n  ${cdm?`componentDidMount(){}\n`:"\n"}\n  render() {\n    return(\n\n    );\n  }\n\n}\n\n${isConnected?connectContainerTemplate:""}\n\nexport default compose(\n  ${hasDependencies?"resolveDependencies()":""}\n  ${isConnected?"connect(...connectArgs)":""}\n)(${name});`,file=`${name}.${ext}`;fs.writeFile(file,template,e=>{e&&console.log(e),console.log(`Done: ${file}`)});