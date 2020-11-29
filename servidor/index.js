const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const { config } = require('./config/index'); 
const request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);
///-------------------------PUNTO 6------------------------------------------------

const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static-files')));

app.listen(config.port, function() {
    console.log('listening http://localhost:' + config.port);       
});

///-------------------------PUNTO 6------------------------------------------------

///---------------------------PUNTO 5----------------------------------------------

var HttpStatus = require('http-status-codes'); 



app.post('/', function(req, res) {
    var estado;
    if((estado=validarDatos(req.body.nombre,req.body.apellido,req.body.dni) )== 201){

        request.post('https://reclutamiento-14cf7.firebaseio.com/personas.json',
        { json: {
            "nombre": req.body.nombre || "-------",
            "apellido": req.body.apellido,
            "dni": req.body.dni 
                }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(201);
            }
        });
        
    } else {
    res.status(estado).send('Error');
    }
})

function validarDatos(nom, ap, doc){
    if(doc && ap){
        doc = doc.toString();
        cantDigitos = (doc.match(/\d/g) | []).length
        ap = ap.toLowerCase();
        if ((doc.match(/\d/g) | []).length > 10) {
            return 400;
        }
        for(i=0; i<ap.length; i++){
            if (!isLetter(ap.charAt(i))){
                return 400;
            }
        }

    } else{
        return 500;
    }

    if(nom){
        nom = nom.toLowerCase();
        for(i=0; i<nom.length; i++){
            if (!isLetter(nom.charAt(i))){
                return 400;
            }
        }
    }
    return 201;
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  ///---------------------------PUNTO 5----------------------------------------------