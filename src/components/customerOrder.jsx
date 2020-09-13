import React, { Component } from "react";
import Listing from "./widgets/Listing";
import SideMenu from "../adminComponents/common/sideMenu";
import StoreCard from "./widgets/storeCard";
import ProductCard from "./widgets/ItemCard";
import clientService from "../services/clientService";
import NavBar from "./NavBarCustomerDash";
import Footer from "./Footer";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DEFAULT_STORE_BANNER,
  DEFAULT_STORE_LOGO,
  totalRating,
  displayRating,
  SERVER_URL,
  ENDPOINT,
  formatPrice,
  storeNextOpening,
} from "../utility/global";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Grid,
  Image,
  Item,
  Label,
  Header,
  Rating,
  Select,
  Input,
  Card,
  List,
  Search,
  Table,
  Segment,
  Loader,
  Dimmer,
  Container,
  Message,
} from "semantic-ui-react";
import Moment from "react-moment";
import moment from "moment";
const imageUrl = `${ENDPOINT}uploads`;
class CustomerOrder extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    orders: [],
    hasData: false,
    activeIndex: 1,
  };

  componentDidMount = async () => {
    this.props.fetchUser();
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const { user } = nextProps;

      const result = await clientService.transactionByUser({
        userId: user.id,
      });
      this.setState({ orders: result.data.data });
    }
  };

  render() {
    const { activeIndex, orders, isSeller } = this.state;
    let indexCounter = 0;
    return (
      <>
        <Container>
          <NavBar caption={`My Orders`} />

          <Grid style={{ paddingTop: 100 }} stackable>
            <Grid.Column width={4}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              {orders == null || orders.length == 0 ? (
                <Message style={{textAlign:"center"}} floating>You have made no orders yet.</Message>
              ) : (
                <Table color="red">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Ref. No</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Total Items</Table.HeaderCell>
                      <Table.HeaderCell>Grand Total</Table.HeaderCell>
                      
                    </Table.Row>
                  </Table.Header>
                  {orders.map((order) => {
                    return (
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>{order.refNo}</Table.Cell>
                          <Table.Cell>
                            {" "}
                            <Moment format="DD/MM/YYYY">
                              {order.createdAt}
                            </Moment>{" "}
                            {moment(order.createdAt).format("LT")}
                          </Table.Cell>
                          <Table.Cell>{order.soldProducts.length}</Table.Cell>
                          <Table.Cell>{formatPrice(order.total)}</Table.Cell>
                         
                        </Table.Row>
                      </Table.Body>
                    );
                  })}
                </Table>
              )}
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
}
CustomerOrder.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(CustomerOrder);
