var express = require('express');
var router = express.Router();
var Filter_dal = require('../dal/Filter_dal');
/* GET users listing. */
router.get('/all', function(req, res, next){
    Filter_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('Filter/Filter_view_all', {Filters: result});
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
            res.render('Filter/Filter_add', {Filters_result:result[0]});
        }
    })
});

router.get('/insert', function(req, res){
    Filter_dal.insert(req.query, function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/Filters/all');
        }
    });
});

router.get('/update', function(req, res){
    Filter_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect(302, '/Filters/all');
        }
    });
});
router.get('/edit', function(req, res){
    Filter_dal.getinfo(req.query.Filter_Id , function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.render('Filter/Filter_Update', {Filters_result: result[0]});
        }
    });
});
module.exports = router;