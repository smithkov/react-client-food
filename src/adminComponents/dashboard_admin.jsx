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

class Dashboard extends Component {
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
    setTimeout(()=> {
      this.setState({
        showTemp:true
      })
    }, 5000);

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
              {showTemp? hasEmailVerified ? (
                ""
              ) : (
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Message warning icon>
                      <Icon name="warning circle" />
                      <Message.Content>
                        <Message.Header>
                          Verify Your Email Address
                        </Message.Header>
                        Before proceeding, please check your email address for a
                        verification link. If you did not receive the email.
                      </Message.Content>
                    </Message>
                  </Grid.Column>
                </Grid.Row>
              ):""}

              <Grid.Row columns={4}>
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
                  <Link to={MEAL_LIST}>
                    <Card color="green" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/meal.png"
                        />
                        <Card.Header>Food</Card.Header>
                        <Card.Meta>Add, update and remove food</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={SHOP_SETTING_URL}>
                    <Card color="red" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/setup.jpg"
                        />
                        <Card.Header>Settings</Card.Header>
                        <Card.Meta>
                          Setup delivery time and cost, discount and minimum
                          order{" "}
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={SHOP_CREATE}>
                    <Card color="yellow" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/store.png"
                        />
                        <Card.Header>Store</Card.Header>
                        <Card.Meta>Manage your store information</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Link to={AVAILABILITY_URL}>
                    <Card color="blue" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/time.png"
                        />
                        <Card.Header>Availabilty</Card.Header>
                        <Card.Meta>Manage days and time of opening</Card.Meta>
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
                <Grid.Column>
                  <Link to={SHOP_REVIEW}>
                    <Card color="red" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/ratings.png"
                        />
                        <Card.Header>Reviews</Card.Header>
                        <Card.Meta>View your shop reviews</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={POST_CODES_URL}>
                    <Card color="yellow" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/location.png"
                        />
                        <Card.Header>Post Codes</Card.Header>
                        <Card.Meta>Target post codes for delivery</Card.Meta>
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
Dashboard.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(Dashboard);
