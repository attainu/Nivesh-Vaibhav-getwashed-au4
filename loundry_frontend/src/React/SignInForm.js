import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link , Redirect} from 'react-router-dom';
import {makeLogin} from "../Redux/action/makeLogin";
import { Form,Button } from "react-bootstrap";
const axios = require('axios');
class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
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

        
        let { isError, ...state } = this.state;
       this.props.makeLogin(state);
      
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
      if(this.props.isLoggedIn === true){
        return <Redirect to="/profile"/>;
      }
        return (
        <div className="signinForm col-md-5 border-dark shadow rounded mx-auto mt-5 p-3 bg-light">
            <h1 className="mx-auto text-center">Login</h1> <hr/>

                  <form onSubmit={this.handleSubmit}>
                  {(this.state.isError || this.props.message) && (<div className='border rounded bg-warning p-2 text-center text-white'>{ this.props.message || this.state.isError}<br/></div>)}
                  <Form.Group controlId="formBasicEmail" >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name ="email" placeholder="Enter email" onChange={this.handleChange}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
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
 
  return{
        message : state.loginReducer.loginMessage,
        fullName : state.loginReducer.fullName,
        isLoggedIn : state.loginReducer.isLoggedIn
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    makeLogin : (state)=>dispatch(makeLogin(state))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignInForm);