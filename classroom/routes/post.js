const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Get for posts");
})

router.get("/:id",(req,res)=>{
    res.send("Get for posts");
})

router.delete("/",(req,res)=>{
    res.send("Get for posts");
})

router.delete("/:id",(req,res)=>{
    res.send("Get for posts");
})

module.exports = router;

