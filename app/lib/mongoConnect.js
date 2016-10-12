/**
 * Created by kalle on 4/10/16.
 */

module.exports = {
    create: mongoCreate,
    retrieve: mongoFetch,
    update: mongoUpdate,
    delete: mongoDelete

};

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://37.139.24.103:27017/fruitkitdb';

function fixPayload(payload) {
    if (typeof payload == 'string') {
        return JSON.parse(payload);
    }
    return payload;
}


function mongoFetch(collection, query, callbackfunction) {

    if (query != undefined) {
        fixPayload(query);
    }

    function retrieve(db, collection, query, callback) {
        var cursor;
        var data = [];
        if (query == '') {
            cursor = db.collection(collection).find();
        } else {
            cursor = db.collection(collection).find(query);
        }
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                data.push(doc);
            } else {
                callback(data);
            }
        });
    };

    var results = null;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        results = retrieve(db, collection, query, function (results) {
            db.close();
            callbackfunction(err, results);
        });
    });
};

function mongoUpdate(collection, id, payload, callbackfunction) {
//Transform the text to a usable json object
    //payload = JSON.parse(payload);
    if (payload === undefined || payload.length == 0) {
        return false;
    }

    if (payload != undefined) {
        fixPayload(payload);
    }
    var update = function (db, collection, id, payload, callback) {
        db.collection(collection).updateOne(
            id,
            {$set: payload}
            , function (err, results) {
                callback(err, results);
            });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        update(db, collection, id, payload, function (err, result) {
            db.close();
            callbackfunction(err, result);
        });
    });


};

function mongoCreate(collection, payload, callbackfunction) {
    //Transform the text to a usable json object
    //payload = JSON.parse(payload);
    if (payload === undefined || payload.length == 0) {
        return false;
    }

    fixPayload(payload);

    function insertDocument(db, collection, payload, callback) {
        db.collection(collection).insertOne(payload, function (err, result) {
            assert.equal(err, null);
            callback(err, result);
        });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertDocument(db, collection, payload, function (err, result) {
            db.close();
            callbackfunction(err, result);
        });
    });


};

function mongoDelete(collection, payload, callbackfunction) {

    fixPayload(payload);

    function removeDocuments(db, collection, payload, callback) {
        if (payload == undefined || payload.length == 0) {
            callback();
        }
        db.collection(collection).deleteMany(
            payload,
            function (err, results) {
                callback(err, results);
            }
        );
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        if (payload.length > 1) {
            return false;
        }

        removeDocuments(db, collection, payload, function (err, result) {
            db.close();
            callbackfunction(err, result);
        });
    });

};


