/***
 * Author : Sumuga Padman
 * App : Simple - Rest - APi
 */

/* Require -- START -- */
const express = require("express");
const path = require('path');
const utf8 = require('utf8');
var urlencode = require('urlencode');
var bodyParser = require('body-parser');
/* Require -- END -- */


const app = new express();
const PORT = process.env.PORT || 3000;

app.get('/',function(req,res){
    return res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/:statusCode',function(req,res){
    if(req.params.statusCode == 500){
        res.statusMessage = 'Internal Server Error without multibyte characters';
        res.append('Cache-Control','must-revalidate,no-cache,no-store');
        res.append('Content-Type','text/html; charset=UTF-8');
        return res.status(200).sendFile(path.join(__dirname+'/views/500.html'));
    }else if (req.params.statusCode == 2002){
        res.append('Cache-Control','must-revalidate,no-cache,no-store');
        res.append('Content-Type','text/html; charset=UTF-8');
        //res.statusMessage = utf8.encode("Erreur Interne du Serveur à,é");
        res.statusMessage = urlencode("Erreur Interne du Serveur à,é");
        return res.status(200).sendFile(path.join(__dirname+'/views/2002.html'));
    } else {
        return res.send(req.params);
    }
    
});

app.post('/v1', function (req, res) {
    console.log(req.body);
    if(req.body.statusCode == 500){
        res.append('Cache-Control','must-revalidate,no-cache,no-store');
        res.append('Content-Type','text/html; charset=UTF-8');
        return res.status(500).sendFile(path.join(__dirname+'/views/500.html'));
    }else if (req.body.statusCode == 2002){
        //res.statusMessage = utf8.encode("Erreur Interne du Serveur à,é");
        res.statusMessage = urlencode("Erreur Interne du Serveur à,é");
        console.log(res.statusMessage);
        res.append('Cache-Control','must-revalidate,no-cache,no-store');
        res.append('Content-Type','text/html; charset=UTF-8');
        return res.status(500).sendFile(path.join(__dirname+'/views/2002.html'));
    } else {
        return res.send(req.body);
    }
});

app.get('/',function(req,res){
    return res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.listen(PORT,function(){
    console.log('Server Running');
})

