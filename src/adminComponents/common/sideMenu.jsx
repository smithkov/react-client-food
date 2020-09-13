import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Checkbox } from "semantic-ui-react";
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
  BANK_DETAIL_URL,
  CUSTOMER_ACCOUNT,
  CUSTOMER_ORDER
} from "../../utility/global";
import Icon from "react-icons-kit";
import clientService from "../../services/clientService";

class SideMenu extends Component {
  state = {
    activeItem: "",
    role: "",
    isPreOrder: false,
    shopId: "",
  };

  componentDidMount() {
    this.props.fetchUser();

    //console.log("next propdddddd", this.props.role)
  }
  onChange = async (e, data) => {
    const isPreOrder = data.checked;
    const updatePreOrder = await clientService.updatePreOrder(
      this.state.shopId,
      { isPreOrder }
    );
    if (!updatePreOrder.data.error) {
      this.setState({
        isPreOrder: isPreOrder,
      });
    }
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      const shopId = user.shopId;
      this.setState({
        shopId: shopId,
        role: user.role,
      });

      const preOrderResponse = await clientService.fetchShopPreOrder({
        shopId,
      });
      const data = preOrderResponse.data.data;
      this.setState({
        isPreOrder: data ? data.isPreOrder : false,
      });
    }
  };

  render() {
    const { role, isPreOrder } = this.state;
    const preOrder = isPreOrder ? "Pre-order(ON)" : "Pre-order(OFF)";
    if (role == "Customer") {
      return (
        <Menu fluid vertical>
          <Menu.Item>
            <Menu.Header><Link to={CUSTOMER_ORDER}>My Orders</Link></Menu.Header>
            
          </Menu.Item>
          <Menu.Item>
            <Menu.Header><Link to={CUSTOMER_ACCOUNT}>My Account</Link></Menu.Header>
            
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu fluid vertical>
          <Menu.Item>
            <Checkbox
              onChange={this.onChange}
              checked={isPreOrder}
              toggle
              label={preOrder}
            />
          </Menu.Item>
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
          <Menu.Item>
            <Menu.Header>Bank Account Details</Menu.Header>

            <Menu.Menu>
              <Link to={BANK_DETAIL_URL}>
                <Menu.Item
                  name="availability"
                  active={this.state.activeItem === "availability"}
                  onClick={this.handleItemClick}
                >
                  Bank Details
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
