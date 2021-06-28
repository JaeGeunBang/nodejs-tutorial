var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author')
var bodyParser = require('body-parser')

const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function(req, res) {
    var _url = req.url ;
    var queryData = url.parse(_url, true).query;
    if(queryData.id === undefined) {
        topic.home(req, res)
    } else {
        topic.page(req, res)
    }
})
app.get('/create', (req, res) => (topic.create(req, res)))
app.post('/create_process', (req, res) => (topic.create_process(req, res)))
app.get('/create', (req, res) => (topic.create(req, res)))
app.get('/update', (req, res) => (topic.update(req, res)))
app.post('/update_process', (req, res) => (topic.update_process(req, res)))
app.post('/delete_process', (req, res) => (topic.delete_process(req, res)))
app.get('/author', (req, res) => (author.home(req, res)))
app.post('/author/create_process', (req, res) => (author.create_process(req, res)))
app.get('/author/update', (req, res) => (author.update(req, res)))
app.post('/author/update_process', (req, res) => (author.update_process(req, res)))
app.post('/author/delete_process', (req, res) => (author.delete_process(req, res)))
app.listen(3000)