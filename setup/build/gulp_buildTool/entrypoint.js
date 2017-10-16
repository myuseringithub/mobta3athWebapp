const path = require('path')
const confJson = require('./configuration/configuration.json')
const moduleSystem = require('module')

const appRootPath = path.normalize(`${__dirname}`)
// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${appRootPath}`.replace(/(^\:+)/, '')
console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
moduleSystem._initPaths()

// Run babel runtime compiler
const babelJSCompilerPath = path.normalize(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation.js/entrypoint.js`)
const babelJSCompiler = require(babelJSCompilerPath)
babelJSCompiler({
    babelConfigurationFile: 'es2015.BabelConfig.js'
})


// run app code
require('./gulpfile.js')