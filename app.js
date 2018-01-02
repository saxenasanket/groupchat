
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
  
    
mongoose.connect("mongodb://localhost/gc-db");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));


// PASSPORT CONFIGURATION

app.get("/", function(req, res){
    res.render("home");
});

//INDEX - show all campgrounds
app.listen(2000, function(){
   console.log("The YelpCamp Server Has Started!");
});