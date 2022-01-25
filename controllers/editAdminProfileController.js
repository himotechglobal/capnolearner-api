const Owner = require('../models/editAdminProfileModel')
const dbConn = require('../dbConnection')

// get all Admin list
exports.getOwnerProfile = (req, res) => {
    Owner.getOwnerById(req.params , (err, owner) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            owner
        })
    })
}

// update Admin Profile
exports.updateOwner = (req, res)=>{
    const data =  req.body;
    // console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        dbConn.query('SELECT * FROM capno_users WHERE email = ? and id != ? ', [req.body.email,req.params.id] , (err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'DB error',
                })
            } else {
               if(result.length > 0){
                res.status(400).json({
                    success: false,
                    message: 'Account already exist with this email',
                })
               }
               else{
        Owner.ownerUpdate(req.params.id, data, (err, owner)=>{
            if(err){
                res.status(200).send({
                    success: false, 
                    message: 'Admin Profile Update Failed'
                });
            }
            else{
                res.status(200).send({
                    success: true, 
                    message: 'Admin Profile Updated Successfully',

                });
            }
            
        })
    }
}
        })
    }
}


// get all Admin list
exports.getOwnerProfile = (req, res) => {
    Owner.getOwnerById(req.params , (err, owner) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            owner
        })
    })
}


// get all Admin list
exports.updateSubscriptionsDetails = (req, res) => {
    Owner.updateSubscriptionsDetails(req.params.id , req.body, (err, owner) => {
        if(err){
            throw new Error(err)
        }
        else{
            return res.status(200).json({ 
                success: true,
                message : "Subscription Updated Successfully"
            })
        }

    })
}

