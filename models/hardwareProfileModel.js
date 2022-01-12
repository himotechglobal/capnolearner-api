const dbConn = require('../dbConnection')


var HardwareProfile = function(hardware) {
    this.serial_key = hardware.serial_key
}

// get all harwareprofile 
HardwareProfile.getAllHardwareProfile = (result) => {
    dbConn.query('SELECT * FROM owner_serial', (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

// update hardware profile
HardwareProfile.updateHardwareProfile = (id, data, result) => {
  dbConn.query("UPDATE owner_serial SET serial_key=? WHERE id = ?", [
      data.serial_key,  
      id
      ], (err, res)=>{
      if(err){
          console.log('Error while updating the Hardware Profile');
          result(null, err);
      }else{
          console.log("Hardware Profile updated successfully");
          result(null, res);
      }
  });
}

module.exports = HardwareProfile