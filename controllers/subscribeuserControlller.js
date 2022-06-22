
const dbConn = require('../dbConnection')

exports.allAccounts = (req, resp) => {

    dbConn.query('SELECT * FROM capno_users WHERE status = 1', (err, result) => {
        if (err)
            throw new Error(err)
        return resp.status(200).json({
            success: true,
            data:result
        })

    })
}


exports.subscribedAccounts = (req, resp) => {

    const seconds = new Date().getTime()/1e3;

    dbConn.query('SELECT * FROM capno_users WHERE expire_account > ? and status = 1 ',[seconds], (err, result) => {
        if (err)
            throw new Error(err)
        return resp.status(200).json({
            success: true,
            result
        })

    })
}

exports.subscriberUserList = (req, resp) => {

    const seconds = new Date().getTime()/1e3;

    dbConn.query('SELECT * FROM capno_users WHERE expire_account < ? and status = 1',[seconds], (err, result) => {
        if (err)
            throw new Error(err)
        return resp.status(200).json({
            success: true,
            result
        })

    })
}

exports.updateExpirydate = (req, resp)=>{
    dbConn.query("UPDATE capno_users SET expire_account = ? WHERE id = ? ", [req.body.expire_account, req.params.id], (error, result) => {
        if (error) throw error;
        if (result) {
            resp.status(200).json({
                success: true,
                message: 'Expiry account changed successfully'
            })
        }
    });

}



exports.getExpireDate7days = (req, resp)=>{

   
     const seconds = new Date().getTime()/1e3;
     console.log(seconds)
     const sevendays = seconds + 7*86400;
     console.log(sevendays)
     

     dbConn.query('SELECT * FROM capno_users WHERE expire_account >= ? and expire_account <= ? and status = 1',[seconds,sevendays], (err, result) => {
        if (err)
            throw new Error(err)
        return resp.status(200).json({
            success: true,
            result
        })

    })

    
}
exports.getExpireDate30days = (req, resp)=>{

   
    const seconds = new Date().getTime()/1e3;
    const Thirtydays = seconds + 30*86400;
    console.log(Thirtydays)

    dbConn.query('SELECT * FROM capno_users WHERE expire_account >= ? and expire_account <= ? and status = 1',[seconds,Thirtydays], (err, result) => {
       if (err)
           throw new Error(err)
       return resp.status(200).json({
           success: true,
           result
       })

   })

   
}
