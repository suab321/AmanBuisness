require('dotenv').config();

const mongoose=require('mongoose');

const Connection=mongoose.connect(process.env.databaseURL,{useNewUrlParser:true});

const classSchema=new mongoose.Schema({
    name:{type:String,unique:true},
    topics:[{type:mongoose.Schema.Types.ObjectId,ref:"Topic"}]
})

const topicSchema=new mongoose.Schema({
    name:String,
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}]
})
const questionSchema=new mongoose.Schema({
    question:String,
    options:[],
    answer:String,
    solution:String
})

const classModel=mongoose.model("Class",classSchema);
const topicModel=mongoose.model("Topic",topicSchema);
const questionModel=mongoose.model("Question",questionSchema);

// let db=new classModel;
// db.name="11";
// db.topics=[];
// db.save();
// db=new classModel;
// db.name="12";
// db.topics=[];
// db.save();
// db=new classModel;
// db.name="GATE";
// db.topics=[];
// db.save();
// db=new classModel;
// db.name="10";
// db.topics=[];
// db.save();

module.exports={
    classModel,
    topicModel,
    questionModel
};
