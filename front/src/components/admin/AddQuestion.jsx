import React from 'react';
import {backendURL} from '../../imp';
import axios from 'axios';
import {Dropdown,Form,Button} from 'react-bootstrap'


class AddQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading:true,
            selected:{topicID:null,name:"Select Question"},
            showForm:true
        }
        this.questionRef=React.createRef();
        this.optionRef1=React.createRef();
        this.optionRef2=React.createRef();
        this.optionRef3=React.createRef();
        this.optionRef4=React.createRef();
        this.answerRef=React.createRef();
        this.solutionRef=React.createRef();

        this.selected=this.selected.bind(this);
        this.addQuestion=this.addQuestion.bind(this);
    }

    addQuestion(){
        this.setState({loading:true});
        var options=[this.optionRef1.current.value,this.optionRef2.current.value,this.optionRef3.current.value,this.optionRef4.current.value];
        axios.post(`${backendURL}/request/addQuestion`,{
           question:this.questionRef.current.value,
           options:options,
           answer:this.answerRef.current.value,
           solution:this.solutionRef.current.value,
           topicID:this.state.selected.topicID
        }).then(res=>{
            this.setState({loading:false});
        }).catch(err=>{this.setState({error:true})});
    }

    selected(info){
        this.setState({selected:{topicID:info._id,name:info.name},isSelected:true,showForm:false});
    }
    componentDidMount(){
        axios.get(`${backendURL}/request/topics/${this.props.subjectID}`).then(res=>{
            this.setState({data:res.data.topics,loading:false})
        }).catch(err=>{this.setState({error:true})})
    }
    render(){
        const renderElem=this.state.data.map(i=>{
            return(
                <Dropdown.Item onClick={()=>this.selected(i)}>{i.name}</Dropdown.Item>
            )
        })
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
                                <Form.Label>Add Question</Form.Label>
                                <Form.Control ref={this.questionRef} type="text" placeholder="Enter Question" />
                                <Form.Control ref={this.optionRef1} type="text" placeholder="Enter First option" />
                                <Form.Control ref={this.optionRef2} type="text" placeholder="Enter Second option" />
                                <Form.Control ref={this.optionRef3} type="text" placeholder="Enter Third option" />
                                <Form.Control ref={this.optionRef4} type="text" placeholder="Enter Fourth option" />
                                <Form.Control ref={this.answerRef} type="text" placeholder="Enter answer" />
                                <Form.Control ref={this.solutionRef} type="text" placeholder="Enter solution" />
                            </Form.Group>
                            <Button onClick={this.addQuestion} variant="primary">
                                Add
                            </Button>
                        </Form>
                        </div>
                    </div>
        )
    }
}

export default AddQuestion;