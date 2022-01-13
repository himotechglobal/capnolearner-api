const Session = require('../models/sessionMOdel')
const SessionRecord = require('../models/sessionRecordModel')
const SessionData = require('../models/sessionDataModel')


// get all Session list
exports.getSessionList = (req, res) => {
 
        Session.getAllSession(req.query,(err, sessions) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                sessions
            })
        })
    
   
}

// get all Session Data
exports.getSessionAllData = (req, res) => {
 
    SessionData.getAllData(req.query,(err, sessions) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            status: true,
            sessions
        })
    })


}


// get signal wise Session Data
exports.getSessionSignalData = (req, res) => {
 
    SessionData.getSignalData(req.query,(err, sessions) => {
        if(err)
        throw new Error(err)
        return res.status(200).json({ 
            status: true,
            sessions
        })
    })


}


exports.getRecordList = (req, res) => {
 
    SessionRecord.getAllRecord(req.query,(err, records) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                records
            })
        })
    
   
}
 