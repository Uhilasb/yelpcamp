var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Campground.find({},function(err, camps){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds : camps, currentUser: req.user});
            }
    });
    
});

router.post("/", middleware.isLoggedIn, function(req, res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var Obj = {
            name:name,
            image: image,
            description : desc,
            author : author 
        }
        Campground.create(Obj, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/campgrounds");   
                }
        });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});


router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, camps){
        if(err){
            console.log(err);
        }else{
            console.log(camps);
            res.render("campgrounds/show", {campground: camps})
        }
    }); 
});
//Edit Route
router.get("/:id/edit", middleware.checkOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit", {campground: foundCamp});
        }
    });
});
//Update Route
router.put("/:id", middleware.checkOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + updatedCamp.id);
            //res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//Delete Route
router.delete("/:id", middleware.checkOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, camp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;