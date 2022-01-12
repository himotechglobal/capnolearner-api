const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();

exports.session = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [rows] = await conn.execute('INSERT INTO `sessions`(`session`) VALUES(?)',[
            req.body.session,
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "Session Created Successfully",
            });
        }
        
    }catch(err){
        next(err);
    }
}

exports.getSession = async(req, res, next) => {
    
    try{

        const [row] = await conn.execute(
            "SELECT `id`,`session` FROM `sessions`"
        );

        if(row.length > 0){
            return res.json({
                session:row
            });
        }

        res.json({
            message:"No Session Found"
        });
        
    }catch(err){
        next(err);
    }

}