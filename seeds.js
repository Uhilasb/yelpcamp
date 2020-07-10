var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name :"Cloud's Rest",
            image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722e79d6904fc351_340.jpg.jpg",
            description:"blah blah"
        },
        {
            name :"Laky Laky",
            image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722e79d6904fc351_340.jpg/img/camp2.jpg",
            description:"blah blah"
        },
        {
            name :"Germia Park",
            image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e742d79d3954bcc_340.jpg",
            description:"blah blah"
        }
]

function seedDB(){
    //removed all camps
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed camps");
        //add a few camps
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a camp");
                        //create a comment
                        Comment.create(
                            {
                             text:"This place is great, but theres no net",
                             author:"Homer"   
                            }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    }else{    
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created a comment");
                                }
                            });
                    }
            });  
        });
     });
}
module.exports = seedDB;