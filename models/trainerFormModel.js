const dbConn = require('../dbConnection')
const md5 = require('md5')

var TrainerForms = function(trainerFrom) {
    this.clientid = trainerFrom.clientid
    this.sessid = trainerFrom.sessid
    this.form = trainerFrom.form
    this.status = trainerFrom.status
    this.added_on = trainerFrom.added_on
}

// get all blank forms 
TrainerForms.getAllForms = (data,result) => {
    dbConn.query('SELECT * FROM practioner_form   where clientid = ? AND sessid = ?   AND  status = 1    ',[md5(data.client_id) , data.session_id ], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })


 
} 


module.exports = TrainerForms