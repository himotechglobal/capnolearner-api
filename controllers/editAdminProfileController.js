const Owner = require('../models/editAdminProfileModel')

// get all Admin list
exports.getOwnerList = (req, res) => {
    Owner.getAllOwner((err, owners) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            owners
        })
    })
}

// update Admin Profile
exports.updateOwner = (req, res)=>{
    const data = new Owner(req.body);
    console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        Owner.ownerUpdate(req.params.id, data, (err, owner)=>{
            if(err)
            res.send(err);
            res.json({
                status: true,
                message: 'Admin Profile Updated Successfully',
            })
        })
    }
}


