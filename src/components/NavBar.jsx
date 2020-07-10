import React, { Component } from "react";
import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  USER_ORDER_URL,
  MY_ACCOUNT,
  LISTING_URL,
  LOGIN_URL,
} from "../utility/global";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../actions/productActions";
import {
  Container,
  Dropdown,
  Icon,
  DropDown,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from "semantic-ui-react";
import clientService from "../services/clientService";
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    firstName: "",
    avatar: DEFAULT_USER,
  };

  componentDidMount = async () => {
    this.props.addUser();
    try {
      const result = await clientService.hasAuth();

      const { firstName, photo } = result.data.data;
      this.setState({
        firstName: firstName ? firstName : "",
        avatar: photo ? `${IMAGE_URL}${photo}` : DEFAULT_USER,
      });
    } catch (err) {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
    }
  }
  logout = async (e) => {
    e.preventDefault();
    const response = await clientService.logout();
    this.props.history.push(LOGIN_URL);
  };
  render() {
    const { firstName, avatar } = this.state;

    const styles = { color: "black" };
    const options = [
      {
        key: "user",
        text: (
          <Link style={styles} to={`${MY_ACCOUNT}`}>
            Your Account
          </Link>
        ),
        icon: "user",
      },
      {
        key: "settings",
        text: (
          <Link style={styles} to={`${USER_ORDER_URL}`}>
            Your orders
          </Link>
        ),
        icon: "clipboard outline",
      },
      {
        key: "sign-out",
        text: (
          <Link onClick={this.logout} style={styles}>
            Logout
          </Link>
        ),
        icon: "sign out",
      },
    ];
    const trigger = (
      <span>
        <Image avatar src={avatar} />
        {firstName}
      </span>
    );
    return (
      <div>
        {" "}
        <Menu color="red" fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Link to={"/"}>
                <img
                  style={{
                    marginRight: "1.5em",
                    height: "35px",
                    width: "100px",
                  }}
                  src="/images/foodengo_logo2.png"
                />{" "}
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to={LISTING_URL}>Home</Link>
            </Menu.Item>
            {firstName ? (
              <Menu.Menu position="right">
                <Menu.Item>
                  <Dropdown
                    trigger={trigger}
                    options={options}
                    pointing="top left"
                    icon={null}
                  />
                </Menu.Item>
              </Menu.Menu>
            ) : (
              <Menu.Item position="right" as="a">
                <Link to={LOGIN_URL}>Log in</Link>
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

NavBar.propTypes = {
  addUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default withRouter(connect(mapStateToProps, { addUser })(NavBar));
