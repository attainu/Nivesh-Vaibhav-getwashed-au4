import React from 'react';
import { connect } from 'react-redux';
import { Link ,Redirect } from 'react-router-dom';
class Logout extends React.Component
{
    constructor(props){
        super(props);
       
        localStorage.removeItem('token');
       
        this.state={
           
        }
    }
    render(){
       
        return(<div>
            <h1> You Are Logout</h1>
            <button className="fetchButton"><Link to="/signin">SIGNIN</Link></button>
        </div>);
    }

}
const mapStateToProps=(state)=>{
    return{

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Logout);