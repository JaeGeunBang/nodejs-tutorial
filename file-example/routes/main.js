var express  = require('express');
var router   = express.Router();
var multer   = require('multer');

var storage  = multer.diskStorage({
  destination(req, file, cb) {
    let name = req.params.name;
    let path = `./uploadedFiles/${name}`;
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

var uploadWithOriginalFilename = multer({ storage: storage });

router.post('/upload/:name', uploadWithOriginalFilename.array('attachments'), function(req,res){
    res.end('{}');
});

var fs = require('fs');
var path = require('path');

router.get('/download/:name/:file', function(req, res) {
    const directoryPath = path.join(__dirname, '..', 'uploadedFiles' , req.params.name);
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        var file = req.params.file
        var resultFile = path.join(directoryPath, file)
        var extendedFile = resultFile + '.tar.gz'
        res.download(extendedFile)
    });
})

module.exports = router;
