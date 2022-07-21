
const dbConn = require('../dbConnection')
const { jsPDF } = require("jspdf");
const md5 = require('md5');
const fs = require('fs');


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

            dbConn.query('SELECT * FROM client_session WHERE id = ?', [result[0].session_id], (err, resultCid) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                console.log(resultCid[0].cid)
                if (resultCid[0].cid) {
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult) => {
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Somothing went wrong'
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
                                        result: result[0].data,
                                        pdfname: result[0].pdf_name,
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


exports.getNotepdf = (req, resp) => {


    console.log(req.params.id)
    dbConn.query('SELECT * FROM client_session_report WHERE session_id = ?', [req.params.id], (err, result) => {
        if (err) {
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        console.log(result[0].session_id)
        if (result[0].session_id) {

            dbConn.query('SELECT * FROM client_session WHERE id = ?', [result[0].session_id], (err, resultCid) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                console.log(resultCid[0].cid)
                if (resultCid[0].cid) {
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult) => {
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Somothing went wrong'
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
                                        result: result[0].notes,
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





exports.livesessionImage = (req, resp) => {
    console.log(req.params.sessionid)
    dbConn.query('SELECT * FROM capno_data WHERE sessionid = md5(?) and data_type = ?', [req.params.sessionid, req.params.data_type], (err, result) => {
        if (err) {
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        // console.log(result[0].sessionid)
        if (result[0]) {
            dbConn.query('SELECT * FROM client_session WHERE md5(id) = ?', [result[0].sessionid], (err, resultCid) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                console.log(resultCid[0].cid)
                if (resultCid[0].cid) {
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult) => {
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Somothing went wrong'
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
                                        result: result[0].sessiondata,
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
        else{
            resp.status(202).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
    })
}


exports.livesessionImagedownload = (req, resp) => {

    sessionDate = [];
    sessionImage = [];
    clientName = [];
    trainerName = [];
  

    console.log(req.params.sessionid)
    dbConn.query('SELECT * FROM capno_data WHERE sessionid = md5(?) and data_type = ?', [req.params.sessionid, req.params.data_type], (err, result) => {
        if (err) {
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        // console.log(result[0].sessionid)
        if (result[0]) {
            sessionImage.push(result[0].sessiondata);
            dbConn.query('SELECT * FROM client_session WHERE md5(id) = ?', [result[0].sessionid], (err, resultCid) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                
                if (resultCid[0]) {
                    sessionDate.push(resultCid[0].name)
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult) => {
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Somothing went wrong'
                            })
                        }
                        if (getclientResult[0].associated_practioner) {

                            clientName.push(getclientResult[0].firstname + " " + getclientResult[0].lastname)
                            
                        
                            dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [getclientResult[0].associated_practioner], (err, finalResult) => {

                                if (err) {
                                    resp.status(500).json({
                                        success: false,
                                        message: 'Somothing went wrong'
                                    })
                                }
                                if (finalResult.length > 0) {
                                    

                                    trainerName.push(finalResult[0].firstname + " " + finalResult[0].lastname)

                                    // resp.status(200).json({
                                    //     success: true,
                                    //     data: finalResult,
                                    //     result: result[0].sessiondata,
                                    //     sessionDate: resultCid[0].name,
                                    //     firstname: getclientResult[0].firstname,
                                    //     lastname: getclientResult[0].lastname,

                                    // })
                                }
                            })
                        }
                    })
                }


            })
        }
        else{
            resp.status(202).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
    })


    setTimeout( () => {

        let stringsessionDate = sessionDate.toString();
        let stringsessionImage = sessionImage.toString();
        let stringclientName = clientName.toString();
        let stringtrainerName = trainerName.toString();

        const doc = new jsPDF();

        doc.setTextColor(0, 0, 0);
        doc.text('Capnolearning Report', 10, 10,
            {styles:{ fontSize: 20,fontWeight: 'bold'}})
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 15, 600, 15);
        doc.setFontSize(10)
        
        doc.text(stringsessionDate ,35,25)
        doc.text(stringclientName,23,30);
        doc.text(stringtrainerName,25,35);
        doc.setFont(undefined, 'bold');
        doc.text("Session Date:" ,10,25)
        doc.text("Client:" ,10,30);
        doc.text("Trainer:",10,35);
        // doc.setFont(undefined, 'bold')
        console.log(sessionImage.length)
        var sessionImagerequiredPages = sessionImage.length;
        for (var i = 0; i < sessionImagerequiredPages; i++) {
        doc.addImage(stringsessionImage, 5, 45,200,110);
        }
        const data = doc.save()

        const datas =fs.readFileSync('./generated.pdf');
           resp.contentType("application/pdf");
           resp.send(datas);
    

        // let _resp = {
        //     success: true,
        //     data: data
           
        // }

        // return resp.status(200).json(_resp)

    },5000)
}


exports.livesessionNotes = (req, resp) => {
    console.log(req.params.sessionid)
    dbConn.query('SELECT * FROM capno_data WHERE sessionid = md5(?) and data_type = ?', [req.params.sessionid, req.params.data_type], (err, result) => {
        if (err) {
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        console.log(result[0].sessionid)
        if (result[0].sessionid) {
            dbConn.query('SELECT * FROM client_session WHERE md5(id) = ?', [result[0].sessionid], (err, resultCid) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                console.log(resultCid[0].cid)
                if (resultCid[0].cid) {
                    dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [resultCid[0].cid], (err, getclientResult) =>   {
                        if (err) {
                            resp.status(500).json({
                                success: false,
                                message: 'Somothing went wrong'
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
                                        result: result[0].sessiondata,
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





exports.getPrevScreenshot = (req, resp) => {
    dbConn.query('SELECT * FROM client_session WHERE id < ? and cid = md5(?) order by id  desc limit 0,1 ', [req.params.id,req.params.cid], (err, result) => {

        if(err){
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }

        if (result[0]) {
            console.log(result[0].id)
            dbConn.query('SELECT * FROM session_data_report_pdf WHERE session_id = ?', [result[0].id], (err, getPdfResult) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
                    })
                }
                 
                else{
                    resp.status(200).json({
                        success: true,
                        data: getPdfResult
                    })
                }
            })
        }
        else{ 
            resp.status(202).json({
                success: false,
                message: 'not found'
            })
        }

    })
}


exports.getScreenshot = (req, resp) => {
    dbConn.query('SELECT * FROM client_session WHERE id = ?', [req.params.id], (err, result) => {

        if(err){
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        if (result[0].cid) {
            dbConn.query('SELECT * FROM capno_users WHERE md5(id) = ?', [result[0].cid], (err, getclientResult) => {
                if (err) {
                    resp.status(500).json({
                        success: false,
                        message: 'Somothing went wrong'
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
                                sessionDate: result[0].name,
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


// savescreenshort
exports.savescreenshort = (req, resp) => {
    let dataAray = {
        data: req.body.data,
        session_id: req.body.session_id,
        pdf_name: req.body.pdf_name,
        type: req.body.type,
        status: req.body.status,
       
    }
    console.log(dataAray)
    dbConn.query("INSERT INTO session_data_report_pdf SET? ",dataAray, (error, result) => {
        if(error){
            resp.status(500).json({
                success: false,
                message: 'Somothing went wrong'
            })
        }
        else{
           
            resp.status(200).json({
                success: true,
                message: 'screenshort Inserted Successfully',
              
               
            })
        }


})
    
}