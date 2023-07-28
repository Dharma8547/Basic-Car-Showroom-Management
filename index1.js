var express = require("express")
var fs=require('fs');
var bodyParser = require("body-parser")
var cassandra = require('cassandra-driver');
var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
var client = new cassandra.Client({ contactPoints:['127.0.0.1:9042'],keyspace:"stcars"});

var router = express.Router();

router.use(bodyParser.json())
router.use(express.static('public'))
router.use(bodyParser.urlencoded({
    extended:true
}))



client.connect(function(err,result){
console.log('index: cassandra connected');
});


var insertUser = 'INSERT INTO keyspace.subscribers (email) VALUES (?, ?, ?, ?);';

//var db=cassandra-driver.connection;

//db.on('error',()=>console.log("Error in Connecting to Database"));
//db.once('open',()=>console.log("Connected to Database"))


router.post("/sign_up2", function(req, res) {
  var eamil = req.body.email;
  client.execute(insertUser, [email], 
  { prepare: true }, function(err) {
    if (err) {
      console.log("error"); // I receive error.
    } else {
      console.log("success");
    }
  });
});

router.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index2.html');
});




