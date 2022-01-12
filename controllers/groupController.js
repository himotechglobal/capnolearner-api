const Group = require('../models/groupModel')

// get all Group list
exports.getGroupList = (req, res) => {
    Group.getAllGroup((err, groups) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            groups
        })
    })
}

// get Group by id
exports.getGroupByID = (req,res) => {
    Group.getAllGroupByID(req.params.id, (err, group) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            group
        })
    })
}

// create new Group
exports.createNewGroup = (req, res) => {
    // console.log(req.body)
    const data = new Group(req.body)

    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            message: 'Please fill all fields'
        })
    } else {
        Group.createNewGroup(data, (err, group) => {
            if(err) {
                res.send(err)
                res.json({
                    success: false,
                    message: "Somothing went wrong",
                    data: group
                })
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Group Inserted Successfully'
                })
            }
        })
    }
}

// update Group
exports.updateGroup = (req, res)=>{
    const data = new Group(req.body);
    console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        Group.updateGroup(req.params.id, data, (err, group)=>{
            if(err)
            res.send(err);
            res.json({
                status: true,
                message: 'Group updated Successfully',
            })
        })
    }
}

// delete Group
exports.deleteGroup = (req, res)=>{
    Group.deleteGroup(req.params.id, (err, group)=>{
        if(err)
        res.send(err);
        res.json({success:true,
             message: 'Group deleted successully!'
        });
    })
}

