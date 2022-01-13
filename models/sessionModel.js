const md5 = require('md5');
const dbConn = require('../dbConnection')

 
var Session = function(session) {
    this.name = session.name
    this.hw = session.hw
    this.cid = session.cid
    this.zoom_link = session.zoom_link
    this.created = new Date()
}

// get all Client 
Session.getAllSession = (data,result) => {
   
        dbConn.query('SELECT * FROM client_session WHERE   cid = ? AND  hw = ?   order by `id` desc', [md5(data.cid) ,data.hw],  (err, res) => {
            if (err) {
              result(null, err)
            } else {
              result(null, res)
            }
          })
    
  
} 
 
module.exports = Session