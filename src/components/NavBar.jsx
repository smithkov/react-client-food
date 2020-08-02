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
    role:""
  };

  componentDidMount = async () => {
    this.props.addUser();
   
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
     
      const {firstName, photo, role} =nextProps.user;
      this.setState({
        firstName: firstName,
        role: role,
        avatar: photo ? `${IMAGE_URL}${photo}` : DEFAULT_USER,
      });
    }
  }
  handlerLogout = async (e) => {
    e.preventDefault();
    const response = await clientService.logout();
    this.props.history.push(LOGIN_URL);
  };
  handlerOrder = async (e) => {
    e.preventDefault();
    this.props.history.push(USER_ORDER_URL);
  };

  handlerAccount = async (e) => {
    e.preventDefault();
    this.props.history.push(MY_ACCOUNT);
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
          <a onClick={this.logout} style={styles}>
            Logout
          </a>
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
          <Menu.Item>
            <img
              style={{
                marginRight: "1.5em",
                height: "35px",
                width: "100px",
              }}
              src="/images/foodengo_logo.png"
            />
          </Menu.Item>
          <Menu.Item>
            <Link to={LISTING_URL}>Home</Link>
          </Menu.Item>
          {firstName ? (
            <Menu.Menu position="right">
              <Dropdown item text={firstName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={this.handlerAccount}
                    icon="user"
                    text="Your Account"
                  />

                  <Dropdown.Item
                    onClick={this.handlerOrder}
                    icon="shopping bag"
                    text="Your orders"
                  />

                  <Dropdown.Item
                    onClick={this.handlerLogout}
                    icon="sign out alternate"
                    text="Logout"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          ) : (
            <Menu.Item position="right">
              <Link to={LOGIN_URL}>Log In</Link>
            </Menu.Item>
          )}
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
