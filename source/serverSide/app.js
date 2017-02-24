// require(`${APP.serverBasePath}/configuration.js`) // Load configuration settings.
import APP from 'configuration/configuration.export.js' // Load configuration settings.
import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import Koa from 'koa' // Koa applicaiton server
import route from 'middleware/route/route.js' // Routes & API
import serverCommonFunctionality from 'middleware/serverCommonFunctionality.js' // Middleware extending server functionality
import serverStaticFile from 'middleware/serverStaticFile.js' // Middleware extending server functionality
import notFound from 'middleware/notFound.js'
import restEndpointApi from 'middleware/database/restEndpointApi.js'

import compose from 'koa-compose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session' // Session
import push from 'koa-server-push' // HTTP/2 push.
import _ from 'underscore'
// TODO: install embeddedjs, underscore templating
// TODO: koa-subdomain

{

const serverKoa = module.exports = new Koa() // export if script is required.
if(APP.DEPLOYMENT == 'development') serverKoa.subdomainOffset = 1 // i.e. localhost

serverKoa
    .use(async (context, next) => {
        context.SZN = global.SZN || {} // Initialize SZN namespace in koa server context
        await next()
    })
    .use(serverCommonFunctionality())
    .use(notFound)
    .use(serverStaticFile())
    .use(route())
    .use(restEndpointApi) 

// Conneciton ports:
if (!module.parent || module.parent) { // Dummy for future use // if loaded as a standart script.
    http.createServer(serverKoa.callback()).listen(APP.port)
    console.log(`listening on port ${APP.port}`)
    http.createServer(serverKoa.callback()).listen(80)
    console.log('listening on port 80')
    if(APP.ssl) {
        let options = {
            key: fs.readFileSync('./sampleSSL/server.key'),
            cert: fs.readFileSync('./sampleSSL/server.crt')
        }
        https.createServer(options, serverKoa.callback()).listen(443)
        console.log('listening on port 443')
    } 
}

}