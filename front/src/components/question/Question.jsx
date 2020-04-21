import React from 'react';
import { Button } from 'react-bootstrap';
import EachQuestion from './EachQuestion';
import axios from 'axios';


const {backendURL}=require("../../imp");
class Question extends React.Component{

    constructor(props){
        super(props);
        // console.log("yes2");
        this.state={
            class:"",
            subject:"",
            topic:"",
            questions:[],
            score:0,
            showScore:false
        }
        this.CorrectAnswer=this.CorrectAnswer.bind(this);
        this.Submit=this.Submit.bind(this);
    }
    Submit(){
        this.setState({showScore:true});
    }
    CorrectAnswer(){
        this.setState((state,props)=>({
            score:state.score+1
        }));
        console.log("correct");
    }
    // shouldComponentUpdate(prevState,prevProp){
    //     // if(this.state.score!==prevState.score)
    //     //     return false;
    //     return true;
    // }

    componentDidMount(){
        //http req to fetch data
        // console.log("yes");
        axios.get(`${backendURL}/request/questions/${localStorage.getItem("topicId")}`).then(res=>{
            console.log(res.data);
            this.setState({questions:res.data});
        })
        var obj={
            id:0,
            question:"What is your name ?",
            options:["a","b","c","d"],
            answer:"a",
            solution:["my name is aman"]
        };
        var ques=[];
        for(var i=0;i<6;i++){
            ques.push(obj);
        }
        // console.log(ques);
        // this.setState({questions:ques});
    }
    render(){
        console.log(this.state);
        if(this.state.showScore){
            return(
                <div style={{marginTop:"100px",textAlign:'center'}}>
                    <h1>Your Score is {this.state.score} out of {this.state.questions.length}</h1>
                </div>
            )
        }
        else if(this.state.questions.length!==0){
            const renderElement=this.state.questions.map(i=>{
                // console.log(i);
                return(
                    <div>
                        <EachQuestion value={i} CorrectAnswer={this.CorrectAnswer}/>
                    </div>
                )
            })
            return(
                <div style={{marginTop:"100px",textAlign:'center'}}>
                    <h1>{renderElement}</h1><br/>
                    <Button onClick={this.Submit}>Submit</Button>
                </div>
            )
        }
        else{
            return(
                <div style={{marginTop:"100px",textAlign:'center'}}>
                    <h1>HEllo</h1>
                </div>
            )
        }
    }
}

export default Question;