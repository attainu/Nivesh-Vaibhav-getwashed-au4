import React from 'react';
import { connect } from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import Booking from './bookOrder';
import { Card,Icon,Image } from 'semantic-ui-react';
import {addItemQuantity,removeItemQuantity,removeItem} from '../Redux/action/bookOrder'
import ChangeAddress from './changeAddress';
class BookingCart extends React.Component
{
    constructor(props){
        super();
        let isLoggedIn = false;
        let token = localStorage.getItem('token');
        if(token){
            isLoggedIn = true
        }
        this.state={
            procedeToOrder : "",
            isLoggedIn
        }
    }
    procedeOrder(){
        this.setState({
            procedeToOrder : 'order'
        })
    }
    handleAddQuantity=(index)=>{
        this.props.addItemQuantity(index);
    }
    handleRemoveQuantity=(index)=>{
        this.props.removeItemQuantity(index);
    }
    handleRemoveItem=(index)=>{
        this.props.removeItem(index);
    }
    render(){
        if(!this.state.isLoggedIn){
           return <Redirect to="/signin"/> 
        }
        return(<div className='parent'>
            <div className='parent'>
            <div className='row border-black'>
            {    this.props.items && this.props.items.map((item,index)=>{
                  return(
                        <Card className='col-lg-3 col-md-3 col-sm-3 col m-2' key={index}>
                         <Card.Content >
                        <Card.Header className='clothName'>{item.cloth_name}</Card.Header><hr/>
                        <Card.Meta className='amount'>
                         <span className=''>Total Amount : </span>
                            <span className='bold float-right'><Icon name='rupee' />{item.total}</span>
                        </Card.Meta>
                        <Card.Description>
                          <strong> {item.cloth_quantity} Piece</strong> Of {item.cloth_name} Is Order For <strong>{item.action}</strong>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <button  className="fetchButton" onClick={ (event) => { this.handleAddQuantity(index)}}>+</button>&nbsp;
                                            <button  className="fetchButton" onClick={ (event) => { this.handleRemoveQuantity(index)}}>-</button>&nbsp;
                                            <button className="fetchButton" onClick={ (event)=>{this.handleRemoveItem(index)}} >Remove</button>
                        </Card.Content>
                    </Card>
                  )  
                })}
            </div>
            {this.props.items.length >=1 && (<div>
                <Link to='/address' href='/address'> <button className='fetchButton float-left m-2 border rounded' onClick={(event)=>{this.procedeOrder()}}>Proced To Order</button></Link>
            <div className="totalContainer border rounded m-2 p-2 float-right">Total Amount : <Icon name='rupee' /> {this.props.totalCost}</div>
            </div>)}
            </div>
            <div>
                {this.state.procedeToOrder }
            </div>
            <Booking/>
           
        </div>)
    }
}
const mapStateToProps=(state)=>
{
    console.log("from item",state.orderReducer.items);
    return{
        items : state.orderReducer.items,
        totalCost : state.orderReducer.totalCost,
        fullName : state.loginReducer.loginUser.fullName,
        address : state.loginReducer.loginUser.address,
        mobile : state.loginReducer.loginUser.mobile,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addItemQuantity : (index)=>dispatch(addItemQuantity(index)),
        removeItemQuantity : (index)=>dispatch(removeItemQuantity(index)),
        removeItem : (index)=>dispatch(removeItem(index))
    }
   }
export default connect(mapStateToProps,mapDispatchToProps)(BookingCart);