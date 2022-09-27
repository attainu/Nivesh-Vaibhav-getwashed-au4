import React from "react";
import { connect } from "react-redux";
import { Icon, Table } from "semantic-ui-react";
const axios = require("axios");
class GetOrderByUserId extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      message: "",
    };
  }
  componentDidMount = () => {
    let order = axios.get(`/order/user/${this.props.userId}`);
    order
      .then((response) => {
       // alert("from Axios call", response.data, response.data.length);
        let length = response.data.length;
        if (length >= 1) {
          console.log("if len gretter ");
          this.setState({
            orders: response.data,
          });
        } else {
          console.log("if len less than 0 ");
          this.setState({
            message: "You Don't Have Any Order",
          });
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };
  render() {
    return (
      <div className="row">
        <div className="col-xl-12 col-sm-12 col-md-12 col border border-dark">
          {this.state.message && (
            <h2 className="border m-2 p-2 bg-light ">{this.state.message}</h2>
          )}
          {this.state.orders.length > 1 && (
            <h1 className=" border m-2 p-2 bg-light">Your Orders</h1>
          )}
          {this.state.orders.map((item, index) => {
            return (
              <div key={index} className="mt-3">
                <div className="orderHeader">
                  <div>
                    <span>Order Placed at</span>
                    <br />
                    <span>
                      {" "}
                      <strong> {item.order_date}</strong>
                    </span>
                  </div>
                  <div>
                    <span>Order Picked At</span>
                    <br />
                    <span>
                      {" "}
                      <strong>{item.order_collection_time}</strong>{" "}
                    </span>
                  </div>
                  <div>
                    <span>Order Status</span>
                    <br />
                    <span>
                      {" "}
                      <strong>{item.order_status}</strong>{" "}
                    </span>
                  </div>
                  <div>
                    <span>Total Amount</span>
                    <br />
                    <span>
                      {" "}
                      <Icon name="rupee" />
                      <strong>{item.order_totalprice}</strong>
                    </span>
                  </div>
                  <div>
                    <span>Order Id</span>
                    <br />
                    <span>
                      <strong>#{item.id}</strong>
                    </span>
                  </div>
                </div>
                <div>
                  <Table striped>
                    <Table.Header key={index}>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {item.order_items.map((cloth, index) => {
                      return (
                        <Table.Body key={index}>
                          <Table.Row>
                            <Table.Cell>{cloth.cloth_name} </Table.Cell>
                            <Table.Cell>{cloth.cloth_quantity}</Table.Cell>
                            <Table.Cell>{cloth.price}</Table.Cell>
                            <Table.Cell>{cloth.total}</Table.Cell>
                            <Table.Cell>{cloth.action}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      );
                    })}
                  </Table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.loginReducer.loginUser.id,
  };
};
const mapDispatchToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(GetOrderByUserId);
