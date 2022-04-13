const Owner = require('../models/editAdminProfileModel')
const dbConn = require('../dbConnection')
const sendEmail = require('./emailController')

// get all Admin list
exports.getOwnerProfile = (req, res) => {
    Owner.getOwnerById(req.params , (err, owner) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            owner
        })
    })
}
exports.getEmailbyDomain = (req, res)=>{
    let _email = "%@"+req.params.domain+"%" ; 
    dbConn.query('select * from `capno_users` where email  LIKE ?', [_email] , (err, result) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'DB error',
            })
        } else {
            if(result.length == 0 ){
                res.status(200).json({
                    success: false,
                    message: 'No Email Found',
                })
            }
            else{
                res.status(200).json({
                    success: true,
                    data: result,
                })
            }
        }
    })



}




exports.getExpiredAccount = (req, res)=>{

    // console.log(req.body);
     
    let now = new Date().getTime() / 1e3 ; 

    var sql = "select * from capno_users where expire_account < ?";
        dbConn.query(sql,[now], (err, result) => {
            if (err) {
                res.status(200).json({
                    success: false,
                    message: err
                })
            } else {
                if(result.length > 0 ){
                    result.map((v,i) => {
                        dbConn.query("select * from subscriptionEmails where email = ?",[v.email], async (err, result) => {
                            if (err) {
                                res.status(200).json({
                                    success: false,
                                    message: err
                                })
                            } else {
                                let _date = new Date(v.expire_account*1e3) ; 
                                _date = _date.toLocaleDateString() ;
                                

                                if(result.length > 0 ){
                                    let _body = 'Dear Customer: <br /><br />The subaccount for '+v.firstname+' '+v.lastname+' with the user name '+v.email+' expires on '+_date+'.<br /><br />Please click here to <a href="https://capno-web.herokuapp.com/subscription/renew/'+v.id+'">renew your subscription.</a><br /><br />Thank you.<br /><br />Accounting<br /><b>BETTER PHYSIOLOGY, LTD.</b><br />109 East 17th Street<br />Cheyenne, WY 82001<br />tech@betterphysiology.com.';
                                await  sendEmail("yasirkhancse@gmail.com","Renew Subscription for Capnotrainer" , "Renew Subscription for Capnotrainer" , _body);

                                //   sendEmail(result[0].primaryEmail,"Renew Subscription for Capnotrainer" , "Renew Subscription for Capnotrainer" , _body);
                                }
                                else{
                                    let _body = 'Dear Customer: <br /><br />Your CapnoLearning software subscription will be expiring on '+_date+'.<br /><br />The user name we have on record is '+v.email+'.<br /><br />The annual subscription fee for the first instrument is $175.00 and $60.00 for each additional instrument.<br /><br />Please click here to <a href="https://capno-web.herokuapp.com/subscription/renew/'+v.id+'">renew your subscription.</a><br /><br />If you are the administrator of an ORGANIZATIONAL SUBSCRIPTION ACCOUNT, click on the above link to renew the primary subscription for $175.00.  You will be sent separate PayPal payment requests for subaccount subscriptions 30 days before their due date.<br /><br />Thank you.<br /><br />Accounting<br /><b>BETTER PHYSIOLOGY, LTD.</b><br />109 East 17th Street<br />Cheyenne, WY 82001<br />tech@betterphysiology.com.';
                                await  sendEmail("yasirkhancse@gmail.com","Renew Subscription for Capnotrainer" , "Renew Subscription for Capnotrainer" , _body);

                                }


                            }
                        })
                    })
                }
                res.status(200).json({
                    success: true,
                    count: result.length,
                    data: result
                })
            }
        })
}

exports.getEmailForSubscription = (req, res)=>{

    console.log(req.body);
     

    var sql = "select s.* , c.business from subscriptionEmails as s LEFT JOIN capno_users as c on c.email = s.primaryEmail ";
        dbConn.query(sql, (err, result) => {
            if (err) {
                res.status(200).json({
                    success: false,
                    message: err
                })
            } else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
}
exports.saveEmailForSubscription = (req, res)=>{

    console.log(req.body);
     

    var sql = "INSERT INTO subscriptionEmails (email, price, primaryEmail, type) VALUES (?)";
        dbConn.query(sql, [req.body], (err, result) => {
            if (err) {
                res.status(200).json({
                    success: false,
                    message: err
                })
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Email Inserted Successfully'
                })
            }
        })
}
// update Admin Profile
exports.renewOwnerProfile = (req, res)=>{
    const data =  req.body;
    console.log(data);
    dbConn.query('INSERT INTO `capno_billing`(`user_id`, `details`) VALUES (?,?)', [req.body.id,req.body.details] , (err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'DB error',
                })
            } else {
                // console.log(result)
               if(result.insertId ){
                   let _renewTime = 86400*364 ; 
                dbConn.query('update `capno_users` set `expire_account` = expire_account + ? where id = ?', [_renewTime,req.body.id] , (err, result) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: 'DB error',
                        })
                    } else { 
                        res.status(200).json({
                            success: true,
                            message: 'Billing updated',
                        })
                    }
                })
               }
               else{
                res.status(400).json({
                    success: false,
                    message: 'Billing updated but not inserted',
                })
                 }
}
        })
     
}


// update Admin Profile
exports.updateOwner = (req, res)=>{
    const data =  req.body;
    // console.log('data update', data);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            success: false, 
            message: 'Please fill all fields'
        });
    }else{
        dbConn.query('SELECT * FROM capno_users WHERE email = ? and id != ? ', [req.body.email,req.params.id] , (err, result) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'DB error',
                })
            } else {
               if(result.length > 0){
                res.status(400).json({
                    success: false,
                    message: 'Account already exist with this email',
                })
               }
               else{
        Owner.ownerUpdate(req.params.id, data, (err, owner)=>{
            if(err){
                res.status(200).send({
                    success: false, 
                    message: 'Admin Profile Update Failed'
                });
            }
            else{
                res.status(200).send({
                    success: true, 
                    message: 'Admin Profile Updated Successfully',

                });
            }
            
        })
    }
}
        })
    }
}


// get all Admin list
exports.getOwnerProfile = (req, res) => {
    Owner.getOwnerById(req.params , (err, owner) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            success: true,
            owner
        })
    })
}

 
// get all Admin list
exports.updateSubscriptionsDetails = (req, res) => {
    Owner.updateSubscriptionsDetails(req.params.id , req.body, (err, owner) => {
        if(err){
            throw new Error(err)
        }
        else{
            return res.status(200).json({ 
                success: true,
                message : "Subscription Updated Successfully"
            })
        }

    })
}

 