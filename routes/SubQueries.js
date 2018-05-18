var express = require('express');
var router = express.Router();
var SubQuery_dal = require('../dal/SubQueries_dal');


/* GET users listing. */
router.get('/sq1', function(req, res, next){
    SubQuery_dal.sq1(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq1', {stuff: result[0]});
        }
    })
});

router.get('/sq2', function(req, res, next){
    SubQuery_dal.sq2(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq2', {stuff: result[0]});
        }
    })
});

router.get('/sq3', function(req, res, next){
    SubQuery_dal.sq3(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq3', {stuff: result[0]});
        }
    })
});

router.get('/sq4', function(req, res, next){
    SubQuery_dal.sq4(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq4', {stuff: result[0]});
        }
    })
});

router.get('/sq5', function(req, res, next){
    SubQuery_dal.sq5(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq5', {stuff: result[0]});
        }
    })
});

router.get('/sq6', function(req, res, next){
    SubQuery_dal.sq6(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq6', {stuff: result[0]});
        }
    })
});

router.get('/sq7', function(req, res, next){
    SubQuery_dal.sq7(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq7', {stuff: result[0]});
        }
    })
});

router.get('/sq8', function(req, res, next){
    SubQuery_dal.sq8(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq8', {stuff: result[0]});
        }
    })
});

router.get('/sq9', function(req, res, next){
    SubQuery_dal.sq9(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq9', {stuff: result[0]});
        }
    })
});

router.get('/sq10', function(req, res, next){
    SubQuery_dal.sq10(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('SubQueries/sq10', {stuff: result[0]});
        }
    })
});

module.exports = router;
