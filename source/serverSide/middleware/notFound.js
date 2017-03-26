import path from 'path'
import config from 'configuration/configuration.export.js' // Load configuration settings.
import send from 'koa-sendfile'

export default () => {
    return async (context, next) => { // fallback to sending the app index. If not found.
        await next()
        if(404 != context.status) return;
        // return send(context, path.normalize(`${config.serverBasePath}/../clientSide/root/entrypoint.html`))
    }
}