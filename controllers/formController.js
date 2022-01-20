const BlankForms = require('../models/blankFormModel')
const ClientForms = require('../models/clientFormModel')


// get all blank form
exports.getAllForm = (req, res) => {
 
    BlankForms.getAllForms(req.query,(err, forms) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                forms
            })
        })
    
   
}

// get all client form
exports.getClientForm = (req, res) => {
 
    ClientForms.getAllForms(req.query,(err, forms) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                forms
            })
        })
    
   
}

  