import React from 'react';
import axios from 'axios';
import {backendURL} from '../../imp';
import {Dropdown,Form,Button} from 'react-bootstrap'
import AddSubject from './AddSubject';

class Admin extends React.Component{
    constructor(){
        super();
        this.state={
            error:false,
            data:[],
            selected:"nothing"        
        };

        this.Selected=this.Selected.bind(this);
    }

    Selected(name){
        this.setState({selected:name});
    }

    render(){
        console.log(this.state);
        if(this.state.selected==="nothing"){
            return(
                <div style={{marginTop:"100px",textAlign:"center"}}>
                    <Button onClick={()=>this.Selected("subject")}>SUBJECT</Button><br/><br/>
                    <Button onClick={()=>this.Selected("topic")}>TOPIC</Button><br/><br/>
                    <Button onClick={()=>this.Selected("question")}>QUESTION</Button><br/><br/>
                </div>
            )
        }
        else{
            return(
                <div style={{marginTop:"100px",textAlign:"center"}}>
                   <AddSubject what={this.state.selected}/>
                </div>
            )
        }
    }
}

export default Admin;



