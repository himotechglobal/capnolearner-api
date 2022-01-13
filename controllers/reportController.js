const ConfiguredReport = require('../models/configuredReportModel')
const MultiReportSignal = require('../models/multiReportSignalModel')
const ConfiguredReportGraphs = require('../models/configuredReportGraphs')
const SavedReportGraphs = require('../models/savedReportGraphs')


// get all Session list
exports.getConfigList = (req, res) => {
 
    ConfiguredReport.getAllConfiguredReports(req.query,(err, sessions) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                sessions
            })
        })
    
   
}


exports.getReportConfig = (req, res) => {
 
    ConfiguredReportGraphs.getAllGraph(req.query,(err, graphs) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                graphs
            })
        })
    
   
}

exports.getSavedReportConfig = (req, res) => {
 
    SavedReportGraphs.getAllGraph(req.query,(err, graphs) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                graphs
            })
        })
    
   
}



// get all Signal list
exports.getMultiReportSignalList = (req, res) => {
 
    MultiReportSignal.getMultiReportSignalList(req.query,(err, signals) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                signals
            })
        })
    
   
}


 