import React from 'react';
import { Nav, Navbar,Badge,NavDropdown} from 'react-bootstrap';
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
             <Navbar bg="primary" variant="dark" sticky='top' >
               <Link to="/"><Navbar.Brand a href="/">LOUNDRY</Navbar.Brand></Link> 
                <Nav className="mr-auto navlink">
                <Link to="/home"> <Nav.Link a href="/home">Home</Nav.Link></Link> 
                <Link to="/Services"><Nav.Link a href="/services">Services</Nav.Link></Link> 
                <Link to="/profile"><Nav.Link a href="/profile">Profile</Nav.Link></Link> 
                 
                </Nav>
                <Nav className="">
                <Link to="/booking"> <Nav.Link a href="/booking">
                <Icon className="large shopping cart"/>   
                <Badge variant="warning">
                   { 
                    this.props.items && this.props.items.length
                   }
                </Badge>
                </Nav.Link>
                </Link> 
                {/* <Link to="/dashboard"><Nav.Link a href="/dashboard" >Dashboard</Nav.Link></Link>  */}
                <NavDropdown title="Account" bg="info" id="basic-nav-dropdown">
                   {this.props.isLoggedIn ? ( <><NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                     <NavDropdown.Item href="/logout">Logout</NavDropdown.Item></>) :<><NavDropdown.Item href="/signin">Login</NavDropdown.Item>
                      <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item></> }
                   
              </NavDropdown>
              </Nav>              
            </Navbar>
           </div>
        );
    }
}
const mapStateToProps = (state) =>{
    
    return{
       items : state.orderReducer.items,
       isLoggedIn : state.loginReducer.isLoggedIn
    }
}
export default connect(mapStateToProps)(Navigationbar);

 