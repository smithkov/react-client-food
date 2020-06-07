import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  state = {
    activeItem: "",
  };
  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <img src="/images/logo.png" />
        </Menu.Item>
        <Link to={`/dashboard/`}>
          <Menu.Item
            name="dashboard"
            active={this.state.activeItem === "dashboard"}
            onClick={this.handleItemClick}
          >
            Dashboard
          </Menu.Item>
        </Link>

        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={this.state.activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
