import React, { Component } from "react";
import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  USER_ORDER_URL,
  MY_ACCOUNT,
  LISTING_URL
} from "../utility/global";

import { Link } from "react-router-dom";
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
      { key: "sign-out", text: "Sign Out", icon: "sign out" },
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
             <Link to={'/'}> <Image
                size="mini"
                src="/images/logo.png"
                style={{ marginRight: "1.5em" }}
              /></Link>
             Foodengo
            </Menu.Item>
            <Menu.Item as="a"><Link to={LISTING_URL}>Home</Link></Menu.Item>
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
              ""
            )}
            {/* <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
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

export default connect(mapStateToProps, { addUser })(NavBar);
