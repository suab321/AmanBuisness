import React from 'react';
import axios from 'axios';
import {backendURL} from '../../imp';
import {Dropdown,Form,Button} from 'react-bootstrap'
import AddTopic from './AddTopic';


class AddSubject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            selected:{classID:null,name:"Select Class"},
            isSelected:false,
            loading:true,
            error:false,
            add:true,
            showForm:true
        }
        this.subjectRef=React.createRef();
        this.selected=this.selected.bind(this);
        this.addSubject=this.addSubject.bind(this);
    }

    addSubject(){
        this.setState({isSelected:true,loading:true});
        axios.post(`${backendURL}/request/addSubject`,{
            name:this.subjectRef.current.value,
            topics:[],
            classID:this.state.selected.classID
        }).then(res=>{this.setState({loading:false})}).catch(err=>{this.setState({error:true})})
    }

    selected(info){
        this.setState({selected:{classID:info._id,name:info.name},showForm:false,isSelected:true});
    }

    componentDidMount(){
        axios.get(`${backendURL}/request/class`).then(res=>{
            this.setState({data:res.data,loading:false});
        }).catch(err=>{
            this.setState({error:true})
        })
    }

    render(){
        console.log(this.state);
        console.log(this.props.what)
        const renderElem=this.state.data.map(i=>{
            return(
            <Dropdown.Item onClick={()=>this.selected(i)}>{i.name}</Dropdown.Item>
            )
        });
        if(this.props.what!=="subject"&&this.state.isSelected){
            return(
                <AddTopic what={this.props.what} classID={this.state.selected.classID}/>
            );
        }
        else{
            return(
                <div style={{marginTop:"100px",textAlign:"center"}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.selected.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {renderElem}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div hidden={this.state.showForm}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Add Subject</Form.Label>
                            <Form.Control ref={this.subjectRef} type="text" placeholder="Enter subject" />
                        </Form.Group>
                        <Button onClick={this.addSubject} variant="primary">
                            Add
                        </Button>
                    </Form>
                    </div>
                </div>
            )
        }
    }
}

export default AddSubject;