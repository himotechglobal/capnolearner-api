const Client = require('../models/ClientModel')


// get all Client list
exports.getClientList = (req, res) => {
    Client.getAllClient((err, clients) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            clients
        })
    })
}

// get all Client list
exports.getInctiveClientList = (req, res) => {
    Client.getAllInactiveClient((err, clients) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            clients
        })
    })
}

// get Client by id
exports.getClientByID = (req,res) => {
    Client.getAllClientByID(req.params.id, (err, client) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            client
        })
    })
}

// create new Client
exports.createNewClient = (req, res) => {
    // console.log(req.body)
    const data = new Client(req.body)

    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            message: 'Please fill all fields'
        })
    } else {
        Client.createNewClient(data, (err, Client) => {
            if(err) {
                res.send(err)
                res.json({
                    success: false,
                    message: "Somothing went wrong",
                    data: Client
                })
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Client Inserted Successfully',
                    data
                })
            }
        })
    }
}

// update Client
exports.updateClient = (req, res)=>{
    const data = new Client(req.body);
    console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        Client.updateClient(req.params.id, data, (err, Client)=>{
            if(err)
            res.send(err);
            res.json({
                status: true,
                message: 'Client updated Successfully',
            })
        })
    }
}

// delete Client
exports.deleteClient = (req, res)=>{
    Client.deleteClient(req.params.id, (err, client)=>{
        if(err)
        res.send(err);
        res.json({success:true,
             message: 'Client deleted successully!'
        });
    })
}

