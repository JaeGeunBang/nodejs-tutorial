const mysqlx = require('../lib/mysqlx')
const express = require('express')
const app = express()

//app.get('/', (req, res) => (mysqlx.find('foo')))
app.get('/:name', (req, res) => (mysqlx.getMyCollectionByName(req, res)))
app.listen(3000)