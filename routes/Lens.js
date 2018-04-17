var express = require('express');
var router = express.Router();
var Lens_dal = require('../dal/Lens_dal');
var Filter_dal =require('../dal/Filter_dal');
/* GET users listing. */
router.get('/all', function(req, res, next){
    Lens_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Lens/Lens_view_all', {Lens: result});
        }
    })
});

router.get('/add', function(req, res) {
    //passing all the query parameters (req.query to the insert function instead of each individually
    Filter_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Lens/Lens_add', {filters:result[0]});
        }
    })
});

router.get('/insert', function(req, res){
    Lens_dal.insert(req.query, function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/Lens/all');
        }
    });
});

router.get('/update', function(req, res){
    Lens_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/Lens/all');
        }
    });
});
router.get('/edit', function(req, res){
    Lens_dal.getinfo(req.query.Lens_Id, function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Lens/Lens_Update', {Lens: result[0][0], Filters_result:[1]});
        }
    });
});
module.exports = router;