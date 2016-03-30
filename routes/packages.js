var express = require('express');
var router = express.Router();

/* RETRIEVE users listing. */
router.get('/', function(req, res, next) {
  res.send('Retrieved All Packages');
})
    .post ('/', function(req, res, next) {
  res.send('Created Package');
});

/* RETRIEVE Single Package */
router.get('/:id', function(req, res, next) {
  res.send('Retrieved Package');
})
    .put ('/:id', function(req, res, next) {
  res.send('Updated Package');
})
    .delete ('/:id', function(req, res, next) {
  res.send('Deleted Package');
});


module.exports = router;
