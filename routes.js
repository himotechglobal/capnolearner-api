const router = require('express').Router();
const dbConn = require('./dbConnection')
const md5 = require('md5');
const { body } = require('express-validator');
const { login } = require('./controllers/loginController');
const auth = require("./middleware/auth")
const {getpdf,getNotepdf,livesessionImage,livesessionNotes,getScreenshort} = require('./controllers/savepdfControlller');
const { getTrainerList, getTrainerInactiveList, getTrainerByID, createNewTrainer, updateTrainer, deleteTrainer } = require('./controllers/trainerController');
const { getClientList, getInctiveClientList,  getClientByID, createNewClient, updateClient, deleteClient } = require('./controllers/clientController');
const { getGroupProfileByGroupID, getGroupByID, createNewGroup, updateGroup,updateGroupProfile, deleteGroup } = require('./controllers/groupController');
const { getSessionList, getRecordList, getSessionAllData, getSessionSignalData ,getSessionInfo,getAllDataByType,updateZoomLink } = require('./controllers/sessionController');
const { getConfigList,getMultiReportSignalList,getReportConfig,getSavedReportConfig,getSingleReportPdf,getSingleReport,getMultileReport,getMultileReportPdf,getAllNotes } = require('./controllers/reportController');

const { getOwnerProfile,getEmailbyDomain,getEmailForSubscription,getEmailListForSubscription,getExpiredAccount,getGroupPrice,saveEmailForSubscription,renewOwnerProfile, updateOwner,updateSubscriptionsDetails } = require('./controllers/editAdminProfileController');
const { getRecordingList } = require('./controllers/getRecordingController');
const { getHardwareProfileListFive, getHardwareProfileListSix , updateHardwareProfileFive ,registerHardwareProfileFive,deleteHardwareProfileFive} = require('./controllers/hardwareProfileController');

const { getUser } = require('./controllers/getUserController');
// const { getAllForms } = require('./models/blankFormModel');
const { getAllForm, getClientForm, uploadClientForm, deleteClientForm,deleteTrainerForm, uploadClientHomework,uploadTrainerForm,getTrainerForm,getClientHomework,deleteClientHomework } = require('./controllers/formController');
const {subscriberUserList,getExpireDate7days,getExpireDate30days} = require('./controllers/subscribeuserControlller')


// subscriber user list api
router.get('/subscriber/user/list',subscriberUserList); // subscriber user list
router.get('/exprie/next/sevendays',getExpireDate7days); // 7 days expridate api user list
router.get('/exprie/next/thirtydays',getExpireDate30days); // 30 days expridate api user list
router.get('/pdf/list/:id',getpdf);
router.get('/get/pdfnotes/list/:id',getNotepdf);
// router.get('/get/pdfnotes/list/:id',getNotepdf);
router.get('/get/live/sessionimage/:sessionid/:data_type',livesessionImage);
router.get('/get/live/session/notes/:sessionid/:data_type',livesessionNotes);
router.get('/get/screenshort/:id',getScreenshort);




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
router.get('/trainer/profile/:id',auth, getTrainerByID) // get trainer by id
router.post('/trainer/create',auth, createNewTrainer) // insert new trainer
router.post('/trainer/update/:id',auth, updateTrainer) // edit trainer by id
router.post('/trainer/delete/:id',auth, deleteTrainer) // delete trainer by id

// Client
router.get('/clients',auth, getClientList) // get client list 
router.get('/client/profile/:id',auth, getClientByID) // get client by id
router.post('/client/create',auth, createNewClient) // insert new client
router.post('/client/update/:id',auth, updateClient) // edit client by id
router.post('/client/delete/:id',auth, deleteClient) // delete client by id

//Sessions
router.get('/sessions',auth, getSessionList) // get session list 
router.get('/session/record',auth, getRecordList) // get record list 
router.get('/session/data/all',auth, getSessionAllData) // get session data list 
router.get('/session/data',auth, getSessionSignalData) // get session data list 
router.get('/session/info',auth, getSessionInfo) // get session data list 
router.get('/session/data/type',auth, getAllDataByType) // get session data list 
router.post('/session/zoom/link/:id',auth, updateZoomLink) // get session data list 

//Forms
router.get('/forms/blank',auth, getAllForm) // get session data list 
router.get('/forms/client',auth, getClientForm) // get session data list 
router.get('/forms/trainer',auth, getTrainerForm) // get session data list 
router.post('/forms/client/upload',auth, uploadClientForm) // get session data list 
router.post('/forms/client/delete/:id',auth, deleteClientForm) // get session data list 
router.post('/forms/trainer/delete/:id',auth, deleteTrainerForm) // get session data list 

