import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const {backendURL}=require("../../imp");

class Topic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            class:"",
            subject:"",
            topics:[]
        }
        this.clicked=this.clicked.bind(this);
    }
    componentDidMount(){
        console.log(this.props);
        // console.log(process.env.backendURL)
        this.setState({class:this.props.match.params.class,subject:localStorage.getItem("subjectId")});
        // http call to fetch data;
        axios.get(backendURL+"/request/topics/"+localStorage.getItem("subjectId")).then(res=>{
            console.log(res.data);
            this.setState({topics:res.data.topics});
        })
        // this.setState({topics:["kinematics","elec","mag"]});
    }
    clicked(id){
        localStorage.setItem("topicId",id);
    }
    render(){
        console.log(this.state);
        const topics=this.state.topics.map(i=>{
            return(
                <div>
                    <Link onClick={()=>{this.clicked(i._id)}} to={this.props.location.pathname+`/${i.name}`}>{i.name}</Link><br/>
                </div>
            )
        })
        // console.log(this.state);
        return(
            <div style={{marginTop:'100px',textAlign:'center'}}>
                {topics}
            </div>
        )
    }
}

export default Topic;