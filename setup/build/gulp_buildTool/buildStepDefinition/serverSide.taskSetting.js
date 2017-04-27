import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require('configuration/configuration.js') // configuration
const prefix = 'serverSide'

const FileSource = [
    {
        key: 'npm',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'npm.js'),
            argument: [
				source('/serverSide/')
			]
        }
    },
    {
        key: 'npm:appscript',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'npm.js'),
            argument: [
				source('/serverSide/node_modules/appscript/')
			]
        }
    },
    { 
        key: 'serverSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: [
				source(),
				'serverSide/',
				'/app/',
                'sourceToSame'
			]
        }
    },
    { 
        key: 'javascript:serverSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'javascript.js'),
            argument: [
                [
                    source('serverSide/**/*.js'),
                    '!'+ source('serverSide/node_modules/**/*.js'),
                ],	
                destination('serverSide/'),
                'babelTranspile',
                config.GulpPath,
			]
        }
    },
    {
        key: `${prefix}:nodeModules`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'symlinkNodeModules.js'),
            argument: [
				destination(config.GulpPath),
			]
        }
    },
]

module.exports = FileSource