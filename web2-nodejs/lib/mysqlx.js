const mysqlx = require('@mysql/xdevapi');
const db_conn_config = { user: 'root', password: 'root', host: 'localhost', port: '33060', charset: 'utf8mb4' }
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
                response.status(400).json({'detail': 'dont exist name'})
                response.end();
            }else {
                response.status(200).json(doc)
                response.end();
            }
        })
        .catch(function (err) {
        });
})

exports.insertCollection = (function(request, response) {
    var post = request.body
    mysqlx.getSession(db_conn_config)
        .then(function (session) {
            var db = session.getSchema(config.schema);
            var myColl = db.getCollection(config.collection);
            return myColl.add(post).execute()
        })
        .then(() => {
            response.status(200).json({})
            response.end();
        })
        .catch(function (err) {
        });
})

exports.deleteCollection = (function(request, response) {
    mysqlx.getSession(db_conn_config)
        .then(function (session) {
            var name = request.params.name
            var db = session.getSchema(config.schema);
            var myColl = db.getCollection(config.collection);
            return myColl.remove('name like :param').limit(1).bind('param', name).execute()
        })
        .then(() => {
            response.status(200).json({})
            response.end();
        })
        .catch(function (err) {
        });
})

exports.updateCollection = (function(request, response) {
    mysqlx.getSession(db_conn_config)
        .then(function (session) {
            var name = request.params.name
            var db = session.getSchema(config.schema);
            var myColl = db.getCollection(config.collection);
            return myColl.modify('name like :param').set('age', request.body.age).limit(1).bind('param', name).execute()
        })
        .then(() => {
            response.status(200).json({})
            response.end();
        })
        .catch(function (err) {
        });
})