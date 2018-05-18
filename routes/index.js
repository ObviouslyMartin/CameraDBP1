var express = require('express');
var router = express.Router();
var Camera_Body_dal = require('../dal/Camera_Body_dal');
var Filter_dal = require('../dal/Filter_dal');
var Lens_dal = require('../dal/Lens_dal');
var Photographer_dal = require('../dal/Photographer_dal');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project 2: Photography Database' });
});


module.exports = router;
