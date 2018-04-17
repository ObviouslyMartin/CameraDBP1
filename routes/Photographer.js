var express = require('express');
var router = express.Router();
var Photographer_dal = require('../dal/Photographer_dal');
/* GET users listing. */
router.get('/all', function(req, res, next){
    Photographer_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Photographer/Photographer_View_All', {Photographers: result});
        }
    })
});

router.get('/add', function(req, res) {
    //passing all the query parameters (req.query to the insert function instead of each individually
    Photographer_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Photographer/Photographer_Add', {Photographers:result[0]});
        }
    })
});

router.get('/insert', function(req, res){
    Photographer_dal.insert(req.query, function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/Photographer/all');
        }
    });
});

router.get('/update', function(req, res){
    Photographer_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/Photographer/all');
        }
    });
});
router.get('/edit', function(req, res){
    Photographer_dal.getinfo(req.query.ID, function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Photographer/Photographer_Update', {Photographers: result[0]});
        }
    });
});
module.exports = router;