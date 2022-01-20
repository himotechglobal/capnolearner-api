const dbConn = require('../dbConnection')
const md5 = require('md5')

var BlankForms = function(blankform) {
    this.forms = blankform.forms
    this.file = blankform.file
    this.type = blankform.type
    this.status = blankform.status
    this.added_on = blankform.added_on
}

// get all blank forms 
BlankForms.getAllForms = (data,result) => {
    dbConn.query('SELECT * FROM blank_forms where type = ? AND status = 1 ',[data.type], (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

 

module.exports = BlankForms