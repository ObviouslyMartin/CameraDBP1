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
    var query = 'insert into Photographer(FName, LName, Email, Specialty) values (?, ?, ?, ?)';
    var queryData = [params.FName, params.LName, params.Email, params.Specialty];
    connection.query(query, queryData, function (err, result) {
        if(err || params.Camera_Body_Id === undefined || params.Lens_Id === undefined || params.Filter_Id === undefined){
            console.log(err);
            callback(err, result);
        }
        else{
            var Photog_Id = result.insertId;
            var query1 = 'Insert into Photographer_Camera_Body (Photog_Id, Camera_Body_Id) values ?';
            var query2 = 'Insert into Photographer_Lens (Photog_Id, Lens_Id) values ?';
            var query3 = 'Insert into Photographer_Filter (Photog_Id, Filter_Id) values ?';
            var PhotogCameraData = [];
            var PhotogLensData = [];
            var PhotogFilterData = [];
            if (params.Camera_Body_Id.constructor === Array){
                for(var i = 0; i < params.Camera_Body_Id.length; i++){
                    PhotogCameraData.push([Photog_Id, params.Camera_Body_Id[i]]);
                }

            }
            else if (params.Lens_Id.constructor === Array) {
                for(var i = 0; i < params.Camera_Body_Id.length; i++){
                    PhotogLensData.push([Photog_Id, params.Lens_Id[i]]);
                }
            }
            else if (params.Filter_Id.constructor === Array) {
                for (var i = 0; i < params.Filter_Id.length; i++) {
                    PhotogFilterData.push([Photog_Id, params.Filter_Id[i]]);
                }
            }
            else{
                PhotogCameraData.push([Photog_Id, params.Camera_Body_Id]);
                PhotogLensData.push([Photog_Id, params.Lens_Id]);
                PhotogFilterData.push([Photog_Id, params.Filter_Id]);

            }
            connection.query(query1, [PhotogCameraData], function(err, result){
                    connection.query(query2, [PhotogLensData], function(err, result){
                        connection. query(query3, [PhotogFilterData], function(err, result){
                            callback(err, result);
                            });
                    });
            });
        }
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
    var query = 'UPDATE Photographer SET FName=?, LName=?, Email=?, Specialty=? where ID=?';
    var queryData = [params.ID, params.FName, params.LName, params.Email,
        params.Specialty];
    connection.query(query, queryData, function(err, results){
        if(err||params.Camera_Body_Id){
            console.log(err);
            callback(err, results);
        }
        else {
            var PhotogID = params.ID;
            var query1 = 'INSERT into Photographer_Camera (Photog_Id, Camera_Body_Id) values ?';
            var query2 = 'INSERT into Photographer_Lens (Photog_Id, Lens_Id) values ?';
            var query3 = 'INSERT into Photographer_Filter (Photog_Id, Filter_Id) Values ?';
            var query4 = 'Call Photographer_Camera_Delete (?)';
            var query5 = 'Call Photographer_Lens_Delete (?)';
            var query6 = 'Call Photographer_Filter_Delete (?)';;
            var CameraData = [];
            var LensData =[];
            var FilterData = [];
        if (params.Camera_Body_Id.constructor === Array){
            for(var i = 0; i < params.Camera_Body_Id.length; i++){
                CameraData.push([PhotogID, params.Camera_Body_Id[i]]);
            }

        }
        else if (params.Lens_Id.constructor === Array) {
            for(var i = 0; i < params.Camera_Body_Id.length; i++){
                LensData.push([PhotogID, params.Lens_Id[i]]);
            }
        }
        else if (params.Filter_Id.constructor === Array) {
            for (var i = 0; i < params.Filter_Id.length; i++) {
                FilterData.push([PhotogID, params.Filter_Id[i]]);
            }
        }
        else {
            CameraData.push([PhotogID, params.Camera_Body_Id]);
            LensData.push([PhotogID, params.Lens_Id]);
            FilterData.push([PhotogID, params.Filter_Id]);

        }
        };
        connection.query(query1, [CameraData], function(err, result){
            connection.query(query2, [LensData], function(err, result){
                connection. query(query3, [FilterData], function(err, result){
                    connection.query(query4,PhotogID, function(err, result) {
                        connection.query(query5, PhotogID, function (err, result) {
                            connection.query(query6, PhotogID, function (err, result) {
                                callback(err, result);
                            })
                        })
                    })
                })
            });
        });
    });
};


var PhotogCameraBodyInsert = function(Photog_Id, Camera_Body_IdArray, callback){
    var query = 'Insert into Photographer_Camera_Body (Photog_Id, Camera_Body_Id) values (?, ?)';
    var PhotogCameraBodyData = [];
    if(Camera_Body_IdArray.constructor === Array){
        for(var i = 0; i < Camera_Body_IdArray.length; i++){
            PhotogCameraBodyData.push([Photog_Id, Camera_Body_IdArray[i]]);
        }
    }
    else {
        PhotogCameraBodyData.push([Photog_Id, Camera_Body_IdArray]);
    }
    connection.query(query, [PhotogCameraBodyData], function(err, result){
        callback(err, result);
    });
};

var PhotogLensInsert = function(Photog_Id, Lens_IdArray, callback){
    var query = 'Insert into Photographer_Lens (Photog_Id, Lens_Id) values (?, ?)';
    var PhotogLensData = [];
    if(Lens_IdArray.constructor === Array){
        for(var i = 0; i < Lens_IdArray.length; i++){
            PhotogLensData.push([Photog_Id, Lens_IdArray[i]]);
        }
    }
    else {
        PhotogLensData.push([Photog_Id, Lens_IdArray]);
    }
    connection.query(query, [PhotogLensData], function(err, result){
        callback(err, result);
    });
};

var PhotogFilterInsert = function(Photog_Id, Filter_IdArray, callback){
    var query = 'Insert into Photographer_Filter (Photog_Id, Filter_Id) values (?, ?)';
    var PhotogFilterData = [];
    if(Filter_IdArray.constructor === Array){
        for(var i = 0; i < Filter_IdArray.length; i++){
            PhotogFilterData.push([Photog_Id, Fitler_IdArray[i]]);
        }
    }
    else {
        PhotogFilterData.push([Photog_Id, Filter_IdArray]);
    }
    connection.query(query, [PhotogFilterData], function(err, result){
        callback(err, result);
    });
};

var PhotographerCameraBodyUpdate = function(Photographer_id, Camera_Body_IdArray, callback){
    var query = 'CALL Photographer_Camera_Delete(?)';
    connection.query(query, Photographer_id, function(err, result){
        if(err || Camera_Body_IdArray === undefined){
            callback(err, result);
        }else{
            PhotogCameraBodyInsert(Photographer_id, Camera_Body_IdArray, callback);
        }
    });
};

var PhotographerLensUpdate = function(Photographer_id, Lens_IdArray, callback){
    var query = 'CALL Photographer_Lens_delete(?)';
    connection.query(query, Photographer_id, function(err, result){
        if(err || Lens_IdArray === undefined){
            callback(err, result);
        }else{
            PhotogLensInsert(Photographer_id, Lens_IdArray, callback);
        }
    });
};

var PhotographerFilterUpdate = function(Photographer_id, Filter_IdArray, callback){
    var query = 'CALL Photographer_Filter_delete(?)';
    connection.query(query, Photographer_id, function(err, result){
        if(err || Filter_IdArray === undefined){
            callback(err, result);
        }else{
            PhotogFilterInsert(Photographer_id, Filter_IdArray, callback);
        }
    });
};

exports.delete = function(params, callback){
    var query1 = 'call Photographer_Delete(?)';
    var query2 = 'call Photographer_Camera_Delete(?)';
    var query3 = 'call Photographer_Lens_Delete(?)';
    var query4 = 'call Photographer_Filter_Delete(?)';
    var querydata = [params.ID];
    connection.query(query1, querydata, function(err, result){
        connection.query(query2, querydata, function(err, result){
            connection.query(query3, querydata, function(err, result){
                connection.query(query4, querydata, function(err, result){
                    callback(err,result);
                })
            })
        })
    })
};