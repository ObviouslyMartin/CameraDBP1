var express = require('express');
var router = express.Router();
var Camera_Body_dal = require('../dal/Camera_Body_dal');
var Lens_dal = require('../dal/Lens_dal');
/* GET users listing. */
router.get('/all', function(req, res, next){
    Camera_Body_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Camera_Body/Camera_Body_View_All', {cameras: result});
        }
    })
});

router.get('/add', function(req, res) {
    Lens_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Camera_Body/Camera_Body_Add', {lens_result:result[0]});
        }
    })
});

router.get('/insert', function(req, res){
    Camera_Body_dal.insert(req.query, function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/Camera_Body/all');
        }
    });
});

router.get('/update', function(req, res){
    Camera_Body_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/Camera_Body/all');
        }
    });
});
router.get('/edit', function(req, res){
    Camera_Body_dal.getinfo(req.query.Camera_Body_Id, function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Camera_Body/Camera_Body_Update', {cameras: result[0][0], lens_result:result[1]});
        }
    });
});
module.exports = router;