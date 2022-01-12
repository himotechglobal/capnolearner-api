const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();

exports.login = async (req,res,next) =>{
    const errors = validationResult(req);
    console.log(req)
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `capno_users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }
        else{
            
        const [rowResult] = await conn.execute(
            "SELECT * FROM `capno_users` WHERE `email`=? and BINARY `password` = ? and `status` = 1",
            [req.body.email,req.body.password]
          );
          if (rowResult.length === 0) {
            return res.status(422).json({
                message: "Invalid Login Credentials",
            });
        }
        else{
            const token = jwt.sign(
                { user_id: rowResult[0].id, email: rowResult[0].email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );

              
            return res.json({
                status: true,
                user_id: rowResult[0].id,
                accessToken: token
            });
        }
         

        }

        // const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        // if(!passMatch){
        //     return res.status(422).json({
        //         message: "Incorrect password",
        //     });
        // }

        // const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

      

    }
    catch(err){
        next(err);
    }
}