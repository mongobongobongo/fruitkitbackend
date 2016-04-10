var express = require('express');
var MongoConnect = require('../lib/mongoConnect.js');
var router = express.Router();
var collection = 'customers';

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
                res.status(200).send(result);
            }
        });

    });


/* RETRIEVE customer specific user. */
router.get('/:id', function (req, res, next) {

        var params = req.params;
        var baa = MongoConnect.retrieve(collection, {"_id": ObjectId(params.id)}, function (err, customers) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(customers);
            }
        });
    })
    .put ('/:id', function (req, res, next) {
        var params = req.params;
        //TODO: Update
        //Create a payload object for update function.
        var id = {_id: ObjectId(params.id)};
        if (typeof body !== Object) {
            body = JSON.parse(body);
        }
        MongoConnect.update(collection, id, body, function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(200).send(result);
            }
        })
        res.status(200).send('Updated Single Customer: ', params.id);
    })
    .delete ('/:id', function (req, res, next) {
        var params = req.params;
        //TODO: Delete

        var payload = {};
        var id = {_id: ObjectId(params.id)};
        if (typeof body !== Object) {
            body = JSON.parse(body);
        }
        extend(true, payload, id, body);

        MongoConnect.delete(collection, payload, function (err, customer) {
            if (err) {
                throw err;
            } else {
                res.status(200).send();
            }
        });
    });

module.exports = router;

