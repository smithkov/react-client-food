import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Modal, Button, List } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/productActions";
import {
  MEAL_CREATE,
  MEAL_LIST,
  SHOP_CREATE,
  MY_ACCOUNT,
  USER_ORDER_URL,
  SHOP_SETTING_URL,
  SHOP_SOCIAL_URL,
  AVAILABILITY_URL,
} from "../../utility/global";
import Icon from "react-icons-kit";

class SideMenu extends Component {
  state = {
    activeItem: "",
  };

  componentDidMount() {
    this.props.fetchUser();
    //console.log("next propdddddd", this.props.role)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
    }
  }

  render() {
    if (this.props.user.role == "Customer") {
      return (
        <Menu fluid vertical>
          <Menu.Item>
            <Menu.Header>Orders</Menu.Header>
            <Menu.Menu>
              <Link to={USER_ORDER_URL}>
                <Menu.Item
                  name="Your-orders"
                  active={this.state.activeItem === "Your-orders"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Settings</Menu.Header>
            <Menu.Menu>
              <Link to={MY_ACCOUNT}>
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
    } else {
      return (
        <Menu fluid vertical>
          <Menu.Item>
            <Menu.Header>Food</Menu.Header>
            
            <Menu.Menu>
              <Link to={MEAL_CREATE}>
                
                <Menu.Item
                  name="Create-food"
                  active={this.state.activeItem === "enterprise"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to={MEAL_LIST}>
                <Menu.Item
                  name="food-listing"
                  active={this.state.activeItem === "meal-listing"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Orders</Menu.Header>

            <Menu.Menu>
              <Link to={USER_ORDER_URL}>
                <Menu.Item
                  name="customer orders"
                  active={this.state.activeItem === "customer orders"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Settings</Menu.Header>

            <Menu.Menu>
              <Link to={MY_ACCOUNT}>
                <Menu.Item
                  name="Account-info"
                  active={this.state.activeItem === "Account-info"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to={SHOP_SETTING_URL}>
                <Menu.Item
                  name="Store-settings"
                  active={this.state.activeItem === "Store-settings"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Online Store</Menu.Header>

            <Menu.Menu>
              <Link to={SHOP_CREATE}>
                <Menu.Item
                  name="my-store"
                  active={this.state.activeItem === "my-store"}
                  onClick={this.handleItemClick}
                >
                  My Store
                </Menu.Item>
              </Link>
              <Link to={SHOP_SETTING_URL}>
                <Menu.Item
                  name="store-settings"
                  active={this.state.activeItem === "store-settings"}
                  onClick={this.handleItemClick}
                >
                  Settings
                </Menu.Item>
              </Link>
              <Link to={SHOP_SOCIAL_URL}>
                <Menu.Item
                  name="shop-social"
                  active={this.state.activeItem === "shop-social"}
                  onClick={this.handleItemClick}
                >
                  Social
                </Menu.Item>
              </Link>

              <Link to={AVAILABILITY_URL}>
                <Menu.Item
                  name="availability"
                  active={this.state.activeItem === "availability"}
                  onClick={this.handleItemClick}
                >
                  Availability
                </Menu.Item>
              </Link>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      );
    }
  }
}
SideMenu.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(SideMenu);
