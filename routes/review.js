const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const {listingSchema , reviewSchema} = require("../Schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressErr(400,errMsg);
  }
  else{
    next();
  }
}

router.post("/", validateReview, wrapAsync(async (req,res) =>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success","new Review created!");
  res.redirect(`/listings/${listing.id}`);
}))

//DELET REVIEW ROUTE
router.delete("/:reviewId",wrapAsync( async (req,res)=>{
  let {id,reviewId } = req.params;
  await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}})
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!");
  res.redirect(`/listings/${id}`);
}))

module.exports = router;