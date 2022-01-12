const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const bodyParser=require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended: true})); 

app.use(cors());

  
// Parses the text as json
app.use(bodyParser.json()); 

app.use(express.json());

app.use('/api' ,routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(process.env.PORT || 5000,() => console.log('Server Running on 5000 or '+process.env.PORT));