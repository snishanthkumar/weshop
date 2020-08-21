var express = require('express');
var router = express.Router();
var data = require('../Json/data.json');


router.get('/api/getData', (req, res) => {
    if (data.length > 0) {
        console.log(data)
        res.send({
            mesage: "Data Available",
            data: data
        })
    }

});


module.exports = router;