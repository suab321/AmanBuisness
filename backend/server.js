const express =require('express');
const bodyParser=require("body-parser");

// require("./DataBase/database")
const {API}=require("./Routes/route");

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/request",API);


































app.listen(process.env.PORT||3002);