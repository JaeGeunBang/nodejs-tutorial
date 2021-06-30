const bodyParser = require('body-parser')
const mysqlx = require('../lib/mysqlx')
const express = require('express')
const app = express()
const expressSwagger = require('express-swagger-generator')(app);
const options = require('../modules/swagger')
expressSwagger(options)

app.use(bodyParser.json());

app.get('/:name', (req, res) => (mysqlx.getMyCollectionByName(req, res)))
app.post('/', (req, res) => (mysqlx.insertCollection(req, res)))
app.put('/:name', (req, res) => (mysqlx.updateCollection(req, res)))
app.delete('/:name', (req, res) => (mysqlx.deleteCollection(req, res)))
app.listen(3000)