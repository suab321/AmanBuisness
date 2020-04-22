import React from 'react';
import {backendURL} from '../../imp';
import axios from 'axios';
import {Dropdown,Form,Button} from 'react-bootstrap'
import AddQuestion from './AddQuestion';


class AddTopic extends React.Component{
    constructor(props){
        super(props);

        this.state={
            data:[],
            selected:{subjectID:null,name:"Select Subject"},
            loading:true,
            error:false,
            add:true,
            isSelected:false,
            showForm:false
        }
        this.topicRef=React.createRef();
        this.selected=this.selected.bind(this);
        this.addTopic=this.addTopic.bind(this);
    }

    selected(info){
        this.setState({selected:{subjectID:info._id,name:info.name},isSelected:true,showForm:true})
    }

    componentDidMount(){
        axios.get(`${backendURL}/request/subject_by_ID/${this.props.classID}`).then(res=>{
            this.setState({data:res.data.subjects,loading:false})
        }).catch(err=>{this.setState({error:true})});
    }

    addTopic(){
        this.setState({loading:true});
        axios.post(`${backendURL}/request/addTopic`,{
            name:this.topicRef.current.value,
            questions:[],
            subjectID:this.state.selected.subjectID
        }).then(res=>{
            this.setState({loadind:false});
        }).catch(err=>{
            this.setState({error:true})
        })
    }

    render(){
        console.log("reached");
        const renderElem=this.state.data.map(i=>{
            return(
                <Dropdown.Item onClick={()=>this.selected(i)}>{i.name}</Dropdown.Item>
            )
        });
        if(this.props.what==="question"&&this.state.isSelected){
            return(
                <div style={{marginTop:"100px",textAlign:"center"}}>
                    <AddQuestion subjectID={this.state.selected.subjectID}/>
                </div>
            )
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
                        <div hidden={!this.state.showForm}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Add Topic</Form.Label>
                                <Form.Control ref={this.topicRef} type="text" placeholder="Enter topic" />
                            </Form.Group>
                            <Button onClick={this.addTopic} variant="primary">
                                Add
                            </Button>
                        </Form>
                        </div>
                    </div>
            )
        }
    }
}

export default AddTopic;