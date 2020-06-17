import React from 'react';
import { Nav, Navbar,Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import ls from 'local-storage';
class Navigationbar extends React.Component
{
  constructor(){
    super();
    this.state={
      items :[]
    }
  }
  async componentDidMount(){
    let items = await ls.get('BookingCart');
    console.log(items);
    this.setState({
      items
    })
  }
    render()
    {
        return(
           <div>
             <Navbar bg="primary" variant="dark" sticky='top'>
               <Link to="/"><Navbar.Brand a href="/">LOUNDRY</Navbar.Brand></Link> 
                <Nav className="mr-auto">
                <Link to="/home"> <Nav.Link a href="/home">HOME</Nav.Link></Link> 
                <Link to="/Services"><Nav.Link a href="/services">Services</Nav.Link></Link> 
                <Link to="/profile"><Nav.Link a href="/profile">Profile</Nav.Link></Link> 
                 
                </Nav>
                <Nav className="">
                <Link to="/booking"> <Nav.Link a href="/booking">
                <Icon className="large shopping cart"/>   
                <Badge variant="warning">
                   { 
                    this.props.items 
                   }
                </Badge>
                </Nav.Link>
                </Link> 
                <Link to="/dashboard"><Nav.Link a href="/dashboard" >Dashboard</Nav.Link></Link> 
                <Link to="/signin"><Nav.Link a href="/signin" >SignIn</Nav.Link></Link> 
                <Link to="/signup"><Nav.Link a href="/signup">SignUp</Nav.Link></Link> 
                <Link to="/logout"><Nav.Link a href="/logout">LogOut</Nav.Link></Link> 
                </Nav>
               
            </Navbar>
           </div>
        );
    }
}
const mapStateToProps = (state) =>{
    
    return{
       items : state.orderReducer.items.length
    }
}
export default connect(mapStateToProps)(Navigationbar);

 