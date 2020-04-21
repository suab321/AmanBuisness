const express =require('express');
const bodyParser=require("body-parser");
const cors=require('cors');
// require("./DataBase/database")
const {API}=require("./Routes/route");


const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/request",API);


































app.listen(process.env.PORT||3002);