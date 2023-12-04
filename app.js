const { response } = require('express');
const express=require('express');
const fetch=require('node-fetch');
var bodyParser = require('body-parser')
require("dotenv").config();
const path = require('path');


const app=express();


app.use(express.static(__dirname + '/public'));
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.use(express.bodyParser())
app.set('view engine', 'ejs');
// import fetch from 'node-fetch';
app.listen(5000,()=>{
    console.log("listening");
})

var data;
function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
  }



const apiKey = `username=${process.env.USER_NAME}&api_key=${process.env.API_KEY}`;

const api_url=`https://clist.by/api/v4/contest//?${apiKey}&upcoming=true&format_time=true`
 fetch(api_url).then((response)=>response.json()).then((body)=>{
  
    data=body;
    
    let arr;
    try {
    arr  = JSON.parse(data)
   } catch(e) {
     arr = data
   }
 
  //  console.log(arr.objects)
  //  for(let i=0;i<arr.objects.length;i++){
  //      if(arr.objects[i].host=='codeforces.com')
  //      console.log(arr.objects[i])
  //  }
 


    app.get("/",(req,res)=>{
        res.render("list",{arr:arr.objects});
        
    })
    
    app.get("/contest/:name",(req,res)=>{
        
        res.render(req.params.name,{arr:arr.objects});
    })

    app.get("/us",(req,res)=>{
        res.render("about_us");
    })
    app.get("/team",(req,res)=>{
        res.render("about_team");
    })

    app.post('/search', urlencodedParser, function (req, res) {
          var s=[];
         
          let a=req.body.contest_name;
          let aa=a.toLowerCase();
          for(var i=0;i<arr.objects.length;i++){
            let k=arr.objects[i].event.toLowerCase();
              if(k.includes(aa))
              s.push(arr.objects[i]);
          } 
            if(s.length==0)
            res.send('<h1 style="color:red">NO RESULTS MATCHED</h1>')
            else
            res.render("list",{arr:s});

      })
     
});






