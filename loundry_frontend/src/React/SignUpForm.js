import React, { Component } from 'react';
import  makeRegistration  from "../Redux/action/makeRegistration";
import { Form,Button } from "react-bootstrap";
import { connect} from "react-redux";
const axios = require('axios');

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            fullName: '',
            email: '',
            password: '',
            mobile:'',
            address:'',
            city:'',           
          
            isError:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleError=(message)=>{
      this.setState({
        isError : message
      })
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        }); 
    }

    handleSubmit(e) {
        e.preventDefault();
                if(this.state.fullName === "")
          {this.handleError('Enter Your Name'); return false;}
        else if(this.state.fullName.length < 6)
          {this.handleError('Enter more than 6 character Name'); return false;}
        else
          this.handleError('');

          if(this.IsEmail(this.state.email) === false)  
          {this.handleError('Enter Valid Email Id'); return false;}
         else
          this.handleError(''); 

        if(this.state.password === "")  
           {this.handleError('Enter Your Password'); return false;}         
        else if(this.state.password.length < 6)
          {this.handleError('Enter more than 6 character Password'); return false;}
        else
          this.handleError('');

        
        if(this.state.mobile === "")  
           {this.handleError('Enter Your Mobile Number'); return false;}                   
        else if(this.state.mobile.length < 10 || this.state.mobile.length > 10)
          {this.handleError('Enter 10 Digit Mobile Number'); return false;}
        else
          this.handleError('');

        if(this.state.city === "")  
           {this.handleError('Enter Your City'); return false;}         
        else
          this.handleError('');  

        if(this.state.address === "")  
           {this.handleError('Enter Your Address'); return false;}         
        else
          this.handleError('');  

        let { isError, ...state } = this.state;
        console.log(state);  
        this.props.makeRegistration(state);
        
        
        
    }
      IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }
    render() {
        return (
          <div className="signinForm col-md-5 border-dark shadow rounded mx-auto mt-3 p-3 bg-light">
          <h1 className="mx-auto text-center">Sign Up</h1> <hr/>

                <form onSubmit={this.handleSubmit}>
                {(this.state.isError || this.props.message) && (<div className='border rounded bg-warning p-2 text-center text-white'>{ this.state.isError || this.props.message}<br/></div>)}
                
                <Form.Group controlId="formBasicName" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name ="fullName"  placeholder="Enter Full Name" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name ="email"  placeholder="Enter Email Id" onChange={this.handleChange}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Paasword</Form.Label>
                <Form.Control type="password" name="password"  placeholder="Enter your password" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact No</Form.Label>
                <Form.Control type="number" name="mobile"  placeholder="Mobile Number" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city"  placeholder="Enetr Your City" onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicAddres">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address"  placeholder="Enetr Your Address" onChange={this.handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>

        </form>
        </div>
        );
    }
}
const mapStateToProps=(state)=>{
  console.log(state.loginReducer.message)
  return{
      message : state.loginReducer.message
  }
}
const mapDispatchToProps=(dispatch)=>{
 return{
  makeRegistration : (state)=>dispatch(makeRegistration(state))
 }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm);