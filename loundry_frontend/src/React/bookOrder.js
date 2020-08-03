import React from 'react';
import { connect } from "react-redux";
import {Card,Icon } from 'semantic-ui-react';
import { Jumbotron, Button} from "react-bootstrap";
import getOrder from "../Redux/action/getOrder";
import {bookOrder,selectDate,action,timeSloat,addCloth} from "../Redux/action/bookOrder";
const axios = require('axios');

class BookOrder extends React.Component
{
    constructor()
    {   
        super();
        this.state={
            washCloth:[],
            ironCloth:[],
            dryCleanCloth:[]
        }

    }
    componentDidMount=()=>{
        // for get data from iron wash
        const action = axios.get('http://localhost:8080/iron/read')
            action
                .then((response)=>{
                console.log(response.data);
                this.setState({
                    ironCloth: response.data
                })
            })
            .catch((error)=>{ console.log(error)});

        //  for get data from dry clean
        const dryClean = axios.get('http://localhost:8080/dryclean/read')
        dryClean
            .then((response)=>{
            console.log(response.data);
            this.setState({
                dryCleanCloth: response.data
            })
        })
        .catch((error)=>{ console.log(error)});

        // for get data from wash
        const wash = axios.get('http://localhost:8080/wash/read')
        wash
            .then((response)=>{
            console.log(response.data);
            this.setState({
                washCloth: response.data
            })
        })
        .catch((error)=>{ console.log(error)});

    }
    handleDate=(date)=>{
        this.props.selectDate(date);
    }
    handleTime=(time)=>{
        this.props.timeSloat(time);
    }
    handleAction=(actionType)=>{
        this.props.action(actionType);
    }
    handleCloth=(index,action)=>{
        // console.log(index);
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        switch (action) {
            case 'Wash':
                    this.props.addCloth(stateCopy.washCloth[index],action);
                break;
            case 'Iron':
                    this.props.addCloth(stateCopy.ironCloth[index],action);
                break;
            
            case 'Dry Clean':
                    this.props.addCloth(stateCopy.dryCleanCloth[index],action);
                break;    
            default:
                break;
        }
        //console.log(washClothCopy[index]);
        //this.props.addCloth(washClothCopy[index],action);
    }
    addQuantity(index,action)
    {
    
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        switch (action) {
            case 'Wash':
                console.log('inside wash')  
                    stateCopy.washCloth[index].cloth_quantity++;
                   this.setState({
                       washCloth : stateCopy.washCloth
                   })
                break;
            case 'Iron':
                    stateCopy.ironCloth[index].cloth_quantity++;
                   this.setState({
                       ironCloth : stateCopy.ironCloth
                   })
                break;
            
            case 'Dry Clean':
                    stateCopy.dryCleanCloth[index].cloth_quantity++;
                   this.setState({
                       dryCleanCloth : stateCopy.dryCleanCloth
                   })
                break;
            default:
                break;
        }
        
    }
    removeQuantity(index,action){
     let washClothCopy = JSON.parse(JSON.stringify(this.state.washCloth));
     
         let stateCopy = JSON.parse(JSON.stringify(this.state));
         switch (action) {
             case 'Wash':
                 console.log('inside wash')  
                     
                     if(stateCopy.washCloth[index].cloth_quantity > 1)
                        stateCopy.washCloth[index].cloth_quantity--;
                    else
                        alert('You have To select one item for order');
                    this.setState({
                        washCloth : stateCopy.washCloth
                    })
                 break;
             case 'Iron':
                    if(stateCopy.ironCloth[index].cloth_quantity > 1)
                    stateCopy.ironCloth[index].cloth_quantity--;
                    else
                        alert('You have To select one item for order');
                    this.setState({
                        ironCloth : stateCopy.ironCloth
                    })
                 break;
             
             case 'Dry Clean':
                    if(stateCopy.dryCleanCloth[index].cloth_quantity > 1)
                    stateCopy.dryCleanCloth[index].cloth_quantity--;
                    else
                        alert('You have To select one item for order');
                  
                    this.setState({
                        dryCleanCloth : stateCopy.dryCleanCloth
                    })
                 break;
             default:
                 break;
         }
         
    }
    handleOrder=()=>{
        console.log(this.props.id);
        this.props.bookOrder(this.props.id);
    }
    render()
    {
       return( <div>
            <div className="makeOrder col-lg-12 col-sm-12 col-md-12 col  mx-auto border border-dark rounded p-2 mt-3">
                <h1 className="text-center border rounded p-2 m-2">Make Your Order</h1>
                <div className='flexWrapper selectbox  border rounded mt-3 pt-3'>
                    <div className="form-group">
                        <input className='form-control' type="date" name="date" placeholder="Order Pickup Date" onChange={(event)=>{this.handleDate(event.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <select placeholder='Select Action' className='form-control' onChange={(event) =>{ this.handleTime(event.target.value)}}>
                        <option defaultValue>Select Time Slot</option>
                        {
                        this.props.timeSlot && this.props.timeSlot.map((time,index) => { 
                            return  <option value={time} key={index}>{time}</option>
                        })
                    } 
                    </select>
                    </div>
                    <div className="form-group">
                        <select placeholder='Select Action' className='form-control' onChange={(event) =>{ this.handleAction(event.target.value)}}>
                        <option defaultValue>Select Wash Type</option>
                        {
                        this.props.washAction && this.props.washAction.map((action,index) => { 
                            return  <option value={action} key={index}>{action}</option>
                        })
                    } 
                    </select>
                    </div>
                </div> 
                <div className="row clothlist mt-2">
                    {(this.props.userSelectedActionType === "Wash") && 
                    
                    (   
                        this.state.washCloth.map((cloth,index)=>{                              
                            return(
                                <div className="cloth_item  col col-sm-2 border m-2 mx-auto rounded shadow p-2" key={index}>
                                    <Card key={index}>
                                       
                                        <Card.Content>
                                        <Card.Header>{cloth.cloth_name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'> <Icon name='rupee' />{cloth.price}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                             Quantity :  {cloth.cloth_quantity}
                                        </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <button  className="fetchButton" onClick={ (event) => { this.addQuantity(index,this.props.userSelectedActionType)}}>+</button>&nbsp;
                                            <button  className="fetchButton" onClick={ (event) => { this.removeQuantity(index,this.props.userSelectedActionType)}}>-</button>&nbsp;
                                            <button className="fetchButton" onClick={ (event)=>{this.handleCloth(index,this.props.userSelectedActionType)}} >Add</button>                                                              
                                        </Card.Content>
                                    </Card>
                                                            
                                    
                                </div>                     
                        )})
                    )}
                                    
                </div>
                {/* // code for Dry Clean cloth */}

                <div className="row clothlist mt-2">
                    {(this.props.userSelectedActionType === "Dry Clean") && 
                    
                    (this.state.dryCleanCloth.map((cloth,index)=>{
                        
                            return(
                            
                                <div className="cloth_item  col col-sm-2 border m-2 mx-auto rounded shadow p-2" key={index}>
                                    <Card>
                                        
                                        <Card.Content>
                                        <Card.Header>{cloth.cloth_name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'> <Icon name='rupee' />{cloth.price}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                             Quantity :  {cloth.cloth_quantity}
                                        </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <button  className="fetchButton" onClick={ (event) => { this.addQuantity(index,this.props.userSelectedActionType)}}>+</button>&nbsp;
                                            <button  className="fetchButton" onClick={ (event) => { this.removeQuantity(index,this.props.userSelectedActionType)}}>-</button>&nbsp;
                                            <button className="fetchButton" onClick={ (event)=>{this.handleCloth(index,this.props.userSelectedActionType)}} >Add</button>                                                              
                                        </Card.Content>
                                    </Card>
                                                            
                                    
                                </div>
                    )}) )}
                        
                </div>

                {/* code For Iron */}
                <div className="row mt-2">
                    {(this.props.userSelectedActionType === "Iron") && 
                    
                    (this.state.ironCloth.map((cloth,index)=>{                              
                            return(                              
                               <div className=''>
                                    <div className="cloth_item border m-2 rounded shadow p-2" key={index}>
                                    <Card.Group >
                                    <Card>  
                                        <Card.Content>
                                        <Card.Header>{cloth.cloth_name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'> <Icon name='rupee' />{cloth.price}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                             Quantity :  {cloth.cloth_quantity}
                                        </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <button  className="fetchButton" onClick={ (event) => { this.addQuantity(index,this.props.userSelectedActionType)}}>+</button>&nbsp;
                                            <button  className="fetchButton" onClick={ (event) => { this.removeQuantity(index,this.props.userSelectedActionType)}}>-</button>&nbsp;
                                            <button className="fetchButton" onClick={ (event)=>{this.handleCloth(index,this.props.userSelectedActionType)}} >Add</button>                                                              
                                        </Card.Content>
                                    </Card>
                                    </Card.Group>
                                </div>
                               </div> 
                            )}))
                    }
                </div>
                { this.props.userSelectedActionType && 
                        <div>
                            <button className='fetchButton mt-2'  onClick={ (event)=>{ this.handleOrder(event.target)}}>Book Order</button>
                    </div>}        
                </div> 
        </div>)
    }
    
}
const mapStateToProps = (state)=>{
        
    return{
        id:state.loginReducer.loginUser.id,
        washAction : state.orderReducer.washAction,
        timeSlot : state.orderReducer.timeSloat,

        userSelectedActionType : state.orderReducer.userSelectedActionType,
        userSelectedTimeSloat : state.orderReducer.userSelectedTimeSloat,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{

       
        bookOrder:  (id)=>dispatch(bookOrder(id)),
        selectDate : (date)=>dispatch(selectDate(date)),
        timeSloat : (time)=>dispatch(timeSloat(time)),
        action : (actionType)=>dispatch(action(actionType)),
        addCloth : (product,action)=>dispatch(addCloth(product,action))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookOrder);