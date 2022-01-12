const dbConn = require('../dbConnection')
const md5 = require('md5');

const user_type = 2
const status = 1

var Trainer = function(trainer) {
    this.firstname = trainer.firstname
    this.lastname = trainer.lastname
    this.profession = trainer.profession
    this.degreescompleted = trainer.degreescompleted
    this.year_exp = trainer.year_exp
    this.email = trainer.email
    this.license = trainer.license
    this.certificationscompleted = trainer.certificationscompleted
    this.email = trainer.email
    this.telephone = trainer.telephone 
    this.address = trainer.address
    this.address2 = trainer.address2
    this.city = trainer.city
    this.state = trainer.state
    this.country = trainer.country
    this.zipcode = trainer.zipcode
    this.login = new Date()
    this.status = status
    this.created = new Date()
    this.modified = new Date()
    this.associated_owner = trainer.associated_owner
    this.user_type = user_type 

    if (typeof trainer.password !== 'undefined' || typeof trainer.password == '') {
        trainer.password = 111111 + Math.floor(Math.random() * 999999);
    }

    this.password = trainer.password

}

// get all trainer 
Trainer.getAllTrainer = (result) => {
    dbConn.query('SELECT * FROM capno_users WHERE user_type=2 AND status = 1 ', (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

Trainer.getAllTrainerInactive = (result) => {
    dbConn.query('SELECT * FROM capno_users WHERE user_type=2 AND status = 2', (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

// get Trainer by ID
Trainer.getAllTrainerByID = (id, result) => {
    dbConn.query('SELECT * FROM capno_users WHERE id=? AND user_type=2', id, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// create new Trainer
Trainer.createNewTrainer = (data, result) => {
    dbConn.query('INSERT INTO capno_users SET ? ', data, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// update Trainer
Trainer.updateTrainer = (id, data, result) => {
    dbConn.query("UPDATE capno_users SET firstname=?,lastname=?,profession=?,degreescompleted=?,year_exp=?,certificationscompleted=?,license=?,email=?,city=?,state=?,country=?,zipcode=?,telephone=?,address=?,address2=?,associated_owner=?,password=? WHERE id = ? AND user_type=2", [
        data.firstname,
        data.lastname,
        data.profession,
        data.password,
        data.degreescompleted,
        data.year_exp,
        data.certificationscompleted,
        data.license,
        data.email,
        data.address,
        data.address2,
        data.city,
        data.state,
        data.country,
        data.zipcode,
        data.telephone,        
        data.associated_owner,        
        id
        ], (err, res)=>{
        if(err){
            console.log('Error while updating the Trainer');
            result(null, err);
        }else{
            console.log("Trainer updated successfully");
            result(null, res);
        }
    });
}

// Delete Trainer
Trainer.deleteTrainer = (id, result)=>{
    dbConn.query("DELETE FROM capno_users WHERE id = ?", id, (err, res)=>{
        if(err){
            console.log('Error while deleting the Trainer');
            result(null, err);
        }else{
            console.log("Trainer deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Trainer