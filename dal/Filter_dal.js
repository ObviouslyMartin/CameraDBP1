var mysql = require('mysql');
var db = require('./db_connection.js');

/*DATABASE CONFIGURATIONS*/
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM Filters;';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO Filters (Filter_Manufacturer, Filter_Size, Filter_Type) VALUES (?, ?, ?)';
    var queryData = [params.Filter_Manufacturer, params.Filter_Size, params.Filter_Type,
        params.Filter_Id];
    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(Filter_Id, callback){
    var query = 'Call Filter_getinfo(?)';
    var queryData = [Filter_Id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE Filters SET Filter_Manufacturer = ?, Filter_Size = ?, Filter_Type = ?, where Filter_Id = ?';
    var queryData = [params.Filter_Manufacturer, params.Filter_Size, params.Filter_Type, params.Filter_Id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};