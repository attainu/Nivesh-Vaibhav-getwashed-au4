import  React from "react";
import { Redirect } from 'react-router-dom'
import BookOrder from './bookOrder.js';
import GetOrderByUserId from './getUserOrder.component';
import { connect } from "react-redux";
import { Jumbotron} from "react-bootstrap";
import {getOrder} from "../Redux/action/getOrder";
import {bookOrder,selectDate,action,timeSloat,addCloth} from "../Redux/action/bookOrder";
const axios = require('axios');

class Profile extends React.Component
{  
    constructor()
    {
        super(); 
       
       this.state={
            orders:[],
            bookOrder:"",
            getOrder:"",
            isLoggedIn : false
        }
        
       
    }
    
     handleGetOrder=()=>{
        
        this.setState({
            bookOrder : '',
            getOrder:"order"
        })
           // this.props.getOrder(this.props.id);
           
    }
    handleBookOrder=()=>{
        this.setState({
            bookOrder : 'order',
            getOrder:""
        })
        // this.props.bookOrder(this.state.bookingOrder);
    }
    
   componentWillMount=()=>{
    let token = localStorage.getItem('token');

    if(token){
        console.log('no of times call');
        this.setState({ isLoggedIn : true});
    }
    let result = axios.get('http://localhost:8080/authenticate',{ headers:{ 'x-access-token': token}});
    result.
        then((res)=>{
            console.log(res);
        })
        .catch((err)=>{ console.log(err)})
   }
    
    render()
    {
        if(this.state.isLoggedIn === false){
            return <Redirect to="/signin"/>
        }
        return(
        <div>
           <Jumbotron>
                <h1>Hello,{this.props.userName}. <br/>Welcome To Express Loundry</h1>
                <p>
                   <quote left="true"/> "Express Loundry are here To get take care of your cloth"  <quote right="true"/>
                </p>
                
                <div className='contactDetails'>
                     <h2>Contact Details</h2><hr/>
                    <h5>Email Id : {this.props.email}</h5>
                    <span className="textTransform">
                         <h5>Mobile No : {this.props.mobile}</h5>
                            <h5>City : {this.props.city}</h5>
                            <h5>Address : {this.props.address}</h5>
                    </span>
                </div>                
                    <button className='fetchButton' onClick={(e)=>{this.handleGetOrder(e.target)}}>Fetch Your Orders</button>&nbsp;&nbsp;
                    <button className='fetchButton' onClick={(e)=>{this.handleBookOrder(e.targetKey)}}>Book Your Loundry</button>&nbsp;&nbsp;                
                                 
            </Jumbotron>
            <div>
                { this.state.getOrder && <GetOrderByUserId/>}
                { this.state.bookOrder && <BookOrder/>}

            </div>
        </div>);
    }
}
const mapStateToProps = (state)=>{
 
    return{
        
        id:state.loginReducer.loginUser.id,
        userName : state.loginReducer.loginUser.fullName,
        email : state.loginReducer.loginUser.email,
        mobile : state.loginReducer.loginUser.mobile,
        address : state.loginReducer.loginUser.address,
        city : state.loginReducer.loginUser.city,
        order: state.orderReducer.order,

        name : state.orderReducer.orderName,

        washAction : state.orderReducer.washAction,
        timeSlot : state.orderReducer.timeSloat,

        userSelectedActionType : state.orderReducer.userSelectedActionType,
        userSelectedTimeSloat : state.orderReducer.userSelectedTimeSloat,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getOrder: (id)=>dispatch(getOrder(id)),
        bookOrder:  (id)=>dispatch(bookOrder(id)),
        selectDate : (date)=>dispatch(selectDate(date)),
        timeSloat : (time)=>dispatch(timeSloat(time)),
        action : (actionType)=>dispatch(action(actionType)),
        addCloth : (product,action)=>dispatch(addCloth(product,action))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);