const dbConn = require('../dbConnection')
const md5 = require('md5');

exports.assemblylist = (req, resp) => {
    dbConn.query('SELECT * FROM assembly_report', (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result.length > 0) {
            resp.status(200).json({
                success: true,
                data: result
            })
        }
    })
}

exports.getAssemblylistbyid = (req, resp) => {
    dbConn.query('SELECT * FROM assembly_report WHERE id =?', [req.params.id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result.length > 0) {
            resp.status(200).json({
                success: true,
                data: result
            })
        }
    })
}

exports.assemblypdfreports = (req, resp) => {
    console.log(req.params.session_id)
    dbConn.query('SELECT * FROM session_data_report_pdf WHERE session_id = ?', [req.params.session_id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result.length > 0) {
            resp.status(200).json({
                success: true,
                data: result
            })
        }
    })
}




exports.getclientformName = (req, resp) => {

    dbConn.query('SELECT client_form.form_name,client_form.cl_id,blank_forms.forms,blank_forms.id FROM client_form LEFT JOIN blank_forms ON client_form.form_name = blank_forms.id WHERE cl_id = md5(?)', [req.params.cl_id], (error, result) => {

        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result.length > 0) {
            resp.status(200).json({
                success: true,
                data: result
            })
        }

    })

}

exports.getpractionerformname = (req, resp) => {

    dbConn.query('SELECT practioner_form.form_name,practioner_form.clientid,blank_forms.forms,blank_forms.id FROM practioner_form LEFT JOIN blank_forms ON practioner_form.form_name = blank_forms.id WHERE clientid = ?', [req.params.clientid], (error, result) => {

        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result.length > 0) {
            resp.status(200).json({
                success: true,
                data: result
            })
        }

    })

}



exports.saveAssemblyreport = (req, resp) => {

    var session = req.body.session;
    var lnotes = req.body.lnotes;
    var limages = req.body.limages;
    var rnotes = req.body.rnotes;
    var cforms = req.body.cforms;
    var reportids = req.body.reportids;
    let reportidsval = reportids.join();
    var forms = req.body.forms;
    let formsval = forms.join();
    console.log(forms)

    var assemblydata = "INSERT INTO assembly_report (session,lnotes,limages,rnotes,cforms,reportids,forms) VALUES ?";

    var values = [
        [session, lnotes, limages, rnotes, cforms, reportidsval, formsval]
    ]


    dbConn.query(assemblydata, [values], function (error, result) {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        else {

            resp.status(200).json({
                success: true,
                message: 'Data save successfully',
                id: result.insertId,

            })
        }


    })

}

exports.updateAssemblyreport = (req, resp)=>{

            var pdfrport = req.body.report_desc;
            let pdfrportjson = JSON.stringify(pdfrport)
            var livesessiionimg = req.body.session_image_desc;
            let livesessiionimgjson = JSON.stringify(livesessiionimg)

            const data = [req.body.name,req.body.summary,pdfrportjson,livesessiionimgjson,req.params.id];

            console.log(req.body.name)
            console.log(req.body.summary)
            console.log(req.body.report_desc)
            console.log(req.body.session_image_desc)
            dbConn.query('UPDATE assembly_report SET name =?,summary = ?,report_desc =?,session_image_desc =? WHERE id = ?', data, (err, result) => {
                if (err) {
                    
                    resp.status(500).json({
                        success: false,
                        message: 'DB error',
                        error: err
                    })
                } else {
                    resp.status(200).json({
                        success: true,
                        message: 'Updated Successfully',

                    })
                }
            })

        }
   

exports.getassemblySetionReport = (req, resp) => {

    dbConn.query('SELECT * FROM assembly_report WHERE id =?', [req.params.id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        
        console.log(result[0].reportids)
        if (result[0].reportids) {
            dbConn.query('SELECT * FROM session_data_report_pdf WHERE FIND_IN_SET (id, ?)', [result[0].reportids], (error, finalResult) => {
                if (error) {
                    resp.status(500).json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
                if(finalResult.length > 0){
                    resp.status(200).json({
                        success: true,
                        data: finalResult,
                       
                    })
                }
            })
        }
    })
}

exports.getassemblyReportsesseionNotes = (req, resp) => {

    dbConn.query('SELECT assembly_report.rnotes,assembly_report.id,client_session_report.notes FROM assembly_report LEFT JOIN client_session_report ON assembly_report.session = client_session_report.session_id WHERE assembly_report.id = ? and rnotes = 1 ', [req.params.id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result.length > 0) {
            resp.status(200).json({
                success: true,
                data: result
            })
        }
    })
}

// exports.getassemblyliveimages = (req, resp) =>{

// console.log(req.params.id)
// console.log(req.params.sessionid)

//     dbConn.query('SELECT assembly_report.limages,assembly_report.id,capno_data.sessiondata FROM assembly_report LEFT JOIN capno_data ON assembly_report.session = capno_data.sessionid WHERE assembly_report.id = ? and sessionid = md5(?) and limages = 1 and data_type = 3', [req.params.id,req.params.sessionid], (error, result) => {
//         if (error) {
//             resp.status(500).json({
//                 success: false,
//                 message: 'Something went wrong'
//             })
//         }
//         if(result.length > 0){
//             resp.status(200).json({
//                 success: true,
//                 data: result
//             })
//         }
//     })
// }

