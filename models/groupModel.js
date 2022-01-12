const dbConn = require('../dbConnection')
const md5 = require('md5')

var Group = function(group) {
    this.groupid = md5(group.groupid)
    this.name = group.name
    this.serialnumber = group.serialnumber
}

// get all Group 
Group.getAllGroup = (result) => {
    dbConn.query('SELECT * FROM groupprofile', (err, res) => {
      if (err) {
        result(null, err)
      } else {
        result(null, res)
      }
    })
} 

// get Group by ID
Group.getAllGroupByID = (id, result) => {
    dbConn.query('SELECT * FROM groupprofile WHERE id=?', id, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// create new Group
Group.createNewGroup = (data, result) => {
    dbConn.query('INSERT INTO groupprofile SET ? ', data, (err, res) => {
        if (err) {
            result(null, err)
        } else {
            result(null, res)
        }
    })
}

// update Group
Group.updateGroup = (id, data, result) => {
    dbConn.query("UPDATE groupprofile SET firstname=?,trainer=?,serial=?,client=? WHERE id = ?", [
        data.firstname,
        data.trainer,
        data.client,
        data.serial,
        id
        ], (err, res)=>{
        if(err){
            console.log('Error while updating the Group');
            result(null, err);
        }else{
            console.log("Group updated successfully");
            result(null, res);
        }
    });
}

// Delete Group
Group.deleteGroup = (id, result)=>{
    dbConn.query("DELETE FROM groupprofile WHERE id = ?", id, (err, res)=>{
        if(err){
            console.log('Error while deleting the Group');
            result(null, err);
        }else{
            console.log("Group deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Group