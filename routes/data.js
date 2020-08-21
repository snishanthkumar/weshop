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


router.post('/submitAccountForm', function (req, res) {
    dbform = cloudant.db.use('icap_form');
    var recordform = { "selector": { "_id": req.body.data.Email } };
    let id = req.body.data.Email;
    let submitArray = req.body.data;
    let arraySubmit = [];
    arraySubmit.push(submitArray);
    checkRole(dbform, recordform).then(function (result) {
        superUserDataform = result.docs[0];
        console.log(result.docs[0])
        if (result.docs.length > 0) {
            let arraydata = [];

            arraydata = superUserDataform.data;
            let indexCheck = arraydata.findIndex(x => x["Client Name"] === submitArray["Client Name"])
            if (indexCheck !== -1) {
                arraydata[indexCheck] = submitArray
            }
            else {
                arraydata.push(submitArray)
            }
            superUserDataform.data = arraydata;
            saveLoginData(dbform, superUserDataform).then(function (formData) {
                res.send({ "message": "Form Submitted Successfully!" });

            });

        }
        else {

            var recordcheck = {
                "_id": id,
                "data": arraySubmit
            }
            saveLoginData(dbform, recordcheck).then(function (formData) {

                res.send({ "message": "Form Submitted Successfully!" });

            });

        }

    });
});



router.post('/submitDataForm', function (req, res) {
    var recordbase = { "selector": { "_id": req.body.data.Email } };
    dbuserlist = cloudant.db.use(req.body.db);
    let id = req.body.data.Email;
    checkRole(dbuserlist, recordbase).then(function (result) {
        superUserDatabase = result.docs[0];
        let data = [];
        data.push(req.body.data)
        if (result.docs.length > 0) {
            superUserDatabase.data = data;
            saveLoginData(dbuserlist, superUserDatabase).then(function (formData) {
                res.send({ "message": "Form Submitted Successfully!" });

            });

        }
        else {
            var recordcheck = {
                "_id": id,
                "data": data
            }
            saveLoginData(dbuserlist, recordcheck).then(function (formData) {
                res.send({ "message": "Form Submitted Successfully!" });

            });
        }
    })
})
router.post('/submitForm', function (req, res) {
    var recordbase = { "selector": { "_id": req.body.data.Email } };
    dbuserlist = cloudant.db.use(req.body.db);
    let id = req.body.data.Email;
    checkRole(dbuserlist, recordbase).then(function (result) {
        superUserDatabase = result.docs[0];
        let data = [];
        data.push(req.body.data)
        if (result.docs.length > 0) {
            superUserDatabase.data = data;
            saveLoginData(dbuserlist, superUserDatabase).then(function (formData) {
                res.send({ "message": "Form Submitted Successfully!" });

            });

        }
        else {
            var recordcheck = {
                "_id": id,
                "data": data
            }
            saveLoginData(dbuserlist, recordcheck).then(function (formData) {
                res.send({ "message": "Form Submitted Successfully!" });

            });
        }
    })
})
function checkRole(db, record) {
    return new Promise(function (resolve, reject) {
        db.find(record, function (err, data) {
            if (!err) {
                resolve(data);
            }
            else {
                resolve(err);
            }
        });
    });
}
function checkRoles(db, record) {
    return new Promise(function (resolve, reject) {
        db.find(record, function (err, data) {
            if (!err) {
                resolve(data);
            }
            else {
                resolve(err);
            }
        });
    });
}
function saveLoginData(db, record) {
    console.log('-----------');
    return new Promise(function (resolve, reject) {
        db.insert(record, function (err, data) {
            if (!err) {
                resolve(data);
            }
            else {
                resolve(err);
            }
        });
    });
}

router.post('/icapformFields', async (req, res) => {
    // var superUserDataIcap, leadershipDataIcap;
    formdb = cloudant.db.use('icap_form_data');
    var record = { "selector": { "_id": req.body.email } };
    await checkRole(formdb, record).then((result) => {
        if (result.docs.length > 0) {
            superUserDataIcap = result.docs[0];
            res.json(superUserDataIcap)
        }
        else {
            res.json("Records Not Found");
            // superUserDataIcap = "Records Not Found"
        }
    });
});


router.post('/getLeadershipData', async (req, res) => {
    leaderdb = cloudant.db.use('leadership_data');
    var record = { "selector": { "_id": req.body.email } };

    await checkRole(leaderdb, record).then((result) => {
        if (result.docs.length > 0) {
            leadershipDataIcap = result.docs[0];
            res.json(leadershipDataIcap)
        }
        else {
            res.json("Records Not Found");
        }
    });

});

router.post('/loginRecord', function (req, res) {
    var record = req.body;
    // console.log("record",record);
    db = cloudant.db.use('icap-login-data');
    // console.log('11111111',db);
    saveLoginData(db, record).then(function (userData) {
        // console.log('1112222', userData);
        res.json(userData);
    });
});

router.get('/iCapReports', function (req, res) {
    recordDb = cloudant.db.use('icap_form_data');
    dbquerries = [getAllData(recordDb)]
    var recordsData = [];
    Promise.all(dbquerries).then(function (data) {
        data[0].rows.forEach(item => {
            recordsData.push(item.doc)
        });

        recordsData.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        var response = {
            "recordsData": recordsData,
        }
        res.json(response);
    }, function (err) {
        res.send(err);
    });
});
const getAllData = (db) => {
    return new Promise(function (resolve, reject) {
        db.list({ include_docs: true }, function (err, data) {
            if (!err) {
                resolve(data);
            }
            else {
                resolve(err);
            }
        });
    });
}


router.get('/leadershipReports', function (req, res) {
    recordDb = cloudant.db.use('leadership_data');
    dbquerries = [getAllData(recordDb)]
    var recordsData = [];
    Promise.all(dbquerries).then(function (data) {
        data[0].rows.forEach(item => {
            recordsData.push(item.doc)
        });

        recordsData.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        var response = {
            "recordsData": recordsData,
        }
        res.json(response);
    }, function (err) {
        res.send(err);
    });
});



router.get('/basicReports', function (req, res) {
    recordDb = cloudant.db.use('userlist_upload');
    dbquerries = [getAllData(recordDb)]
    var recordsData = [], array = [];
    Promise.all(dbquerries).then(function (data) {
        data[0].rows.forEach(item => {
            recordsData.push(item.doc)
        });

        for (let i = 0; i < recordsData.length; i++) {
            if (recordsData[i].data) {
                array.push(recordsData[i])
            }
        }
        // console.log(array)
        res.json({ recordsData: array });
    }, function (err) {
        res.send(err);
    });
});

module.exports = router;