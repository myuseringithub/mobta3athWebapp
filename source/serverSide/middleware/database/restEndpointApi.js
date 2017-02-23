import serverConfig from 'configuration/serverConfig.js'
import r from 'rethinkdb'
import compose from 'koa-compose'
import { handleConnection } from 'middleware/database/commonDatabaseFunctionality.js'

// NOTE: host/api/v1/<tableName>/<havingField>/<subfield-recursive>.json 

let prefix = 'api/v1';

export async function get(context, next) {
    if(context.request.method != "GET") return await next() // if not GET
    console.log('SZN - Inside GET <REST API>/*')
    let url = context.request.url // url path with parameters
    url = url.replace(prefix,'') // remove prefix
    url = url.substring(url).split("?")[0] // remove query parameters
    let pathArray = url.split( '/' ).filter(x => x); // path sections array
    let lastPath = pathArray.slice(-1)[0] // get last array element
    pathArray[pathArray.length - 1] = lastPath.slice(0, lastPath.indexOf(".")) // remove .json ending
    if(lastPath.substr(lastPath.indexOf('.')+1) != "json") return await next() // if without .json ending

    context.status = 200
    
    // .withFields('domains')('domains')('xcom')('path')

    let query = r
        .table(pathArray[0]) // first field assigns name of table
        .catch((error) => {
            throw(error)
        })
    pathArray.shift()

    // if(pathArray[1]) query = query.get(pathArray[1])
    
    if(pathArray[0]) query = query.withFields(pathArray[0])(pathArray[0])
    pathArray.shift()
    pathArray.forEach(pathSection => query = query(pathSection))

    query = query
        .run(context.SZN.rethinkdbConn)
    
    if(!pathArray[1] || true) {
        query = query
            .then((cursor) => {
                return cursor.toArray()
            })
    }

    await query
        .then((result) => {
            context.body = result
        }).catch((error) => {
            throw(error)
        })

    return
}

export default compose([
    handleConnection,
    get
])