router.post('/homework/client/delete/:id', deleteClientHomework) // get session data list 
router.post('/homework/client/upload',auth, uploadClientHomework) // get session data list 
router.get('/homework/client',auth, getClientHomework) // get session data list 
router.post('/forms/trainer/upload',auth, uploadTrainerForm) // upload trainer forms


//Reports
router.get('/configured/report',auth, getConfigList) // get pre-config reports list 
router.get('/configured/signals',auth, getMultiReportSignalList) // get multi report signals list 
router.get('/report/config',auth, getReportConfig) // get pre-config report config
router.get('/report/saved/config',auth, getSavedReportConfig) // get saved report config
router.get('/report/single',auth, getSingleReport) // get single-session report
router.get('/report/single/pdf',auth, getSingleReportPdf) // get single-session report pdf
router.get('/report/multiple',auth, getMultileReport) // get multi-session report
router.get('/report/multiple/pdf',auth, getMultileReportPdf) // get multi-session report pdf
// router.get('/report/multiple',auth, getMultileReport) // get pre-config report config
// router.get('/report/multiple/pdf',auth, getMultileReportPdf) // get pre-config report config
router.get('/report/notes', auth, getAllNotes) // get  report notes



// Group

router.get('/group/:id',auth, getGroupByID) // get group by ID
router.post('/group/create',auth, createNewGroup) // create new group
router.post('/group/update/:id',auth, updateGroup) // Update Group by ID
router.post('/group/delete/:id',auth, deleteGroup) // Delete Group 

router.get('/group/profile/:id',auth, getGroupProfileByGroupID) // Get Devices in Group
router.post('/group/profile/update/:id',auth, updateGroupProfile) // Update Devices in Group by ID


// Edit Admin Profile
router.post('/owner/update/:id',auth, updateOwner) // Update Owner Profile
router.get('/owner/profile/:id',auth, getOwnerProfile) //Get Owner Profile
router.post('/owner/subscription/update/:id', updateSubscriptionsDetails) //Update owner Subscription 

// Recodring Distributor List
router.get('/recording/distributor',auth , getRecordingList) // Get Recordings by Distributor

// Hardware Profile 5.0
router.get('/device/five/profile/:owner',auth, getHardwareProfileListFive) // Get List of 5.0 of user
router.post('/device/five/update/:id',auth, updateHardwareProfileFive) // Update 5.0 of user
router.post('/device/five/register',auth, registerHardwareProfileFive) // Register 5.0 of user
router.post('/device/five/delete/:id',auth, deleteHardwareProfileFive) // Delete 5.0 of user

// Hardware Profile 6.0

router.get('/device/six/profile/:owner', getHardwareProfileListSix) // Get 6.0 Devices of users
// router.get('/subscription/details/:user', getUserProfile) // Get 6.0 Devices of users
router.get('/user/profile/:id', getOwnerProfile) //Get Owner Profile
router.post('/complete/renewal/:id', renewOwnerProfile) //Get Owner Profile

router.get('/emails/:domain',auth, getEmailbyDomain) //Get Email by domain
router.post('/add/emails',auth, saveEmailForSubscription) //Get Email by domain
router.get('/get/group/emails',auth, getEmailForSubscription) //Get Email by domain
router.get('/get/group/list/:domain',auth, getEmailListForSubscription) //Get Email by domain
 
router.get('/get/expired/accounts', getExpiredAccount) //Get Email by domain
router.get('/get/group/price/:id', getGroupPrice) //Get Email by domain

 

// get country list
router.get('/countries',auth, function(req, res) {
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
router.get('/states',auth, function(req, res) {
    dbConn.query('SELECT * FROM states WHERE country_id = "' + req.query.country_id + '"',
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

// // get client group list
// router.get('/getclientgroup/:id/:user_type/:status', function(req, res) {
//     var trainerCondition ; 
//     var query ;
//     if(req.params.alltrainer){
//         trainerCondition = ' AND associated_owner = "' + md5(req.params.id) + '" ' ; 
//     }
//     else{
//         trainerCondition = ' AND associated_practioner = "' + md5(req.params.id) + '" ' ; 
//     }
//     if(req.params.status == 2){
//         query = 'SELECT * FROM capno_users WHERE user_type = "' + req.params.user_type + '" ' + trainerCondition ;
//     }
//     else{
//         query = 'SELECT * FROM capno_users WHERE user_type = "' + req.params.user_type + '"  AND status = "' + req.params.status + '"  ' + trainerCondition ;
//     }
    
//     // if(query) {
//     dbConn.query(query, function(err, rows, fields) {
//         if (err) {
//             res.json({
//                 msg: 'error'
//             })
//         } else {
//             res.json({
//                 msg: 'success',
//                 states: rows
//             })
//         }
//     })
    
// })

module.exports = router; 
