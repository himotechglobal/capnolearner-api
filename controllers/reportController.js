const ConfiguredReport = require('../models/configuredReportModel')
const MultiReportSignal = require('../models/multiReportSignalModel')
const ConfiguredReportGraphs = require('../models/configuredReportGraphs')
const SavedReportGraphs = require('../models/savedReportGraphs')
const SingledReportPdf = require('../models/singledReportPdf')
const SavedSingleReport = require('../models/savedSingleReport')
const SavedMultipleReport = require('../models/savedMultipleReport')


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

exports.getSingleReport = (req, res) => {
 
    SavedSingleReport.getAllReport(req.query,(err, reports) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                reports
            })
        })
    
    
}
exports.getMultileReport = (req, res) => {
 
    SavedMultipleReport.getAllReport(req.query,(err, reports) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                reports
            })
        })
    
   
}

exports.getSingleReportPdf = (req, res) => {
 
    SingledReportPdf.getAllPdf(req.query,(err, pdfs) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                pdfs
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


 