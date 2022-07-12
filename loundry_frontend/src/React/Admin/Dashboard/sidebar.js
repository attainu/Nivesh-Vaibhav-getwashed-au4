import React from 'react';
import {connect} from 'react-redux';
import './sidebar.css';

import SidebarNavLinks from './SidebarNavLinks';
import { Icon } from 'semantic-ui-react';
class sidebar extends React.Component{
    constructor(){
        super();
        this.state={
            userName:"Vaibhav Deshmukh"
        }
    }
   
  render(){
    return(
        <div className='sidebar'>
            <div className='sidebar__top'>
                <h4 className=''>Welcome</h4>
                <span>{this.state.userName}</span>
            </div><hr/>

            <div className='sidebar__navlinks'>
                <SidebarNavLinks icon={<Icon className='user'/>} linkName='Profile'/>
                <SidebarNavLinks icon={<Icon className='shopping basket'/>} linkName='Last Orders'/>
                <SidebarNavLinks icon={<Icon className='cart plus'/>}  linkName='Make Order'/>
            </div>
        </div>
        )
  }
}
const mapStateToProps = (state)=>{
 
    return{
        userName : state.loginReducer.loginUser.fullName,
    }
}
const mapDispatchToProps=()=>{
    return(<></>);

}
export default connect(mapStateToProps,mapDispatchToProps)(sidebar); 