exports.getassemblyliveimages = (req, resp) => {


    console.log(req.params.id)
    dbConn.query('SELECT * FROM assembly_report WHERE id = ? and limages = 1', [req.params.id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        console.log(result[0].session)
        if (result[0].session) {
            dbConn.query('SELECT * FROM capno_data WHERE sessionid = md5(?) and data_type = 3', [result[0].session], (error, finalResult) => {
                if (error) {
                    resp.status(500).json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
                if (finalResult.length > 0) {
                    resp.status(200).json({
                        success: true,
                        data: finalResult
                    })
                }
            })
        }
    })
}

exports.getassemblyliveNotes = (req, resp) => {

    dbConn.query('SELECT * FROM assembly_report WHERE id = ? and lnotes = 1', [req.params.id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        if (result[0].session) {
            dbConn.query('SELECT * FROM capno_data WHERE sessionid = md5(?) and data_type = 4', [result[0].session], (error, finalResult) => {
                if (error) {
                    resp.status(500).json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
                if (finalResult.length > 0) {
                    resp.status(200).json({
                        success: true,
                        data: finalResult
                    })
                }
            })
        }
    })
}

exports.getNmaes = (req, resp) => {


    console.log(req.params.id)
    dbConn.query('SELECT * FROM assembly_report WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        console.log(result[0].session)
        if (result[0].session) {

            dbConn.query('SELECT * FROM client_session WHERE id = ?', [result[0].session], (err, resultCid) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
                console.log(resultCid[0].cid)
                if (resultCid[0].cid) {
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult) => {
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Something went wrong'
                            })
                        }
                        if (getclientResult[0].associated_practioner) {
                            dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [getclientResult[0].associated_practioner], (err, finalResult) => {

                                if (err) {
                                    resp.status(500).json({
                                        success: false,
                                        message: 'Somothing went wrong'
                                    })
                                }
                                if (finalResult.length > 0) {
                                    resp.status(200).json({
                                        success: true,
                                        data: finalResult,
                                        sessionDate: resultCid[0].name,
                                        firstname: getclientResult[0].firstname,
                                        lastname: getclientResult[0].lastname,

                                    })
                                }
                            })
                        }
                    })
                }


            })
        }


    })
}


// exports.getCompleteforms = (req, resp) => {

//     dbConn.query('SELECT * FROM assembly_report WHERE id =?', [req.params.id], (error, result) => {
//         if (error) {
//             resp.status(500).json({
//                 success: false,
//                 message: 'Something went wrong'
//             })
//         }
//         console.log(result[0].forms)
//         if (result[0].forms) {
//             dbConn.query('SELECT client_form.form_name,client_form.form,blank_forms.forms FROM client_form LEFT JOIN blank_forms ON client_form.form_name = blank_forms.type WHERE FIND_IN_SET (form_name, ?)', [result[0].forms], (error, resultFormName) => {
//                 if (error) {
//                     resp.status(500).json({
//                         success: false,
//                         message: 'Something went wrong'
//                     })
//                 }
              
//                 if(resultFormName.length > 0){
              
                        
//                             resp.status(200).json({
//                                 success: true,
//                                 data: resultFormName,
                                
//                             })
                    
//                 }
//             })
//         }
//     })
// }

exports.getCompleteforms = (req, resp) => {

    dbConn.query('SELECT * FROM assembly_report WHERE id =?', [req.params.id], (error, result) => {
        if (error) {
            resp.status(500).json({
                success: false,
                message: 'Something went wrong'
            })
        }
        console.log(result[0].forms)
        if (result[0].forms) {
            dbConn.query('SELECT client_form.form_name,client_form.form,blank_forms.forms FROM client_form LEFT JOIN blank_forms ON client_form.form_name = blank_forms.id WHERE FIND_IN_SET (client_form.form_name, ?) and client_form.cl_id = md5(?)', [result[0].forms,req.params.cl_id], (error, resultFormName) => {
                if (error) {
                    resp.status(500).json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
              
                if(resultFormName.length > 0){

                            resp.status(200).json({
                                success: true,
                                data: resultFormName,
                                
                            })
                    
                }
            })
        }
    })
}


// exports.saveAssemblyFullscreenshort = (req, resp) => {
//             var report_img = req.body.report_img;
           

//             const data = [req.body.report_img,req.params.id];

//             dbConn.query('UPDATE assembly_report SET report_img =? WHERE id = ?', data, (err, result) => {
//                 if (err) {
                    
//                     resp.status(500).json({
//                         success: false,
//                         message: 'DB error',
//                         error: err
//                     })
//                 } else {
//                     resp.status(200).json({
//                         success: true,
//                         message: 'pdf save Successfully',

//                     })
//                 }
//             })

    
// }

