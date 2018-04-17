var mysql = require('mysql');
var db = require('./db_connection.js');

/*DATABASE CONFIGURATIONS*/
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM Photographer;';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO Photographer (FName, LName, Email, Specialty) VALUES (?, ?, ?, ?);';
    var queryData = [params.FName, params.LName, params.Email, params.Specialty];
    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(Photographer_Id, callback){
    var query = 'call Photographer_getinfo(?)';
    var queryData = [Photographer_Id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE Photographer SET FName=?, LName=?, Email=?, ' +
        'Specialty=? where ID=?';
    var queryData = [params.FName, params.LName, params.Email,
        params.Specialty, params.ID];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};