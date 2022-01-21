const ConfiguredReport = require('../models/configuredReportModel')
const MultiReportSignal = require('../models/multiReportSignalModel')
const ConfiguredReportGraphs = require('../models/configuredReportGraphs')
const SavedReportGraphs = require('../models/savedReportGraphs')
const SingledReportPdf = require('../models/singledReportPdf')
const SavedSingleReport = require('../models/savedSingleReport')
const SavedMultipleReport = require('../models/savedMultipleReport')
const MultiReportPdf = require('../models/multiReportPdf')


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

exports.getAllNotes = (req, res) => {
 
    SavedSingleReport.getAllNotes(req.query,(err, notes) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                notes
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


exports.getMultileReportPdf = (req, res) => {
 
    MultiReportPdf.getAllPdf(req.query,(err, pdfs) => {
            if(err)
            throw new Error(err)
            return res.status(200).json({ 
                status: true,
                pdfs
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


 