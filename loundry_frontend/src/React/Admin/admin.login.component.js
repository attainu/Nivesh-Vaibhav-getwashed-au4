import { React  } from "react";
import { connect } from "react-redux";
class AdminLogin{
    constructor(props){
        super();
        this.state={
            username="",
            password = ""
        }
    }
    componentWillMount()
    {

    }
    componentDidMount()
    {

    }
    handleChange(){
        
    }
    render(){
        <div>
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
        </div>
    }
    mapStateToProps(state){
        return{

        }
    }
    mapStateToDispatch(dispatch){
        return{

        }
    }
}
export default connect(mapStateToProps,mapStateToDispatch)(AdminLogin);
