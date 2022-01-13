const router = require('express').Router();
const dbConn = require('./dbConnection')
const md5 = require('md5');
const { body } = require('express-validator');
const { login } = require('./controllers/loginController');
const auth = require("./middleware/auth")
const { getTrainerList, getTrainerInactiveList, getTrainerByID, createNewTrainer, updateTrainer, deleteTrainer } = require('./controllers/trainerController');
const { getClientList, getInctiveClientList,  getClientByID, createNewClient, updateClient, deleteClient } = require('./controllers/clientController');
const { getGroupList, getGroupByID, createNewGroup, updateGroup, deleteGroup } = require('./controllers/groupController');
const { getSessionList, getRecordList, getSessionAllData, getSessionSignalData } = require('./controllers/sessionController');
const { getConfigList,getMultiReportSignalList,getReportConfig,getSavedReportConfig } = require('./controllers/reportController');

const { getOwnerList, updateOwner } = require('./controllers/editAdminProfileController');
const { getRecordingList } = require('./controllers/getRecordingController');
const { getHardwareProfileList, updateHardwareProfile } = require('./controllers/hardwareProfileController');

const { getUser } = require('./controllers/getUserController');


// Login
router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
], login);

// Get User 
router.get('/getuser',getUser); // get owner list

// Trainer
router.get('/trainers',auth, getTrainerList) // get trainer list
router.get('/trainer/:id', getTrainerByID) // get trainer by id
router.post('/trainer/create', createNewTrainer) // insert new trainer
router.put('/trainer/update/:id', updateTrainer) // edit trainer by id
router.delete('/trainer/delete/:id', deleteTrainer) // delete trainer by id

// Client
router.get('/clients',auth, getClientList) // get client list 
router.get('/client/:id', getClientByID) // get client by id
router.post('/client/create', createNewClient) // insert new client
router.put('/client/update/:id', updateClient) // edit client by id
router.delete('/client/delete/:id', deleteClient) // delete client by id

//Sessions
router.get('/sessions',auth, getSessionList) // get session list 
router.get('/session/record',auth, getRecordList) // get record list 
router.get('/session/data/all',auth, getSessionAllData) // get session data list 
router.get('/session/data',auth, getSessionSignalData) // get session data list 
 

//Reports
router.get('/configured/report',auth, getConfigList) // get pre-config list 
router.get('/configured/signals',auth, getMultiReportSignalList) // get multi report signals list 
router.get('/report/config',auth, getReportConfig) // get pre-config report config
router.get('/report/saved/config',auth, getSavedReportConfig) // get pre-config report config
  

// Group
router.get('/group', getGroupList)
router.get('/group/:id', getGroupByID)
router.post('/group/create', createNewGroup)
router.put('/group/update/:id', updateGroup)
router.delete('/group/delete/:id', deleteGroup)

// Edit Admin Profile
router.put('/owner/update/:id', updateOwner)
router.get('/owner/list', getOwnerList)

// Recodring Distributor List
router.get('/recording/distributor', getRecordingList)

// Hardware Profile
router.get('/hardwareprofile', getHardwareProfileList)
router.put('/hardwareprofile/update/:id', updateHardwareProfile)
 
// get country list
router.get('/countries', function(req, res) {
    dbConn.query('SELECT * FROM countries', function(err, rows) {
 
        if (err) {
            res.json({
                msg: 'error'
            });
        } else {
            res.json({
                msg: 'success',
                countries: rows
            });
        }
    });
});

// get state list according to country_id
router.post('/states', function(req, res) {
    dbConn.query('SELECT * FROM states WHERE country_id = "' + req.body.country_id + '"',
        function(err, rows, fields) {
            if (err) {
                res.json({
                    msg: 'error'
                });
            } else {
                res.json({
                    msg: 'success',
                    states: rows
                });
            }
        });
});

// get client group list
router.get('/getclientgroup/:id/:user_type/:status', function(req, res) {
    var trainerCondition ; 
    var query ;
    if(req.params.alltrainer){
        trainerCondition = ' AND associated_owner = "' + md5(req.params.id) + '" ' ; 
    }
    else{
        trainerCondition = ' AND associated_practioner = "' + md5(req.params.id) + '" ' ; 
    }
    if(req.params.status == 2){
        query = 'SELECT * FROM capno_users WHERE user_type = "' + req.params.user_type + '" ' + trainerCondition ;
    }
    else{
        query = 'SELECT * FROM capno_users WHERE user_type = "' + req.params.user_type + '"  AND status = "' + req.params.status + '"  ' + trainerCondition ;
    }
    
    // if(query) {
    dbConn.query(query, function(err, rows, fields) {
        if (err) {
            res.json({
                msg: 'error'
            })
        } else {
            res.json({
                msg: 'success',
                states: rows
            })
        }
    })
    
})

module.exports = router;
