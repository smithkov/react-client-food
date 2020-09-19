import React, { Component, Children } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import {
  Card,
  Button,
  Icon,
  Image,
  Grid,
  Message,
  Loader,
  Responsive,
} from "semantic-ui-react";
import { Col, Container, Row } from "reactstrap";
import AfterNav from "./common/afterNav";
import clientService from "../services/clientService";
import {
  SHOP_SETTING_URL,
  MEAL_LIST,
  USER_ORDER_URL,
  SHOP_CREATE,
  MY_ACCOUNT,
  AVAILABILITY_URL,
  SHOP_REVIEW,
  POST_CODES_URL,
  toastOptions,
} from "../utility/global";
import { Link } from "react-router-dom";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
class Wrapper extends Component {
  constructor(props) {
    super(props);
    //window.location.reload(false)
  }

  state = {
    role: "",
    shopId: "",
    hasEmailVerified: false,
    showTemp: false,
    isSeller: false,
  };

  componentDidMount = async () => {
    this.props.fetchUser();
    //window.location.reload(false);
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;

      if (user.role === "Seller") {
        const response = await clientService.findShopById(user.shopId);
        const shop = response.data.data;

        this.setState({
          hasEmailVerified: shop.hasEmailVerified,
          shopId: shop.id,
          isSeller: true,
        });
      }
      this.setState({
        role: user.role,
      });
    }
  };

  render() {
    const { isSeller, showTemp, hasEmailVerified } = this.state;
    let mailTempt;
    setTimeout(() => {
      this.setState({
        showTemp: true,
      });
    }, 5000);

    return (
      <>
        <Responsive
          getWidth={getWidth}
          maxWidth={Responsive.onlyTablet.minWidth}
        >
          <Nav />
        <AfterNav form={"Dashboard"} />
        <hr></hr>
          <Container fluid={true}>
            <Row style={{ paddingTop: "10px", height: 600 }}>
              <Col lg="12">{this.props.children}</Col>
            </Row>
          </Container>
        </Responsive>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyMobile.maxWidth}
        >
          <Nav />
          <AfterNav form={"Dashboard"} />
          <hr></hr>
          <Row style={{ paddingTop: "10px", height: 600 }}>
            <Col lg="2">
              <SideMenu />
            </Col>
            <Col lg="9">{this.props.children}</Col>
          </Row>
        </Responsive>
      </>
    );
  }
}
Wrapper.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(Wrapper);
