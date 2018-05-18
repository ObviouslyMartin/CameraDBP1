var mysql = require('mysql');
var db = require('./db_connection.js');

/*DATABASE CONFIGURATIONS*/
var connection = mysql.createConnection(db.config);

exports.getAll = function (callback) {
    var query = 'select * from CBA';
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
        if(err || params.Lens_Id === undefined) {
            console.log(err);
            callback(err, result);
        }
        else {
            var Camera_Body_Id = result.insertId;
            var query = 'Insert into Camera_Body_Lens (Camera_Body_Id, Lens_Id) values ?';
            var CameraBodyLensData = [];
            if(params.Lens_Id.constructor === Array){
                for(var i = 0; i < params.Lens_Id.length; i++){
                    CameraBodyLensData.push([Camera_Body_Id, params.Lens_Id[i]]);
                }
            } else {
                CameraBodyLensData.push([Camera_Body_Id, params.Lens_Id]);
            }
            connection.query(query, [CameraBodyLensData], function(err, result){callback(err, result);});
        }
    });
};

exports.getinfo = function(Camera_Body_Id, callback){
    var query = 'call Camera_Body_getinfo(?)';
    var queryData = [Camera_Body_Id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.delete = function(params, callback){
    var query1 = 'call Camera_Body_Delete(?)';
    var query2 = 'call Camera_Body_Lens_Delete(?)';
    var query3 = 'call Camera_Body_Photog_Delete(?)';
    var querydata = [params.Camera_Body_Id];
    connection.query(query1, querydata, function(err, result){
        connection.query(query2, querydata, function(err, result){
            connection.query(query3, querydata, function(err, result){
                callback(err,result);
            })
        })
    })
};
exports.update = function(params, callback){
    var query = 'UPDATE Camera_Body SET Camera_Manufacturer=?, Name=?, Still_Image_Resolution=?, ' +
        'Sensor_Type=?, Lens_Mount=?, Auto_Focus_Points=? where Camera_Body_Id=?';
    var queryData = [params.Camera_Manufacturer, params.Name, params.Still_Image_Resolution,
        params.Sensor_Type, params.Lens_Mount, params.Auto_Focus_Points, params.Camera_Body_Id];
    connection.query(query, queryData, function(err, result){
            if(err || params.Lens_Id === undefined) {
                console.log(err);
                callback(err, result);
            }
            else {
                var CameraID = params.Camera_Body_Id;
                var query1 = 'insert into Camera_Body_Lens (Camera_Body_Id, Lens_Id) values ?';
                var query2 = 'Call Camera_Body_Lens_Delete(?)';
                var deletedata = [params.Camera_Body_Id];
                var LensData = [];
                if (params.Lens_Id.constructor === Array) {
                    for (var i = 0; i < params.Lens_Id.length; i++) {
                        LensData.push([CameraID, params.Lens_Id[i]]);
                    }
                } else {
                    LensData.push([CameraID, params.Lens_Id]);
                }
                connection.query(query1, [LensData], function (err, result) {
                    connection.query(query2, deletedata, function (err, result) {
                        callback(err, result);
                    })
                })
            }
    });
};