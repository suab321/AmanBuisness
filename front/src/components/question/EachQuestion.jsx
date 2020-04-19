import React from 'react';
import { Button } from 'react-bootstrap';

class EachQuestion extends React.Component{

    constructor(props){
        super(props);
        // console.log(this.props.value.options);
        this.state={
            id:null,
            question:"",
            options:[],
            answer:"",
            solution:"",
            color:'',
            selected:'',
            showSolution:false,
            isChecked:false
        };
        this.Selected=this.Selected.bind(this);
        this.Check=this.Check.bind(this);

        this.ref1=React.createRef();
        this.ref2=React.createRef();
        this.ref3=React.createRef();
        this.ref4=React.createRef();
    }

    componentDidMount(){
        console.log("yes2");
        this.setState({
            id:this.props.value.id,
            question:this.props.value.question,
            options:this.props.value.options,
            answer:this.props.value.answer,
            solution:this.props.value.solution
        });
    }

    Selected(e,value){
        if(this.state.isChecked)
            return;
        // this.setState({color:});
        // console.log(e===this.ref2)
        if(e!==this.ref1)
            this.ref1.current.style.backgroundColor="transparent";
        if(e!==this.ref2)
            this.ref2.current.style.backgroundColor="";
        if(e!==this.ref3)
            this.ref3.current.style.backgroundColor="";
        if(e!==this.ref4)
            this.ref4.current.style.backgroundColor="";
    
        e.current.style.backgroundColor="green";
        console.log(value)
        this.setState({selected:value});
        
    }
    Check(){
        if(this.state.isChecked)
            return;
        this.setState({isChecked:true});
        if(this.state.answer===this.state.selected)
            this.props.CorrectAnswer();
        else
            this.setState({showSolution:true})
    }


    render(){
        console.log(this.state.selected);
        // console.log(this.props.value);
        if(this.props.value.options.length===4){
            return(
                <div style={{color:this.state.color}}>
                    <h4>{this.props.value.question}</h4>
                    {/* <input type="text" onClick={this.Selected} value={this.state.options[0]} readOnly/>
                    <input type="text" onClick={this.Selected} value={this.state.options[1]} readOnly/>
                    <input type="text" onClick={this.Selected} value={this.state.options[2]} readOnly/>
                    <input type="text" onClick={this.Selected} value={this.state.options[3]} readOnly/> */}
                    <h6 onClick={()=>this.Selected(this.ref1,this.state.options[0])} ref={this.ref1}>{this.state.options[0]}</h6><br/>
                    <h6 onClick={()=>this.Selected(this.ref2,this.state.options[1])} ref={this.ref2}>{this.state.options[1]}</h6><br/>
                    <h6 onClick={()=>this.Selected(this.ref3,this.state.options[2])} ref={this.ref3}>{this.state.options[2]}</h6><br/>
                    <h6 onClick={()=>this.Selected(this.ref4,this.state.options[3])} ref={this.ref4}>{this.state.options[3]}</h6><br/>
                    <Button onClick={this.Check}>Check</Button>
                    <h6 hidden={!this.state.showSolution}>{this.state.solution}</h6>
                </div>
            );
        }
        else{
            return(
                <h1>Please Wait</h1>
            );
        }
    }
}

export default EachQuestion;