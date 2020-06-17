import React from 'react';
import { connect } from 'react-redux';
import { Form,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {selectSameAddress,selectNewAddress,bookOrder} from '../Redux/action/bookOrder';
import Payment from './payment.component';

class ChangeAddress extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            ChangeAddress : false,
            Address : "",
        }
    }
    handleEditAddress=()=>{
        this.setState({ChangeAddress : true});
    }
    handleChangeAddress=(event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name] : value})
    }
    handleNOChangeAddress=(address)=>{
       
        this.props.selectSameAddress(address);
    }
    handleSubmitAddress=(address)=>{
       
        this.props.selectNewAddress(address)
    }
    handleOrder=(id)=>{
        this.props.bookOrder(id)
    }

    render()
    {
        return(
            <div>
            <div className='row '>
               <div className='col-xl-8 col-md-8 col-sm-8  border rounded  p-3 mt-3 '>
               <h3>Your Current Address is : <br/><hr/></h3>
                <span className='address'>{this.props.address}</span><br/>
               <Button className='fetchButton' onClick={(event)=>{this.handleNOChangeAddress(this.props.address)}}>Same Address</Button>&nbsp;&nbsp;
                <Button className='fetchButton' onClick={(event)=>{this.handleEditAddress()}}>Edit</Button>
               { this.state.ChangeAddress && ( <div className='change_address m-3'>
                    <h2>New Address</h2><hr/>
                        <Form.Group controlId="formBasicName" >
                        <Form.Label><h4>Address</h4></Form.Label><br/>
                        <textarea col='10' row='20' name='address' onChange={ (event)=>{this.handleChangeAddress(event)}}></textarea>
                        </Form.Group>
                        <button className='fetchButton' onClick={(event)=>{ this.handleSubmitAddress(this.state.address)}}>Save</button>
                </div>) }
               
               </div>
              
            </div>
            <div>
                 <Payment/>
            </div>
            <div className='row mt-2'>
            <button className='fetchButton p-2'onClick={(event)=>{this.handleOrder(this.props.userId)}}><Link to='' href=''>Book Order</Link></button>
            </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        address : state.loginReducer.loginUser.address,
        userId : state.loginReducer.loginUser.id
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        selectSameAddress : (address)=>dispatch(selectSameAddress(address)),
        selectNewAddress : (address)=>dispatch(selectNewAddress(address)),
        bookOrder : (id)=>dispatch(bookOrder(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangeAddress);
 