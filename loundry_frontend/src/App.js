import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink,Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { Grid } from "semantic-ui-react";
import 'bootstrap/dist/css/bootstrap.min.css';

import  Navbar  from "./React/Navbar";
import  Services  from "./React/Services";
import Homepage from './React/Homepage';
import  Profile  from "./React/Profile";
import  Nomatch  from "./React/Nomatch";
import SignUpForm from './React/SignUpForm';
import SignInForm from './React/SignInForm';
import BookingCart  from './React/bookingCart';
import ChangeAddress from './React/changeAddress';
import Logout from './React/logout';
import Dashboard from './React/dashboard';

import './App.css';

class App extends Component {
  render() {
    return (

      <div>
        <Router>
        <Navbar/>
        <Container>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/services" component={Services} />
            <Route path='/profile' component={Profile}/>
            <Route path='/signin' component={SignInForm}/>
            <Route path='/signup' component={SignUpForm}/>
            <Route path='/booking' component={BookingCart}/>
            <Route path='/address' component={ChangeAddress}/>
            <Route path="/logout" component={Logout}/>
           {/* // <Route path="/Dashboard" component={Dashboard}/> */}
           
            <Route component={Nomatch} />
          </Switch>
        </Container>
         </Router>
       </div >


      
    );
  }
}

export default App;