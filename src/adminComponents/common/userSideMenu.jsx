import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Modal, Button } from "semantic-ui-react";
import {MY_ACCOUNT, USER_ORDER_URL, } from '../../utility/global'

export default class UserSideMenu extends Component {
  state = {
    activeItem: "",
  };

  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Your orders</Menu.Header>
          <Menu.Menu>
            <Link to={`${USER_ORDER_URL}`}>
              <Menu.Item
                name="Account-info"
                active={this.state.activeItem === "Account-info"}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Settings</Menu.Header>
          <Menu.Menu>
            <Link to={`${MY_ACCOUNT}`}>
              <Menu.Item
                name="Account-info"
                active={this.state.activeItem === "Account-info"}
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
