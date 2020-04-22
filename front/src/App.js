import React from 'react';
import {NavDropdown,Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import Topic from './components/topics/Topic';
import Question from "./components/question/Question";
import axios from 'axios';
import Admin from './components/admin/Admin';

const {backendURL}=require("./imp")


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      class:[]
    }
    this.clicked=this.clicked.bind(this);
  }

  clicked(id){
    console.log(id);
    localStorage.setItem("subjectId",id);
  }

  componentDidMount(){
    axios.get(`${backendURL}/request/class`).then(res=>{
      console.log(res.data);
      this.setState({class:res.data});
    }).catch(err=>{
      console.log(err);
    })
  }

  render(){
    var renderElem;
    renderElem=this.state.class.map(i=>{
        return(
          
          <NavDropdown title={i.name} id="basic-nav-dropdown">
            {
              i.subjects.map(j=>{
                return(
                  <NavDropdown.Item onClick={()=>{this.clicked(j._id)}} href={`/class/${i.name}/${j.name}`}>{j.name}</NavDropdown.Item>
                )
              })
            }
          </NavDropdown>
          )
    })
    return(
      <Router>
        <div>
          <Switch>
            <Route exact strict path="/home" component={App}/>
            <Route exact strict path="/admin" component={Admin}/>
            <Route exact strict path="/home" component={App}/>
            <Route exact strict path="/class/:class/:subject" component={Topic}/>
            <Route exact strict path="/home" component={App}/>
            <Route exact strict path="/class/:class/:subject/:topic" component={Question}/>
          </Switch>
        <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#link">Link</Nav.Link>
          {renderElem}
          {/* <NavDropdown title="10" id="basic-nav-dropdown">
            <NavDropdown.Item href="/class/10/physics">Physics</NavDropdown.Item>
            <NavDropdown.Item href="/class/10/chemistry">Chemistry</NavDropdown.Item>
            <NavDropdown.Item href="/class/10/math">Maths</NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          {/* </NavDropdown>
          <NavDropdown title="11" id="basic-nav-dropdown">
            <NavDropdown.Item href="/class/11/physics">Physics</NavDropdown.Item>
            <NavDropdown.Item href="/class/11/chemistry">Chemistry</NavDropdown.Item>
            <NavDropdown.Item href="/class/11/math">Maths</NavDropdown.Item>
            {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          {/* </NavDropdown>
          <NavDropdown title="12" id="basic-nav-dropdown">
            <NavDropdown.Item href="/class/12/physics">Physics</NavDropdown.Item>
            <NavDropdown.Item href="/class/12/chemistry">Chemistry</NavDropdown.Item>
            <NavDropdown.Item href="/class/12/math">Maths</NavDropdown.Item>
            {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          {/* </NavDropdown> */}
          {/* <NavDropdown title="Gate" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
    </Navbar.Collapse>
    </Navbar>
      </div>
      </Router>

    )
  }
}

export default App;