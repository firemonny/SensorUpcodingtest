//variable declartion
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://monny:qwer1234@ds117858.mlab.com:17858/foodindex");
//mongodb://monny:qwer1234@ds117858.mlab.com:17858/foodindex
//mongodb://localhost/codetest
// Data structure declartion
var directiondata =new mongoose.Schema({
    fgid: String,
    dir_stmt: String
});
var foodgroupdata =new mongoose.Schema({
    fgid: String,
    foodgroup: String,
    categories: Array
});
var foodsdata =new mongoose.Schema({
    fgid: String,
    fgcat_id: String,
    srvg_sz: String,
    food: String
});
var personservingdata =new mongoose.Schema({
    fgid: String,
    gender: String,
    ages: String,
    servings: String
});

//connect MongoDB database
var direction = mongoose.model("fg_direction_statements-en",directiondata);
var foodgroup = mongoose.model("foodgroups-en",foodgroupdata);
var food = mongoose.model("foods-en",foodsdata);
var persons = mongoose.model("servings_per_day-en",personservingdata);

//preset up format ejs
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//get index route
app.get("/",function(req,res){
   res.render("index");
});

//post route
app.post("/result",function(req,res){
    var input = req.body.result;
    //declare the output value class
    var person_data =   {"age":null,
                        "gender":null,
                        "vf":{"servings":null,"food":[]},
                        "gr":{"servings":null,"food":[]},
                        "da":{"servings":null,"food":[]},
                        "me":{"servings":null,"food":[]},
    };
    var ageresult = input.age;
    var genderresult = input.gender;
    //find the serving size
    var promise = persons.find({"gender":genderresult,"ages":ageresult},"fgid servings",function(err,data){
        if(err) throw err;
     }).exec();
     promise instanceof Promise;
     promise.then(function(data){
         person_data.gender=genderresult;
         person_data.age =ageresult;
         data.forEach(function(subset){
            if(subset.fgid==="vf")      {person_data.vf.servings = subset.servings;}
            else if(subset.fgid==="gr") {person_data.gr.servings = subset.servings;}
            else if(subset.fgid==="mi") {person_data.da.servings = subset.servings;}
            else                        {person_data.me.servings = subset.servings;}
         });
        var promisevf =food.find({"fgid":"vf"},"srvg_sz food",function(err,data){
        if(err) throw err;
            }).exec();
            promisevf instanceof Promise;
            promisevf.then(function(data){
            var randomarray = getRandomNumber(0,(data.length-1));
            for(let i=0;i<checkserving(person_data.vf.servings);i++){
             var temp = {"name":data[randomarray[i]].food,"srvg_sz":data[randomarray[i]].srvg_sz};
             person_data.vf.food.push(temp);
            }
            });         
         var promiseda =food.find({"fgid":"da"},"srvg_sz food",function(err,data){
        if(err) throw err;
        }).exec();
            promiseda instanceof Promise;
            promiseda.then(function(data){
            var randomarray = getRandomNumber(0,(data.length-1));
            for(let i=0;i<checkserving(person_data.da.servings);i++){
             var temp = {"name":data[randomarray[i]].food,"srvg_sz":data[randomarray[i]].srvg_sz};
             person_data.da.food.push(temp);
            }
            });
        var promisegr =food.find({"fgid":"gr"},"srvg_sz food",function(err,data){
        if(err) throw err;
        }).exec();
            promisegr instanceof Promise;
            promisegr.then(function(data){
            var randomarray = getRandomNumber(0,(data.length-1));
            for(let i=0;i<checkserving(person_data.gr.servings);i++){
             var temp = {"name":data[randomarray[i]].food,"srvg_sz":data[randomarray[i]].srvg_sz};
             person_data.gr.food.push(temp);
            }
            });
        var promiseme =food.find({"fgid":"me"},"srvg_sz food",function(err,data){
        if(err) throw err;
         }).exec();
            promiseme instanceof Promise;
            promiseme.then(function(data){
            var randomarray = getRandomNumber(0,(data.length-1));
            for(let i=0;i<checkserving(person_data.me.servings);i++){
             var temp = {"name":data[randomarray[i]].food,"srvg_sz":data[randomarray[i]].srvg_sz};
             person_data.me.food.push(temp);
         }
        });
        Promise.all([promisevf,promiseda,promisegr,promiseme]).then(function(){res.render("result", {person_data: person_data});
        });
        });
}) ; 

//set up listener port and IP
app.listen(process.env.PORT, process.env.IP,function(){
console.log("Backend server running");
});

function getRandomNumber(min,max){
    var X= [];
    while(max>= min) X.push(max--);    
    X.sort(function(){return .5- Math.random()});  
    return X;
}
function checkserving(src){
    if(src === "1 to 2") return "2";
    else if (src === "3 to 4") return "4";
    else if (src === "6 to 7") return "7";
    else if (src === "7 to 8") return "8";
    else if (src === "8 to 10")  return "10";
    else return src;
}