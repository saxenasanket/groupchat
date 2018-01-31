
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    //mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user"),
    mysql         = require('mysql');
   
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "GROUPCHAT"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM USERS";
              
   con.query(sql, function (err, result) {
     if (err) throw err;
     console.log(result);
   });
});
  
    
//mongoose.connect("mongodb://localhost/_Group_Chat");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


app.get("/", function(req, res){
    res.render("home");
});

// game section

app.get("/games/2048", function(req, res){
    res.render("2048");
});

app.post("/game/2048", function(req, res){
   res.render("games/2048");
});

//game section ended




//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});


//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});


    var sql = "INSERT INTO USERS (USERNAME,PASS) VALUES ('" + req.body.username + "','" + req.body.password + "')";
    console.log(sql);
    //var userData = [ [req.body.username, req.body.password] ];
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect("/");
  });


    // User.register(newUser, req.body.password, function(err, user){
    //  console.log("hello");
    //     if(err){
    //         console.log(err);
    //         return res.render("register");
    //     }
    //     passport.authenticate("local")(req, res, function(){
    //        res.redirect("/"); 
    //     });
    // });
});


// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//INDEX - show all campgrounds
app.listen(2000, function(){
   console.log("The GC Server Has Started!");
});
