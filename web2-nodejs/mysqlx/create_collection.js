const mysqlx = require('mysqlx');
const config = { collection: 'myCollection', schema: 'opentutorials', user: 'root'};

mysqlx.getSession({
                host: 'localhost', port: 33060,
                user: 'root', password: 'root' })
    .then(session => {
        const schema = session.getSchema(config.schema);

        return schema.existsInDatabase()
            .then(exists => {
                if (exists) {
                    return schema;
                }

                return session.createSchema(config.schema);
            })
            .then(schema => {
                return schema.createCollection(config.collection, { reuseExisting: true });
            })
            .then(collection => {
                return collection.add([{ name: 'foo', age: 42 }])
                    .execute()
                    .then(() => {
                        return collection.find()
                            .fields('name', 'age')
                            .execute();
                    })
                    .then(res => {
                        console.log(res.fetchOne()); // { name: 'foo', age: 42 }
                    })
                    .then(() => {
                        return collection.modify('age = :value')
                            .bind('value', 42)
                            .set('name', 'bar')
                            .execute();
                    })
                    .then(() => {
                        return collection.find()
                            .fields('name', 'age')
                            .execute();
                    })
                    .then(res => {
                        console.log(res.fetchOne()); // { name: 'bar', age: 42 }
                    })
                    .then(() => {
                        return collection.remove('true')
                            .execute();
                    })
                    .then(() => {
                        return collection.find()
                            .fields('name', 'age')
                            .execute();
                    })
                    .then(res => {
                        console.log(res.fetchAll()); // []
                    });
            })
            .then(() => {
                return schema.dropCollection(config.collection);
            })
            .then(() => {
                return session.dropSchema(config.schema);
            })
            .then(() => {
                return session.close();
            });
    });