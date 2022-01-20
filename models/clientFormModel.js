const dbConn = require('../dbConnection')
const md5 = require('md5')

var ClientForms = function(cleintform) {
    this.cl_id = cleintform.cl_id
    this.form_name = cleintform.form_name
    this.form = cleintform.form
    this.status = cleintform.status
    this.added_on = cleintform.added_on
}

// get all blank forms 
ClientForms.getAllForms = (data,result) => {
    dbConn.query('SELECT * FROM client_form as cf LEFT JOIN blank_forms as bf on bf.id = cf.form_name  where cf.cl_id = ? AND cf.form_name = ? AND cf.status = 1  AND bf.type = ?  ',[md5(data.client_id) , data.form_id ,  data.type], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 


ClientForms.getAllClientForms = (data,result) => {
    dbConn.query('SELECT * FROM client_form where cl_id = ?  AND status = 1 ',[md5(data.client_id)], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 


module.exports = ClientForms