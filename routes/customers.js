var express = require('express');
var router = express.Router();
var promise = require('promise');

/* RETRIEVE customer listing. */
router.get('/', function (req, res, next) {
        var baa = mongoFetch('customers', function (err, customers) {
            console.log ('GOT STUFF: ', customers);
            res.send(customers);
        });
    })
    .post ('/', function (req, res, next) {
        mongoCreate('customers', '{"name" : "BATMAN"}');
        res.send('Created Customer. Now go and fetch it!');
    });


/* RETRIEVE customer specific user. */
router.get('/:id', function (req, res, next) {
        var params = req.params;
        res.status(200).send('Retrieved a customer: ', params.id)
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
    var data=[];
    console.log ('RETRIEVING NOW');
    if (query == undefined) {
        console.log ("it's undefined");
        cursor = db.collection(collection).find();
    } else {
        cursor = db.collection(collection).find(query);
    }

    console.log ("Cursor is now ", cursor);
    cursor.each(function (err, doc) {
        console.log ('wtf is doc ', doc);
        assert.equal(err, null);
        if (doc != null) {
            console.log ('pushing data....');
            data.push(doc);
        } else {
            callback();
            console.log ('RETURNING data: ', data);
            return data;
        }
    });

};


function mongoFetch(collection, query) {

    var results = null;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        results = retrieve(db, collection, query, function () {
            db.close();
        });
    });
    return results;
};

function mongoUpdate() {

};

function mongoCreate(collection, payload) {
    //Transform the text to a usable json object
    payload = JSON.parse(payload);
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


