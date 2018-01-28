var mongoose = require("mongoose");
var fs =require("fs")
mongoose.connect("mongodb://monny:qwer1234@ds117858.mlab.com:17858/foodindex");
var directiondata =new mongoose.Schema({
    fgid: String,
    dir_stmt: String
});
var foodgroupdata =new mongoose.Schema({
    fgid: String,
    foodgroup: String,
    categories: Object
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

var directinfile = "fg_directional_satements-en.json";
var foodgroupfile ="foodgroups-en.json";
var foodsfile ="foods-en.json";
var servings_per_dayfile = "servings_per_day-en.json";
// global variable
var directiontable = JSON.parse(fs.readFileSync(directinfile, 'utf8'))["directional_statements"];
var foodgrouptable = JSON.parse(fs.readFileSync(foodgroupfile, 'utf8'))["foodgroups"];
var foodstable =     JSON.parse(fs.readFileSync(foodsfile, 'utf8'))["foods"];
var personserving =  (JSON.parse(fs.readFileSync(servings_per_dayfile, 'utf8')))["servings to per to miy"];

var direction = mongoose.model("fg_direction_statements-en",directiondata);
directiontable.forEach(function(data){
    direction.create(data,function(err,newdata){
         if(err){
            console.log(err);}
    });
});
var foodgroup = mongoose.model("foodgroups-en",foodgroupdata);
foodgrouptable.forEach(function(data){
    foodgroup.create(data,function(err,newdata){
         if(err){
            console.log(err);}
    });
});
var food = mongoose.model("foods-en",foodsdata);
foodstable.forEach(function(data){
    food.create(data,function(err,newdata){
         if(err){
            console.log(err);}
    });
});
var persons = mongoose.model("servings_per_day-en",personservingdata);
personserving.forEach(function(data){
    persons.create(data,function(err,newdata){
         if(err){
            console.log(err);}
    });
});