var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(JSON.stringify({ message: 'Hello world' }));
  //res.send("Hello world");
});

router.post('/', function(req, res, next) {
  res.send(JSON.stringify({ message: 'Hello world' }));
});

module.exports = router;
