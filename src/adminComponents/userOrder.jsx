import React, { Component, Fragment } from "react";
import SideMenu from "./common/sideMenu";
import { Col, Container, Row } from "reactstrap";
import Nav from "./common/nav";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Accordion,
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
import moment from "moment";

class UserOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      hasData: false,
      activeIndex: 1,
      isSeller: false,
    };
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  componentDidMount = async () => {
    this.props.fetchUser();
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const { user } = nextProps;
     
      if (user.role == "Customer") {
        const result = await clientService.transactionByUser({
          userId: user.id,
        });
        this.setState({ orders: result.data.data });
        
      } else {
        const result = await clientService.transactionByShop({
          shopId: user.shopId,
        });
        this.setState({ orders: result.data.data, isSeller: true });
        
      }
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const { activeIndex, orders, isSeller } = this.state;
    let indexCounter = 0;
    
    return (
      <Fragment>
        <Container fluid={true}>
          <Nav />
          <AfterNav form={"Order List"} />
          <hr></hr>
          <Row className="dash-layout">
            <Col lg="2">
              <SideMenu />
            </Col>

            <Col lg="1"></Col>

            <Col className="dashboard-panel" lg="6">
              {orders == null || orders.length == 0 ? (
                <Message style={{ textAlign: "center" }} floating>
                  <Message.Header>You currently have no orders.</Message.Header>
                </Message>
              ) : (
                <Table color="red" >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Ref. No</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Total Items</Table.HeaderCell>
                      <Table.HeaderCell>Grand Total</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  {orders.map((order) => {
                    return (<Table.Body>
                      <Table.Row>
                        <Table.Cell>{order.refNo}</Table.Cell>
                        <Table.Cell>
                          {" "}
                          <Moment format="DD/MM/YYYY">{order.createdAt}</Moment> {moment(order.createdAt).format("LT")}
                        </Table.Cell>
                        <Table.Cell>{order.soldProducts.length}</Table.Cell>
                        <Table.Cell>{formatPrice(order.total)}</Table.Cell>
                        <Table.Cell><a target="_blank" href={`/user/order/${order.id}`}><Icon color="red" name="external alternate"/></a></Table.Cell>
                      </Table.Row>
                     
                    </Table.Body>);
                  })}
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
UserOrder.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(UserOrder);
