const BlankForms = require('../models/blankFormModel')
const ClientForms = require('../models/clientFormModel')
const jsftp = require("jsftp");
const fs = require("fs");
require('dotenv').config()

const Ftp = new jsftp({
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT, // defaults to 21
    user: process.env.FTP_USER, // defaults to "anonymous"
    pass: process.env.FTP_PASS // defaults to "@anonymous"
  });

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
    if(req.query.form_id){
        ClientForms.getAllForms(req.query,(err, forms) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                forms
            })
        })
    }
   else{
    ClientForms.getAllClientForms(req.query,(err, forms) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            status: true,
            forms
        })
    })
   }
    
   
}

 
exports.uploadForm = (req, res) => {

    console.log(req)
    fs.readFile(req.files[0].file.path, function(err, buffer) {
        if(err) {
            console.error(err);
            callback(err);
        }
        else {
            Ftp.put(buffer, '/fileyasirTestCapno.tx', err => {
                console.log('in')
                if (!err){ console.log("File transferred successfully!")}
                else {console.log(err)}
            });
       }
    });

}