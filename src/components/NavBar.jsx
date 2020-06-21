import React, { Component } from "react";
import {
  getUserProfile,
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
} from "../utility/global";

import { Link } from "react-router-dom";
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

export default class NavBar extends Component {
  state = {
    firstName: "",
    avatar: "",
  };

  componentDidMount() {
    this.setState({
      firstName: getUserProfile() ? getUserProfile().firstName : "",
      avatar: getUserProfile()
        ? getUserProfile().photo
          ? `${IMAGE_URL}${getUserProfile().photo}`
          : DEFAULT_USER
        : DEFAULT_USER,
    });
  }
  render() {
    const { firstName, avatar } = this.state;
    const styles={color:"black"}
    const options = [
      {
        key: "user",
        text: (
          <Link style={styles} to={`/dashboard`}>
            Your Account
          </Link>
        ),
        icon: "user",
      },
      { key: "settings", text: (
        <Link style={styles} to={`/dashboard`}>
          Your orders
        </Link>
      ), icon: "clipboard outline" },
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
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src="/images/logo.png"
                style={{ marginRight: "1.5em" }}
              />
              Cook 'or' Eat
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>
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
