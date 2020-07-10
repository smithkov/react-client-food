import React, { Component, Fragment } from "react";
import SideMenu from "./common/sideMenu";
import { Col, Container, Row } from "reactstrap";
import Nav from "./common/nav";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Grid,
  Image,
  Message,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { MISSING_USER_MSG, ERROR_MSG, formatPrice } from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {},
      hasData: false,
      isSeller: false,
      items: [],
    };
  }

  componentDidMount = async () => {
    this.props.fetchUser();
    const orderId = this.props.match.params.id;
    const order = await clientService.transactionById(orderId);
    console.log(order);

    this.setState({
      order: order.data.data,
      items: order.data.data.soldProducts,
    });
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const { user } = nextProps;
      if (user.role == "Customer") {
      } else {
        this.setState({ isSeller: true });
      }
    }
  };
  print = (e) => {
    window.print();
  };
  render() {
    const { order, items } = this.state;
    return (
      <Fragment>
        <Container fluid={true}>
          <Row className="dash-layout">
            <Col lg="2"></Col>

            <Col
              style={{
                backgroundColor: "white",
                padding: 20,
                marginTop: 40,
                marginBottom: 20,
              }}
              lg="8"
            >
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Image src="/images/logo2.png" />
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <h1>Receipt</h1>
                </Grid.Column>
              </Grid>
              <hr />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <strong>Date:</strong>
                  <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <strong>Ref No: </strong>
                  {order.refNo}
                </Grid.Column>
              </Grid>
              <hr></hr>
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <h4>Delivery Address</h4>
                  {order.User ? order.User.firstAddress : ""}
                  <br />
                  <br />
                  {order.User ? order.User.postCode : ""}
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <h4>Seller's Details</h4>
                  {order.VirtualShop ? order.VirtualShop.shopName : ""}
                  <br />
                  <br />
                  {order.VirtualShop ? order.VirtualShop.firstAddress : ""}
                  <br />
                  <br />
                  {order.VirtualShop ? order.VirtualShop.postCode : ""}
                  <br />
                  <br />
                </Grid.Column>
              </Grid>
              <div style={{ padding: 50 }}>
                {order.message ? (
                  <Message
                    info
                    icon="envelope open outline"
                    header="Delivery Message"
                    content={order.message}
                  />
                ) : (
                  ""
                )}

                <Table singleLine stackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                      <Table.HeaderCell>price</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {items.map((item) => {
                      return (
                        <Table.Row>
                          <Table.Cell>{item.quantity}</Table.Cell>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{formatPrice(item.total)}</Table.Cell>
                          <Table.Cell>{item.price}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>
                        <h4>Subtotal: </h4>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {formatPrice(order.subTotal)}
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell>
                        <h4>Total: </h4>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {formatPrice(order.total)}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
                <p style={{ textAlign: "center" }}>
                  <strong>NOTE </strong>: This is computer generated receipt and
                  does not require physical signature.
                </p>
                <hr></hr>
                <Button onClick={this.print}>
                  Print <Icon name="print" />
                </Button>
              </div>
            </Col>
            <Col lg="2"></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
OrderDetail.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(OrderDetail);
