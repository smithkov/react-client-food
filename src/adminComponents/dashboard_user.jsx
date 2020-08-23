import React, { Component } from "react";
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

class DashboardUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.props.fetchUser();
  };
  componentWillReceiveProps = async (nextProps) => {
    
  };

  render() {
   
    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Dashboard"} />
        <hr></hr>

        <Row style={{ paddingTop: "10px", height: 600 }}>
          <Col lg="2" sm="12" xs="12">
            <SideMenu />
          </Col>
          <Col lg="10">
            <Grid padded stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Link to={USER_ORDER_URL}>
                    <Card color="blue" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/order.png"
                        />
                        <Card.Header>Orders</Card.Header>
                        <Card.Meta>Manage and print orders</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={MY_ACCOUNT}>
                    <Card color="green" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/user_info.png"
                        />
                        <Card.Header>Account Info</Card.Header>
                        <Card.Meta>Manage your personal account</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Col>
        </Row>
      </Container>
    );
  }
}
DashboardUser.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(DashboardUser);
