const router=require('express').Router();

const {classModel,topicModel,questionModel,subjectModel}=require("../DataBase/database");

//middlewares to check for session
// function checkSession(req,res,next){
//     if(req.)
// }
//ends

//route class Started//
router.get("/class",(req,res)=>{
    classModel.find({}).populate("subjects").exec((err,data)=>{
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else
            res.status(200).json(data);
    })
})
//route class Ended//

//subject Routes start//
router.get("/subject/:className",(req,res)=>{
    classModel.findOne({name:req.params.className}).populate("subjects").exec((err,data)=>{
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else
            res.status(200).json(data);
    });
});

router.post("/addSubject",async(req,res)=>{
    console.log(req.body);
    try {
        let db=new subjectModel;
        db.name=req.body.name;
        db.topics=req.body.topics;
        const data=await db.save();
        try {
            await classModel.findByIdAndUpdate({_id:req.body.classID},{$addToSet:{'subjects':data._id}});
            res.status(200).json("success");
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})
//subject Routes ends//


//topic Routes start
function checkFormat(question){

}

router.get("/test",(req,res)=>{
    res.send("hello");
})

router.post("/addTopic",async(req,res)=>{
    console.log(req.body);
    try {
        let db=new topicModel;
        db.name=req.body.name;
        db.questions=req.body.questions;
        try {
            const data=await db.save();
            try{
                await subjectModel.findByIdAndUpdate({_id:req.body.subjectID},{$addToSet:{'topics':data._id}});
                res.status(200).json("success");
            }catch(error){
                console.log(error);
                res.status(400).json(error);
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
router.get("/topics/:subjectID",async(req,res)=>{
    console.log(req.params);
        subjectModel.findById({_id:req.params.subjectID}).populate("topics").exec((err,data)=>{
            if(err){
                console.log(err);
                res.status(400).json(err);
            }
            else
                res.status(200).json(data);
        })
});
//topic Routes ends

//question Routes starts//
router.post("/addQuestion",async(req,res)=>{
    console.log(req.body);
    let db=new questionModel;
    db.question=req.body.question;
    db.options=req.body.options;
    db.answer=req.body.answer;
    db.solution=req.body.solution;

    try {
        const data=await db.save();
        try{
            await topicModel.findByIdAndUpdate({_id:req.body.topicID},{$addToSet:{'questions':data._id}});
            res.status(200).json("success");
        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

router.get("/questions/:topicID",async(req,res)=>{
    topicModel.findById({_id:req.params.topicID}).populate('questions').exec((err,data)=>{
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            res.status(200).json(data.questions);
        }
    })
});
//question Routes ends//

module.exports={
    API:router
}