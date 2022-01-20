const BlankForms = require('../models/blankFormModel')
const ClientForms = require('../models/clientFormModel')
const TrainerForms = require('../models/trainerFormModel')
const jsftp = require("jsftp");
const fs = require("fs");
require('dotenv').config()
const busboy = require('connect-busboy');
const dbConn = require('../dbConnection')
const md5 = require('md5')
const formidable = require('formidable');
 
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
         ClientForms.getAllForms(req.query,(err, forms) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                forms
            })
        })
    
    
   
}


// get all client form
exports.getTrainerForm = (req, res) => {
    
        TrainerForms.getAllForms(req.query,(err, forms) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                forms
            })
        })
    
    
   
}


 
exports.uploadForm = (req, res) => {
 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function (err, fields, files) {
   
        var oldpath = files.form.filepath;
        var fileName = files.form.originalFilename
        let _name = Math.floor(Math.random() * 100).toString() +  new Date().getTime().toString() + fileName.replace(/\s+/g, "-") ; 
        let _remote = "/client_forms/"+ _name; 
         fs.readFile(oldpath, function(err, buffer) {
        if(err) {
            console.error(err);
          
        }
        else {
            Ftp.put(buffer, _remote, err => {
               
                    if(err){
                        throw new Error(err)
                    }
                    else{
               dbConn.query('INSERT INTO `client_form`( `cl_id`, `form_name`, `form`, `status`) VALUES (?,?,?,1) ',[md5(fields.client_id),fields.form_id,_name], (err, result) => {
                            if (err) {
                                return res.status(200).json({ 
                                    status: false,
                                    message : "not uploaded"
                                })
                            } else {
                                return res.status(200).json({ 
                                    status: true,
                                    message : "uploaded"
                                })
                            }
                          })
                    }
            });
       }
    });
});
    

}