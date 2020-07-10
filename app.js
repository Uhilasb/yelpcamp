var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOVerride= require("method-override"),
    flash         = require("connect-flash"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"), 
    seedDB        = require("./seeds")

var commentRoutes     = require("./routes/comments"),
    campgroundRooutes = require("./routes/campgrounds"),
    authRoutes        = require("./routes/index");


            mongoose.connect("mongodb://localhost/yelp_camp_v9");
            app.use(bodyParser.urlencoded({extended: true}));
            app.set("view engine", "ejs");
            app.use(express.static(__dirname+ "/public"))
            app.use(methodOVerride("_method"));
            app.use(flash());    
//Passport Config
app.use(require("express-session")({
        secret: "Lakers",
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
    res.locals.error     = req.flash("error");
    res.locals.success   = req.flash("success");
    next();
});

//seedDB(); //seed the database

app.use(authRoutes);
app.use("/campgrounds", campgroundRooutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("The servers has started");
});