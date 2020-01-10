var userModel = require('../model/userModel');

exports.createUser = function (userDetails, cb) {
    console.log('Create New User for ' + JSON.stringify(userDetails));
    var ti = new userModel(userDetails);
    ti.save(function (err) {
        if(err)
            console.log("ERROR: "+err);
        cb(err, ti);
    });
};

exports.retrieveAllUsers = function (cb) {
    console.log('Retrieve All Users');
    var query = {}; // get all
    userModel.find(query, function (err, allDBItems) {
        cb(err, allDBItems);
    });
};


exports.retrieveUsersByQuery = function(query, cb){
    console.log('Retrieve Users By Query '+JSON.stringify(query));
    userModel.find(query, function (err, allDBItems) {
        cb(err, allDBItems);
    });
}

exports.retrieveSingleUserById = function(id, cb){
    console.log('Retrieve Single User By ID '+id);
    userModel.findById(id, function (err, singleDBItem) {
        cb(err, singleDBItem);
    });
}

exports.retrieveSingleUserByQuery = function(query, cb){
    console.log('Retrieve Single User By Query '+JSON.stringify(query));
    userModel.findOne(query, function (err, singleItem) {
        if(err)
            console.log("ERROR: "+err);
        cb(err, singleItem);
    });
}

exports.updateUser = function (userDetails, cb) {
    console.log('Update User ' + userDetails.id);
    userModel.findById(userDetails.id, function (err, qObj) {
        if (err)
            cb(err, null);
        else {
            if (userDetails._id)
                delete userDetails._id;

            console.log(JSON.stringify(userDetails));
            for (var p in userDetails) {
                //console.log(userDetails[p])
                qObj[p] = userDetails[p];
            }

            // Save Updated Statement
            qObj.save(function (err) {
                cb(err, qObj);
            });
        }
    });
};


exports.deleteUser = function (id, cb) {
    console.log('Delete Resource ' + id);
    userModel.findById(id, function (err, qObj) {
        if (err)
            cb(err, null);
        else {
            qObj.is_deleted = true;
            // Save Updated Statement
            qObj.save(function (err) {
                cb(err, qObj);
            });
        }
    });
};