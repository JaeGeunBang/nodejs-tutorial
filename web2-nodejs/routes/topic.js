
var express = require('express');
var router = express.Router() ;
var topic = require('../lib/topic');

router.get('/create', (req, res) => (topic.create(req, res)))
router.post('/create_process', (req, res) => (topic.create_process(req, res)))
router.get('/create', (req, res) => (topic.create(req, res)))
router.get('/update', (req, res) => (topic.update(req, res)))
router.post('/update_process', (req, res) => (topic.update_process(req, res)))
router.post('/delete_process', (req, res) => (topic.delete_process(req, res)))

module.exports = router;