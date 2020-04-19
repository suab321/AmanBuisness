import React from 'react';
import { Link } from 'react-router-dom';

class Topic extends React.Component{
    constructor(props){
        super(props);
        this.state={
            class:"",
            subject:"",
            topics:[]
        }
    }
    componentDidMount(){
        console.log(this.props);
        this.setState({class:this.props.match.params.class,subject:this.props.match.params.subject});
        // http call to fetch data;
        this.setState({topics:["kinematics","elec","mag"]});
    }
    render(){
        console.log(this.state);
        const topics=this.state.topics.map(i=>{
            return(
                <div>
                    <Link to={this.props.location.pathname+`/${i}`}>{i}</Link><br/>
                </div>
            )
        })
        console.log(this.state);
        return(
            <div style={{marginTop:'100px',textAlign:'center'}}>
                {topics}
            </div>
        )
    }
}

export default Topic;