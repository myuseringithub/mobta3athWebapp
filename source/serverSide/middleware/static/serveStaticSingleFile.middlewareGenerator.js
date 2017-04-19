import config from 'configuration/configuration.export.js'
import path from 'path'
import send from 'koa-sendfile' // Static files.
import mount from 'koa-mount'

// returns a middleware object 
export default function serveStaticSingleFile(setting) {
    let middleware = async (context, next) => {
        let filePath = path.resolve(path.normalize(`${context.instance.config.clientBasePath}${setting.filePath}`)) 
        if(setting.urlPath == context.path) return send(context, filePath);
        await next()
    }
    return middleware
}

