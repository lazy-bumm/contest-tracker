const { response } = require('express');
const express=require('express');
const fetch=require('node-fetch');
var bodyParser = require('body-parser')

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

'https://clist.by/api/v2/contest//?username=rumaan&api_key=dc9ed8b489c640d09ed44b3858901dc0326b0ee1';
const apikey='/?username=rumaan&api_key=dc9ed8b489c640d09ed44b3858901dc0326b0ee1';
const api_url='https://kontests.net/api/v1/all'
 fetch(api_url).then((response)=>response.json()).then((body)=>{
    
    data=body;
    //console.log(data)
    let arr;
    try {
    arr  = JSON.parse(data)
   } catch(e) {
     arr = data
   }
// for(var i=0;i<arr.length;i++){
//     console.log(arr[i].name)
// }

   //var a=JSON.stringify(data)
   //console.log(a);


    app.get("/",(req,res)=>{
        res.render("list",{arr:arr});
        
    })
    
    app.get("/contest/:name",(req,res)=>{
        
        res.render(req.params.name,{arr:arr});
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
          for(var i=0;i<arr.length;i++){
            let k=arr[i].name.toLowerCase();
              if(k.includes(aa))
              s.push(arr[i]);
          } 
            if(s.length==0)
            res.send('<h1 style="color:red">NO RESULTS MATCHED</h1>')
            else
            res.render("list",{arr:s});

      })
     
});






