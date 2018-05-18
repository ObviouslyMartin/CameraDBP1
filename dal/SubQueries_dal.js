var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.sq1 = function (callback) {
    var query = 'call sq1';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
exports.sq2 = function (callback) {
    var query = 'call sq2';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.sq3 = function (callback) {
    var query = 'call sq3';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
exports.sq4 = function (callback) {
    var query = 'call sq4';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
exports.sq5 = function (callback) {
    var query = 'call sq5';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
exports.sq6 = function (callback) {
    var query = 'call sq6';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.sq7 = function (callback) {
    var query = 'call sq7';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.sq8 = function (callback) {
    var query = 'call sq8';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
exports.sq9 = function (callback) {
    var query = 'call sq9';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.sq10 = function (callback) {
    var query = 'call sq10';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};