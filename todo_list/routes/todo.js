var express = require('express');
var router = express.Router();
var fs = require('fs')

router.get('/', function(req, res) {
	res.render('todo', { title: 'todo 화면' });
})

/* GET home page. */
router.get('/list', function(req, res) {
  fs.exists('./todo_list.json', function (exists) {	// ToDo 목록 존재 확인
    if(exists) {
        fs.readFile('./todo_list.json', {
            'encoding': 'utf8'
        }, function (err, list) {	// todo_list.json 파일 읽기
            res.json(list);
        });
    } else {
        var list = {	// 기본 ToDo 목록 형식
            'list': []
        };

        fs.writeFile('./todo_list.json', JSON.stringify(list), function (err) {	// todo_list.json 파일 쓰기
            res.json(list);
        });
    }
	});
});

router.post('/add', function(req, res) {
    var todo = {	// 기본 ToDo 항목 형식
		'contents': '',
		'complete': false
	};

	todo.contents = req.body.contents;

	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);

		data.list.push(todo);	// 새로운 ToDo 항목 추가

		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
})

router.post('/complete', function(req, res) {
    fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);

		data.list[req.body.index].complete = true;

		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
})

router.post('/del', function(req, res) {
    fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);

		data.list[req.body.index] = null;	// 선택한 ToDo 항목 삭제
		data.list = data.list.filter(Boolean);	// 유효한 값 추려내기

		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
})

module.exports = router;
