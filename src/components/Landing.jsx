import PropTypes from "prop-types";
import React, { Component, useState, useEffect } from "react";
import clientService from "../services/clientService";
import Footer from "./Footer";
import BigLoader from "./bigLoader";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Rating,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Input,
} from "semantic-ui-react";
import {
  totalRating,
  displayRating,
  formatPrice,
  LISTING_URL,
  REGISTER_URL,
  LOGIN_URL,
  SHOP_SIGNUP,
} from "../utility/global";
import StoreCard from "./widgets/storeCard";
import { Link, withRouter } from "react-router-dom";
import HomepageHeading from "../components/homePageHeading";
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              backgroundImage: `url("/images/bg.jpg")`,
              minHeight: 700,
              repeat: "none",
              padding: "1em 0em",
            }}
            vertical
          >
            <Menu
              color="grey"
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item position="right">
                  {/* <Link to={SHOP_SIGNUP}>Vendor Sign up</Link> */}
                  {/* <Link
                    style={{ paddingLeft: 20, paddingRight: 20 }}
                    to={LISTING_URL}
                  >
                    View Listing
                  </Link> */}
                  <Button as="a" href={LOGIN_URL} inverted={!fixed}>
                    Log In
                  </Button>

                  {/* <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button> */}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        {/* <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Link to={LISTING_URL}>
            <Menu.Item as="a" active>
              View Listing
            </Menu.Item>
          </Link>
          <Link to={LOGIN_URL}>
            <Menu.Item as="a">Log In</Menu.Item>
          </Link>

         
        </Sidebar> */}

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{
              backgroundImage: `url("/images/bg.jpg")`,
              minHeight: 350,
              padding: "1em 0em",
            }}
            vertical
          >
            <Container>
              <Menu color="grey" inverted pointing secondary size="large">
                

                <Menu.Item position="right">
                  <Button href={LOGIN_URL} as="a" inverted>
                    Log In
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile={true} />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

class Landing extends Component {
  componentDidMount = async () => {
    const result = await clientService.storeFrontPage();
    this.setState({
      topMeals: result.data.data,
    });
  };
  state = {
    topMeals: [],
  };
  render() {
    const styles = {
      height: 130,
      width: "100%",
      objectFit: "cover",
      objectPosition: "center center",
    };
    const { topMeals } = this.state;

    return (
      <ResponsiveContainer>
        <Container>
          <hr></hr>
          <Segment style={{ paddingTop: "5em" }}>
            <h1>Top-rated sellers</h1>
            {topMeals.length > 0 ? (
              <Grid padded stackable>
                <Grid.Row style={{ margin: "auto" }} columns={4}>
                  {topMeals.map((item) => {
                    const { id, VirtualShop, price, photo, name } = item;
                    return (
                      <StoreCard isOpen={true} key={item.id} item={item} />
                    );
                  })}
                </Grid.Row>
              </Grid>
            ) : (
              <BigLoader />
            )}
          </Segment>
        </Container>

        <Footer />
      </ResponsiveContainer>
    );
  }
}

export default withRouter(Landing);
