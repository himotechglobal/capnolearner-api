const HardwareProfile = require('../models/hardwareProfileModel')

// get all hardware Profile list
exports.getHardwareProfileList = (req, res) => {
    HardwareProfile.getAllHardwareProfile((err, hardwareprofiles) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            hardwareprofiles
        })
    })
}

// update Hardware Profile
exports.updateHardwareProfile = (req, res)=>{
    const data = new HardwareProfile(req.body);
    console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        HardwareProfile.updateHardwareProfile(req.params.id, data, (err, hardwareprofile)=>{
            if(err)
            res.send(err);
            res.json({
                status: true,
                message: 'Hardware Profile updated Successfully',
            })
        })
    }
}
