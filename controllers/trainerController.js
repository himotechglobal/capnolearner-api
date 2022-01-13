const Trainer = require('../models/trainerModel')


// get all Trainer list
exports.getTrainerList = (req, res) => {
    Trainer.getAllTrainer(req.query,(err,trainers) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            status: true,
            trainers
        })
    })
}
 

// get Trainer by id
exports.getTrainerByID = (req,res) => {
    Trainer.getAllTrainerByID(req.params.id, (err, trainer) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            trainer
        })
    })
}

// create new Trainer
exports.createNewTrainer = (req, res) => {
    // console.log(req.body)
    const data = new Trainer(req.body)

    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            message: 'Please fill all fields'
        })
    } else {
        Trainer.createNewTrainer(data, (err, trainer) => {
            if(err) {
                res.send(err)
                res.json({
                    success: false,
                    message: "Somothing went wrong",
                    data: trainer
                })
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Trainer Inserted Successfully',
                    trainer
                })
            }
        })
    }
}

// update Trainer
exports.updateTrainer = (req, res)=>{
    const data = new Trainer(req.body);
    console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        Trainer.updateTrainer(req.params.id, data, (err, trainer)=>{
            if(err)
            res.send(err);
            res.json({
                status: true,
                message: 'Trainer updated Successfully',
            })
        })
    }
}

// delete Trainer
exports.deleteTrainer = (req, res)=>{
    Trainer.deleteTrainer(req.params.id, (err, trainer)=>{
        if(err)
        res.send(err);
        res.json({success:true,
             message: 'Trainer deleted successully!'
        });
    })
}

