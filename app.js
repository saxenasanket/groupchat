
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser")
   
  
    

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));



app.get("/", function(req, res){
    res.render("home");
});

//INDEX - show all campgrounds
app.listen(2000, function(){
   console.log("The GC Server Has Started!");
});
