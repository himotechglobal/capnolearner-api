const dbConn = require('../dbConnection')

const user_type = 1
var Owner = function(owner) {
    this.firstname = owner.firstname
    this.lastname = owner.lastname
    this.business = owner.business
    this.email = owner.email
    this.password = owner.password
    this.telephone = owner.telephone
    this.address = owner.address
    this.city = owner.city
    this.zipcode = owner.zipcode
    this.state = owner.state
    this.country = owner.country
    this.user_type = user_type
    this.created = new Date()
    this.modified = new Date()
}

// get all trainer 
Owner.getAllOwner = (result) => {
    dbConn.query('SELECT * FROM capno_users WHERE user_type=1', (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

// update Group
Owner.ownerUpdate = (id, data, result) => {
    dbConn.query("UPDATE capno_users SET firstname=?,lastname=?,business=?,email=?,password=?,telephone=?,address=?,city=?,zipcode=?,state=?,country=? WHERE id = ? AND user_type = 1", [
        data.firstname,
        data.lastname,
        data.business,
        data.email,
        data.password,
        data.telephone,
        data.address,
        data.city,
        data.zipcode,
        data.state,
        data.country,
        id
        ], (err, res)=>{
        if(err){
            console.log('Error while updating the Admin Profile');
            result(null, err);
        }else{
            console.log("Admin Profile updated successfully");
            result(null, res);
        }
    });
}

module.exports = Owner