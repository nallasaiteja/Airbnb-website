const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.use("/users",users);
app.use("/posts",posts);


app.get("/getsignedcookie",(req,res)=>{
   res.cookie("made-in","India",{signed : true});
   res.send("signed cookie sent");
})


app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.send("I am generated cookies");
})

app.get("/",(req,res)=>{
    console.dir(req.cookies);

})


app.listen(3000,(req,res)=>{
    console.log("connected");
})