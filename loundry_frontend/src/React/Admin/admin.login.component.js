import React,{ Component  } from "react";
import { connect } from "react-redux";
import { Form,Button } from "react-bootstrap";
import { makeAdminLogin } from "../../Redux/action/makeAdminLogin";
class AdminLogin extends Component{
    constructor(){
        super();
        this.state={
          email :'',
          password:'',
          isError:''
        }
    }
    componentWillMount()
    {

    }
    componentDidMount()
    {

    }
    handleChange=(e)=> {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;

      this.setState({
        [name] : value
      });
      
  }
    handleError(error){
      this.setState({
        isError : error
      })
    }
    handleSubmit=(e)=>{
      e.preventDefault();

      if(this.state.email === ""){
        this.handleError("Please Enter Email");
      }
      if(! this.isEmail(this.state.email)){
        this.handleError("Please Enter Valid  Email Address");
      }
      if(this.state.password === ""){
        this.handleError("Enter Your Password");
      }
        let { isError,...state } = this.state;       
        this.props.makeAdminLogin(state);

    }
    isEmail=(email)=>{
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }
    render(){
      return (
        <div className="signinForm col-md-5 border-dark shadow rounded mx-auto mt-5 p-3 bg-light">
            <h1 className="mx-auto text-center">Login</h1> <hr/>

                  <form onSubmit={this.handleSubmit}>
                  {(this.state.isError || this.props.message) && (<div className='border rounded bg-warning p-2 text-center text-white'>{ this.props.message || this.state.isError}<br/></div>)}
                  <Form.Group controlId="formBasicEmail" >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name ="email" placeholder="Enter email" onChange={this.handleChange}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>

          </form>
          </div>
        );
      
    }
}
const mapStateToProps=(state)=>{
  return{

  }
}
const mapStateToDispatch=(dispatch)=>{
  return{
    makeAdminLogin : (state)=>dispatch(makeAdminLogin(state))
  }
}
export default connect(mapStateToProps,mapStateToDispatch)(AdminLogin);
