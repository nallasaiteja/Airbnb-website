const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const {listingSchema , reviewSchema} = require("../Schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");


const validateListing =(req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressErr(400,errMsg);
  }
  else{
    next();
  }
}






//Index Router
 router.get("/", isLoggedIn, wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//New Route
router.get("/new", (req, res) => {
  
  res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews").populate("owner");
  if(!listing){
    req.flash("error","Listing you requested for does not exists");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));

//Create Route
router.post("/",validateListing, wrapAsync(async (req, res,next) => {
   
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id; 
   await newListing.save();
   req.flash("success","new Listing created!");
   res.redirect("/listings");

  
}));

//Edit Route
router.get("/:id/edit",isLoggedIn,wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exists");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",isLoggedIn,validateListing, wrapAsync(async (req, res) => {
  
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing updated");
  res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
}));


module.exports = router;