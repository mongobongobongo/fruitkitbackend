var express = require('express');
var router = express.Router();
var promise = require('promise');

/* RETRIEVE customer listing. */
router.get('/', function (req, res, next) {
        var baa = mongoFetch('customers', undefined, function (err, customers) {
            if (err) {

            } else {

                res.status(200).send(customers)
            }
        });
    })
    .post ('/', function (req, res, next) {
        var body = req.body;
        mongoCreate('customers', body);
        res.send('Created Customer. Now go and fetch it!');
    });


/* RETRIEVE customer specific user. */
router.get('/:id', function (req, res, next) {

        var params = req.params;
        var baa = mongoFetch('customers', {"_id": ObjectId(params.id)}, function (err, customers) {
            if (err) {

            } else {
                res.status(200).send(customers);
            }
        });
    })
    .put ('/:id', function (req, res, next) {
        var params = req.params;
        res.status(200).send('Updated Single Customer: ', params.id);
    })
    .delete ('/:id', function (req, res, next) {
        var params = req.params;
        res.status(200).send('Deleted user with id: ', params.id);
    });

module.exports = router;


/* FIND A BETTER PLACE FOR THIS!!! */


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/fruitkit';

var ObjectId = require('mongodb').ObjectID;


function retrieve(db, collection, query, callback) {
    var cursor;
    var data = [];
    if (query == undefined) {
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


function mongoFetch(collection, query, callbackfunction) {


    var results = null;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        results = retrieve(db, collection, query, function (results) {
            callbackfunction(err, results);
            db.close();

        });
    });
};

function mongoUpdate() {

};

function mongoCreate(collection, payload) {
    //Transform the text to a usable json object
    //payload = JSON.parse(payload);
    console.log ("Creating new thing");
    console.log (payload);
    

    function insertDocument(db, collection, payload, callback) {
        console.log (collection);
        db.collection(collection).insertOne(payload, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection. Go fetch it yo!");
            callback();
        });
    };

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log ("here so far");
        insertDocument(db, collection, payload, function () {
            db.close();
        });
    });


};

function mongoDelete() {

};


