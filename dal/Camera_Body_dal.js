var mysql = require('mysql');
var db = require('./db_connection.js');

/*DATABASE CONFIGURATIONS*/
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'SELECT * FROM Camera_Body';
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO Camera_Body (Camera_Manufacturer, Name, Still_Image_Resolution, Sensor_Type, Lens_Mount,' +
        ' Auto_Focus_Points ) VALUES (?, ?, ?, ?, ?, ?)';
    var queryData = [params.Camera_Manufacturer, params.Name, params.Still_Image_Resolution,
        params.Sensor_Type, params.Lens_Mount, params.Auto_Focus_Points];
    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(Camera_Body_Id, callback){
    var query = 'call Camera_Body_getinfo(?)';
    var queryData = [Camera_Body_Id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE Camera_Body SET Camera_Manufacturer=?, Name=?, Still_Image_Resolution=?, ' +
        'Sensor_Type=?, Lens_Mount=?, Auto_Focus_Points=? where Camera_Body_Id=?';
    var queryData = [params.Camera_Manufacturer, params.Name, params.Still_Image_Resolution,
        params.Sensor_Type, params.Lens_Mount, params.Auto_Focus_Points, params.Camera_Body_Id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var CameraBodyLensInsert = function(Camera_Body_Id, Lens_IdArray, callback){
    var query = 'Insert into Camera_Body_Lens (Camera_Body_Id, Lens_id) values (?, ?)';
    var companyAddressData = [];
    if(addressIdArray.constructor === Array){
        for(var i = 0; i < addressIdArray.length; i++){
            companyAddressData.push([company_id, addressIdArray[i]]);
        }
    }
    else {
        companyAddressData.push([company_id, addressIdArray]);
    }
    connection.query(query, [companyAddressData], function(err, result){
        callback(err, result);
    });
};