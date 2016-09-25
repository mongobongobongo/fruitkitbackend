var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var MongoConnect = require('../lib/mongoConnect.js');
var router = express.Router();
var collection = 'employees';

/* RETRIEVE employee  listing. */
router.get('/', function (req, res, next) {
        var baa = MongoConnect.retrieve(collection, undefined, function (err, employees) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(employees);
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


/* RETRIEVE employee  specific user. */
router.get('/:id', function (req, res, next) {

        var params = req.params;
        var baa = MongoConnect.retrieve(collection, {"_id": ObjectId(params.id)}, function (err, employees) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(employees);
            }
        });
    })
    .put ('/:id', function (req, res, next) {
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
        var id = {_id: ObjectId(params.id)};

        MongoConnect.delete(collection, id, function (err, customer) {
            if (err) {
                throw err;
            } else {
                res.status(200).send();
            }
        });
    });

module.exports = router;

