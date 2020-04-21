require('dotenv').config();

const mongoose=require('mongoose');

const Connection=mongoose.connect(process.env.databaseURL,{useNewUrlParser:true});

const classSchema=new mongoose.Schema({
    name:{type:String},
    subjects:[{type:mongoose.Schema.Types.ObjectId,ref:"Subject"}]
});
const topicSchema=new mongoose.Schema({
    name:String,
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}]
});
const questionSchema=new mongoose.Schema({
    question:String,
    options:[],
    answer:String,
    solution:String
});
const subjectSchema=new mongoose.Schema({
    name:String,
    topics:[{type:mongoose.Schema.Types.ObjectId,ref:"Topic"}]
});

const classModel=mongoose.model("Class",classSchema);
const topicModel=mongoose.model("Topic",topicSchema);
const questionModel=mongoose.model("Question",questionSchema);
const subjectModel=mongoose.model("Subject",subjectSchema);

// let db=new classModel;
// db.name="11";
// db.subjects=[];
// db.save();
// db=new classModel;
// db.name="12";
// db.subjects=[];
// db.save();
// db=new classModel;
// db.name="GATE";
// db.subjects=[];
// db.save();
// db=new classModel;
// db.name="10";
// db.subjects=[];
// db.save();
// db=new classModel;
// db.name="9";
// db.subjects=[];
// db.save();

module.exports={
    classModel,
    topicModel,
    questionModel,
    subjectModel
};
