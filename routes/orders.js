var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var MongoConnect = require('../lib/mongoConnect.js');
var router = express.Router();
var collection = 'orders';

/* RETRIEVE customer listing. */
router.get('/', function (req, res, next) {
        var baa = MongoConnect.retrieve(collection, undefined, function (err, customers) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(customers)
            }
        });
    })
    .post ('/', function (req, res, next) {
        var body = req.body;
        MongoConnect.create(collection, body, function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(200).send({id: result.insertedId});
            }
        });

    });


/* RETRIEVE customer specific user. */
router.get('/:id', function (req, res, next) {


    console.log("Getting one thing");
        var params = req.params;
        console.log(req.params);
        var baa = MongoConnect.retrieve(collection, {"_id": ObjectId(params.id)}, function (err, customers) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(customers);
            }
        });
    })
    .put ('/:id', function (req, res, next) {
        console.log("trying to PUT orded");
        var params = req.params;
        //TODO: Update
        //Create a payload object for update function.
        var id = {_id: ObjectId(params.id)};

        MongoConnect.update(collection, id, req.body, function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(result);
            }
        });
    })
    .delete ('/:id', function (req, res, next) {
        var params = req.params;
        console.log(params.id);
        var id = {_id: ObjectId(params.id)};
        console.log(id);
        MongoConnect.delete(collection, id, function (err, customer) {
            if (err) {
                throw err;
            } else {
                res.status(200).send();
            }
        });
    });

module.exports = router;

