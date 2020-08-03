import React from 'react';
const axios = require('axios');
export default class WashCloth extends React.Component
{
    constructor(){
        this.state = {
            washCloth : []
        }
    }
    componentDidMount=()=>{
        const result = axios.post('http://localhost:8080/wash/read');
        result
            .then((response)=>{ this.setState({washCloth: response.data})})
                .catch((error)=>{ console.log(error)})
    }
    render(){
        return(
            
                this.state.washCloth.map((cloth,index)=>{                              
                                return(
                                    <div className="cloth_item  col col-sm-2 border m-2 mx-auto rounded shadow p-2" key={index}>

                                        Name : {cloth.cloth_name}<br/>
                                        Cost : {cloth.price}<br/>
                                        Quantity : {cloth.cloth_quantity}<br/>                               
                                        <button  className="fetchButton" onClick={ (event) => { this.addQuantity(index,this.props.userSelectedActionType)}}>+</button>&nbsp;
                                        <button  className="fetchButton" onClick={ (event) => { this.removeQuantity(index,this.props.userSelectedActionType)}}>-</button>&nbsp;
                                        <button className="fetchButton" onClick={ (event)=>{this.handleCloth(index,this.props.userSelectedActionType)}} >Add</button>                              
                                     </div>                     
                              )}) 
                
            
        )
    }
}

