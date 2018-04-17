var mysql = require('mysql');
var db = require('./db_connection.js');

/*DATABASE CONFIGURATIONS*/
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM Lens';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO Lens (Lens_Manufacturer, Focal_length, Max_Aperture_Value, Zoom_Type, ' +
        'Lens_Mount, Lens_Format_Type, Filter_Thread_Size) VALUES (?, ?, ?, ?, ?, ?, ?)';
    var queryData = [params.Lens_Manufacturer, params.Focal_length, params.Max_Aperture_Value,
        params.Zoom_Type, params.Lens_Mount, params.Lens_Format_Type, params.Filter_Thread_Size];
    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(Lens_Id, callback){
    var query = 'call Lens_getinfo(?)';
    var queryData = [Lens_Id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE Lens SET Lens_Manufacturer=?, Focal_length=?, Max_Aperture_Value=?, Zoom_Type=?, Lens_Mount=?, Lens_Format_Type=?, Filter_Thread_Size=? where Lens_Id=?';
    var queryData = [params.Lens_Manufacturer, params.Focal_length, params.Max_Aperture_Value,
        params.Zoom_Type, params.Lens_Mount, params.Lens_Format_Type, params.Filter_Thread_Size, params.Lens_Id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};