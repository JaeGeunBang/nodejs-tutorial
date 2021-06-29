const mysqlx = require('@mysql/xdevapi');
const db_conn_config = { user: 'root', password: 'root', host: 'localhost', port: '33060' }
const config = { collection: 'myCollection', schema: 'opentutorials'};

exports.getMyCollectionByName = (function(request, response) {
    mysqlx.getSession(db_conn_config)
        .then(function (session) {
            var name = request.params.name
            var db = session.getSchema(config.schema);
            var myColl = db.getCollection(config.collection);
            return myColl.find('name like :param').limit(1).bind('param', name).execute()
        })
        .then(result => {
            doc = result.fetchOne()
            if(doc === undefined) {
                response.writeHead(404);
                response.end()
            }else {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(doc));
                response.end();
            }
        })
        .catch(function (err) {
        });
})
