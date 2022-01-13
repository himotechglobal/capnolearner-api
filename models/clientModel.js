const md5 = require('md5');
const dbConn = require('../dbConnection')

const user_type = 3
const status = 1

var Client = function(client) {
    this.firstname = client.firstname
    this.lastname = client.lastname
    this.email = client.email
    this.password = client.password
    this.gender = client.gender
    this.age = client.age
    this.address = client.address
    this.address2 = client.address2
    this.city = client.city
    this.state = client.state
    this.country = client.country
    this.zipcode = client.zipcode
    this.complaint = client.complaint
    this.telephone = client.telephone
    this.profession = client.profession  
    this.education = client.education
    this.status = status
    this.user_type = user_type
    this.login = new Date()
    this.created = new Date()
    this.modified = new Date()
}

// get all Client 
Client.getAllClientTrainer = (data,result) => {
    if(data.status){
    
        dbConn.query('SELECT * FROM capno_users WHERE   status = ? AND  associated_practioner = ? and user_type= ?  order by `firstname` asc', [data.status , md5(data.user_id),data.user_type],  (err, res) => {
            if (err) {
              result(null, err)
            } else {
              result(null, res)
            }
          })
    }
    else{
        dbConn.query('SELECT * FROM capno_users WHERE  user_type=?  AND  associated_practioner = ?  order by `firstname` asc', [data.user_type,md5(data.user_id)],  (err, res) => {
            if (err) {
              result(null, err)
            } else {
              result(null, res)
            }``
          })
    }
  
} 

Client.getAllClientOwner = (data,result) => {
    if(data.status){
    
        dbConn.query('SELECT * FROM capno_users WHERE   status = ? AND (associated_owner = ? OR associated_practioner = ?) and user_type= ?   order by `firstname` asc', [data.status , md5(data.user_id),md5(data.user_id) ,data.user_type],  (err, res) => {
            if (err) {
              result(null, err)
            } else {
              result(null, res)
            }
          })
    }
    else{
        dbConn.query('SELECT * FROM capno_users WHERE  user_type= ?   AND  (associated_owner = ? OR associated_practioner = ?)  order by `firstname` asc', [data.user_type,md5(data.user_id),md5(data.user_id)],  (err, res) => {
            if (err) {
              result(null, err)
            } else {
              result(null, res)
            }``
          })
    }
  
} 

// get all Client 
Client.getAllInactiveClient = (result) => {
    dbConn.query('SELECT * FROM capno_users WHERE user_type=3 AND status = 2', (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

// get Client by ID
Client.getAllClientByID = (id, result) => {
    dbConn.query('SELECT * FROM capno_users WHERE id=? AND user_type=3', id, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// create new Client
Client.createNewClient = (data, result) => {
    dbConn.query('INSERT INTO capno_users SET ? ', data, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// update Client
Client.updateClient = (id, data, result) => {
    dbConn.query("UPDATE capno_users SET firstname=?,lastname=?,email=?,password=?,gender=?,age=?,address=?,address2=?,city=?,state=?,country=?,zipcode=?,complaint=?,telephone=?,profession=?,education=? WHERE id = ? AND user_type=3", [
        data.firstname,
        data.lastname,
        data.email,
        data.password,
        data.gender,
        data.age,
        data.address,
        data.address2,
        data.city,
        data.state,
        data.country,
        data.zipcode,
        data.complaint,
        data.telephone,
        data.profession,
        data.education,
        id
        ], (err, res)=>{
        if(err){
            console.log('Error while updating the Client');
            result(null, err);
        }else{
            console.log("Client updated successfully");
            result(null, res);
        }
    });
}

// Delete Client
Client.deleteClient = (id, result)=>{
    dbConn.query("DELETE FROM capno_users WHERE id = ?", id, (err, res)=>{
        if(err){
            console.log('Error while deleting the Client');
            result(null, err);
        }else{
            console.log("Client deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Client