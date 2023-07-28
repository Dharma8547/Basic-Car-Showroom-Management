var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://0.0.0.0:27017/Campaign',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;


db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('Users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index3.html')

})

app.post("/sign_up1",(req,res)=>{

    return res.redirect('index5.html')

})


app.post("/sign_up2",(req,res)=>{
    var email = req.body.email;

    var data = {
        "email" : email,
    }

    db.collection('Subscribers').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index4.html')

})

app.post("/sign_up3",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var query = req.body.query;

    var data = {
        "name": name,
        "email" : email,
        "subject": subject,
        "query" : query
    }

    db.collection('Contacts').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index4.html')

})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index5.html');
}).listen(3000);


console.log("Listening on PORT 3000");


