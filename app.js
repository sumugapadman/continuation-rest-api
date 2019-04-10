/***
 * Author : Sumuga Padman
 * App : Simple - Rest - APi
 */

/* Require -- START -- */
const express = require("express");
const path = require('path');
const utf8 = require('utf8');
const urlencode = require('urlencode');
const bodyParser = require('body-parser');
const decode = require('salesforce-signed-request');
const request = require('request');
/* Require -- END -- */


const app = new express();
const PORT = process.env.PORT || 3000;
var  consumerSecret = '6B22C4D5F45169332E3CA545F1FB035A2D46B2D6093A96E4D210CC5C0277570C';

app.get('/',function(req,res){
    return res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser()); // pull information from html in POST

app.get('/home',function(req,res){
    return res.sendFile(path.join(__dirname+'/views/index.html'));
});

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

app.post('/signedrequest', function(req, res) {

    // You could save this information in the user session if needed
    var signedRequest = decode(req.body.signed_request, consumerSecret),
        context = signedRequest.context,
        oauthToken = signedRequest.client.oauthToken,
        instanceUrl = signedRequest.client.instanceUrl,

        query = "SELECT Id, FirstName, LastName, Phone, Email FROM Contact WHERE Id = '" + context.environment.record.Id + "'",

        contactRequest = {
            url: instanceUrl + '/services/data/v44.0/query?q=' + query,
            headers: {
                'Authorization': 'OAuth ' + oauthToken
            }
        };

    request(contactRequest, function(err, response, body) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
        res.setHeader("Expires", new Date(Date.now() + 31536000).toUTCString());
        res.render('canvas',{context: context});
    });

});

app.listen(PORT,function(){
    console.log('Server Running');
})

