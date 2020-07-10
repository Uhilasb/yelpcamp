var Campground = require("../models/campground");
var Comment     = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next){
    // is User Logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            }else{ 
                //does the user own the campgrounds
                if(foundCamp.author.id.equals(req.user._id)){
                   next();
                }else{
                    req.flash("erorr", "You don't have a permission to do that");
                   res.redirect("back");
                }
            }
        });
    }else{
        //redirect
        req.flash("error", "You must be logged in first.");
        res.redirect("back");
        }
        
}

middlewareObj.checkCommentsOwnership= function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, comment){
            if(comment.author.id.equals(req.user.id)){
                    next();
            }else{
                req.flash("erorr", "You dont't have permission to do that");
                res.redirect("back");
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in first");
    res.redirect("/login");
}


module.exports = middlewareObj;