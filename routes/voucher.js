var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId; 
var moment = require('moment');
/*
 * GET voucherList.
 */
router.get('/voucherList', function(req, res) {
    var db = req.db;
    var collection = db.get('voucher');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addvoucher.
 */
router.post('/addvoucher', function(req, res) {
    var time = moment().utcOffset('+0700').format('MMMM Do YYYY, HH:mm:ss');
    var db = req.db;
    var collection = db.get('voucher');
    req.body.last_update = time;
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletevoucher.
 */
router.delete('/deletevoucher/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('voucher');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.put('/editvoucher/:id', function(req, res) {
    var time = moment().utcOffset('+0700').format('MMMM Do YYYY, HH:mm:ss');
    var db = req.db;
    var userToEdit = req.params.id;
    var collection = db.get('voucher');
    req.body.last_update = time;
    collection.findOneAndUpdate({ _id: userToEdit }, req.body ).then(function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;