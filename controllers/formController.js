const BlankForms = require('../models/blankFormModel')
const ClientForms = require('../models/clientFormModel')
const TrainerForms = require('../models/trainerFormModel')
const ClientHomework = require('../models/clientHomeworkModel')
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



exports.getClientHomework = (req, res) => {
 
    
    ClientHomework.getAllHomework(req.query,(err, homeworks) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            status: true,
            homeworks
        })
    })
                 

}

exports.uploadClientHomework = (req, res) => {
 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function (err, fields, files) {
   
        var oldpath = files.form.filepath;
        var fileName = files.form.originalFilename
        let _name = Math.floor(Math.random() * 100).toString() +  new Date().getTime().toString() + fileName.replace(/\s+/g, "-") ; 
        let _remote = "/homework/"+ _name; 
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
               dbConn.query('INSERT INTO `homework`( `cl_id`, `file_name`, `file`, `status` , `sessionid` ) VALUES (?,?,?,1,?) ',[md5(fields.client_id),_name,_name,md5(fields.session_id)], (err, result) => {
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

exports.uploadClientForm = (req, res) => {
 
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

 
exports.uploadTrainerForm = (req, res) => {
 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function (err, fields, files) {
   
        var oldpath = files.form.filepath;
        var fileName = files.form.originalFilename
        let _name = Math.floor(Math.random() * 100).toString() +  new Date().getTime().toString() + fileName.replace(/\s+/g, "-") ; 
        let _remote = "/practioner_forms/"+ _name; 
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
               dbConn.query('INSERT INTO `practioner_form`( `clientid`,`sessid`, `form_name`, `form`, `status`) VALUES (?,?,?,?,1) ',[fields.client_id,fields.session_id,fields.form_id,_name], (err, result) => {
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

exports.deleteClientForm = (req, res)=>{
    ClientForms.deleteClientForm(req.params.id, (err, group)=>{
        if(err)
        res.send(err);
        res.json({success:true,
             message: 'Client Form deleted successully!'
        });
    })
}

exports.deleteTrainerForm = (req, res)=>{
    TrainerForms.deleteTrainerForm(req.params.id, (err, group)=>{
        if(err)
        res.send(err);
        res.json({success:true,
             message: 'Trainer Form deleted successully!'
        });
    })
}

exports.deleteClientHomework = (req, res)=>{
    ClientHomework.deleteClientHomework(req.params.id, (err, group)=>{
        if(err)
        res.send(err);
        res.json({success:true,
             message: 'Client Homework deleted successully!'
        });
    })
}



