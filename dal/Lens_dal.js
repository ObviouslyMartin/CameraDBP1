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
        if (err || params.Filter_Id === undefined){
            console.log(err);
            callback(err, result);
        }
        else {
            var Lens_Id = result.insertId;
            var query = 'Insert into Lens_Filter(Lens_Id, Filter_Id) values ?';
            var LensFilterData = [];
            if (params.Filter_Id.constructor === Array) {
                for (var i = 0; i < params.Filter_Id.length; i++) {
                    LensFilterData.push([Lens_Id, params.Filter_Id[i]]);
                }
            } else {
                LensFilterData.push([Lens_Id, params.Filter_Id]);
            }
            connection.query(query, [LensFilterData], function (err, result) {
                callback(err, result)
            });
        }
    });

};

var LensFilterInsert = function(Lens_Id, Filter_IdArray, callback){
    var query = 'Insert into Camera_Body_Lens (Camera_Body_Id, Lens_id) values (?, ?)';
    var LensFilterData = [];
    if(Filter_IdArray.constructor === Array){
        for(var i = 0; i < Filter_IdArray.length; i++){
            LensFilterData.push([Lens_Id, Filter_IdArray[i]]);
        }
    }
    else {
        LensFilterData.push([Lens_Id, Filter_IdArray]);
    }
    connection.query(query, [LensFilterData], function(err, result){
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
        if(err || params.Filter_Id === undefined){
            console.log(err);
            callback(err, result);
        }
        else {
            var LensID = params.Lens_Id;
            var query1 = 'insert into Lens_Filter (Lens_Id, Filter_Id) values ?';
            var query2 = 'Call Lens_Filter_Delete(?)';
            var deletedata = [params.Lens_Id];
            var FilterData = [];
            if(params.Lens_Id.constructor === Array) {
                for(var i = 0; i < params.Filter_Id.length; i++){
                    FilterData.push([LensID, params.Filter_Id]);
                }
            } else {
                FilterData.push([LensID, params.Filter_Id]);
            }
            connection.query(query1, [FilterData], function(err, result){
                connection.query(query2, deletedata, function(err, result){})
                    callback(err, result);
            })
        }
    });
};
exports.delete = function(params, callback){
    var query1 = 'call Lens_Delete(?)';
    var query2 = 'call Lens_Camera_Body_Delete(?)';
    var query3 = 'call Lens_Filter_Delete(?)';
    var query4 = 'call Lens_Photog_Delete(?)';
    var querydata = [params.Lens_Id];
    connection.query(query1, querydata, function(err, result){
        connection.query(query2, querydata, function(err, result){
            connection.query(query3, querydata, function(err, result){
                connection.query(query4, querydata, function(err, result) {
                    callback(err,result);
                })
            })
        })
    })
};
var LensFilterUpdate = function (Lens_Id, Filter_IdArray, callback){
    var query = 'CAll Lens_Filter_delelete(?)';
    connection.query(query, Lens_Id, function(err, result){
        if(err || Filter_IdArray === undefined) {
            callback(err, result);
        }
        else {
            LensFilterInsert(Lens_Id, Filter_IdArray, callback);
        }
    });
};