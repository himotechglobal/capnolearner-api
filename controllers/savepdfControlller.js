
const dbConn = require('../dbConnection')
const md5 = require('md5');


// exports.getpdf = (req, resp) => {
 


//     dbConn.query('SELECT session_data_report_pdf.data,session_data_report_pdf.session_id,client_session.cid,capno_users.firstname,capno_users.lastname FROM session_data_report_pdf LEFT JOIN client_session ON session_data_report_pdf.session_id = client_session.id LEFT JOIN capno_users ON capno_users.md5(?) = client_session.cid WHERE session_id = ?', [req.params.session_id], (err, result) => {
//         if (err) {
//             resp.status(500).json({
//                 success: false,
//                 message: 'Somothing went wrong'
//             })
//         }
//         if(result.length > 0){
//             resp.status(200).json({
//                 success: true,
//                 result: result,
                
                
//             })
//         }
       


//     })
// }

exports.getpdf = (req, resp) => {
 

console.log(req.params.id)
    dbConn.query('SELECT * FROM session_data_report_pdf WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        console.log(result[0].session_id)
        if (result[0].session_id) {
           
            dbConn.query('SELECT * FROM client_session WHERE id = ?', [result[0].session_id], (err, resultCid)=>{
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                console.log(resultCid[0].cid)
                if(resultCid[0].cid){
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult)=>{
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Somothing went wrong'
                            })
                        }
                        if(getclientResult[0].associated_owner){
                            dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [getclientResult[0].associated_owner], (err, finalResult)=>{

                                if (err) {
                                    resp.status(500).json({
                                        success: false,
                                        message: 'Somothing went wrong'
                                    })
                                }
                                if(finalResult.length > 0){
                                    resp.status(200).json({
                                        success: true,
                                        data: finalResult,
                                        result: result[0].data,
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


exports.getNotepdf = (req, resp) => {
 

    console.log(req.params.id)
        dbConn.query('SELECT * FROM client_session_report WHERE id = ?', [req.params.id], (err, result) => {
            if (err) {
                resp.status(500).json({
                    success: false,
                    message: 'Somothing went wrong'
                })
            }
            console.log(result[0].session_id)
            if (result[0].session_id) {
               
                dbConn.query('SELECT * FROM client_session WHERE id = ?', [result[0].session_id], (err, resultCid)=>{
                    if (err) {
                        resp.status(500).json({
                            success: false,
                            message: 'Somothing went wrong'
                        })
                    }
                    console.log(resultCid[0].cid)
                    if(resultCid[0].cid){
                        dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult)=>{
                            if (err) {
                                resp.status(500).json({
                                    success: false,
                                    message: 'Somothing went wrong'
                                })
                            }
                            if(getclientResult[0].associated_owner){
                                dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [getclientResult[0].associated_owner], (err, finalResult)=>{
    
                                    if (err) {
                                        resp.status(500).json({
                                            success: false,
                                            message: 'Somothing went wrong'
                                        })
                                    }
                                    if(finalResult.length > 0){
                                        resp.status(200).json({
                                            success: true,
                                            data: finalResult,
                                            result: result[0].notes,
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