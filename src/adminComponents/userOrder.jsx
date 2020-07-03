import React, { Component, Fragment } from "react";
import SideMenu from "./common/sideMenu";
import { Col, Container, Row } from "reactstrap";
import Nav from "./common/nav";
import { Button, Checkbox, Icon, Table, Accordion } from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { MISSING_USER_MSG, ERROR_MSG, formatPrice } from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

class UserOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      hasData: false,
      activeIndex: 1,
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
      const result = await clientService.transactionByUser({
        userId: nextProps.user.id,
      });
      this.setState({ orders: result.data.data });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const { activeIndex } = this.state;
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
              <Accordion styled>
                {this.state.orders.map((order) => {
                  indexCounter++;

                  return (
                    <div>
                      <Accordion.Title
                        active={indexCounter==1? activeIndex === 1:""}
                        index={indexCounter}
                        onClick={this.handleClick}
                      >
                        <Icon name="dropdown" />
                        Order Ref: {order.refNo}{" "}
                        <span className="pull-right">
                          Date :
                          <Moment format="DD/MM/YYYY">{order.createdAt}</Moment>{" "}
                        </span>
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === indexCounter}>
                        <Table singleLine>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Quantity</Table.HeaderCell>
                              <Table.HeaderCell>Name</Table.HeaderCell>
                              <Table.HeaderCell>Price</Table.HeaderCell>
                              <Table.HeaderCell>Total</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {order.soldProducts.map((item) => {
                              return (
                                <Table.Row>
                                  <Table.Cell>{item.quantity}</Table.Cell>
                              <Table.Cell>{item.name}</Table.Cell>
                              <Table.Cell>{formatPrice(item.price) }</Table.Cell>
                              <Table.Cell>{formatPrice(item.total)}</Table.Cell>
                                </Table.Row>
                              );
                            })}
                          </Table.Body>
                        </Table>
                      </Accordion.Content>
                    </div>
                  );
                })}
              </Accordion>
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
