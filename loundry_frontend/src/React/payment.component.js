import React from 'react';
import { connect } from 'react-redux';
import {selectedPaymentMode} from '../Redux/action/bookOrder';

class Payment extends React.Component
{
    constructor(){
        super();
        this.state={
            PaymentMode : '',
        };
    }
    handlePaymentMode=(mode)=>{
       
        // this.setState({PaymentMode : mode});
        this.props.selectedPaymentMode(mode);
    }
    render(){
        return(
        <div className="row">
            <div className="col-sm-8 col-lg-8 col-md-8 col-xs-8 col rounded border p-3 mt-3">
                <h3> Payment Mode</h3><hr/>
                <div className="form-group">
                        <select  className='form-control' onChange={(event) =>{ this.handlePaymentMode(event.target.value)}}>
                        <option defaultValue>Select Payment Mode</option>
                        {
                            this.props.selectPaymentMode && this.props.selectPaymentMode.map((mode,index)=>{ 
                                return  <option value={mode} key={index}>{mode}</option>
                            })
                        } 
                        </select>
               </div>
            </div>
         </div>
    )
        
    }
}
const mapStateToProps=(state)=>{
    console.log(state.orderReducer.paymentMode);
        return{
        selectPaymentMode : state.orderReducer.paymentMode,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        selectedPaymentMode : (mode)=>dispatch(selectedPaymentMode(mode)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment);
