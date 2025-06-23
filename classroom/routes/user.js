const express = require("express");
const router = express.Router();

//index route 
router.get("/",(req,res)=>{
    res.send("Get for users");
})
//show-users
router.get("/:id",(req,res)=>{
    res.send("Get for users");
})
//POST users
router.post("/",(req,res)=>{
    res.send("Get for users");
})
//DELETE-users
router.delete("/:id",(req,res)=>{
    res.send("Get for users");
})

module.exports = router;