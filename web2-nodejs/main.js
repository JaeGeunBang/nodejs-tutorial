
var bodyParser = require('body-parser')
var compression = require('compression')
var topicRouter = require('./routes/topic')
var authorRouter = require('./routes/author')
var indexRouter = require('./routes/index')
const { swaggerUi, specs } = require('./modules/swagger');

const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(compression())
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use('/author', authorRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!')
})
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(3000)