const express = require("express");
const path = require('path');
const app = new express();
const PORT = process.env.PORT || 3000;

app.get('/',function(req,res){
    return res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/:statusCode',function(req,res){
    if(req.params.statusCode == 500){
        res.append('#status#',`HTTP/1.1 500 [Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.]`);
        res.append('Cache-Control','must-revalidate,no-cache,no-store');
        res.append('Content-Type','text/html; charset=UTF-8');
        return res.status(500).sendFile(path.join(__dirname+'/views/500.html'));
    }else if (req.params.statusCode == 2002){
        res.append('#status#',`HTTP/1.1 500 [Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...", proviennent de la section 1.10.32.]`);
        res.append('Cache-Control','must-revalidate,no-cache,no-store');
        res.append('Content-Type','text/html; charset=UTF-8');
        return res.status(500).sendFile(path.join(__dirname+'/views/2002.html'));
    } else {
        res.send(req.params);
    }
    
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.listen(PORT,function(){
    console.log('Server Running');
})

