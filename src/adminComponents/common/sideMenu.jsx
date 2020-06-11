import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class SideMenu extends Component {
  state = {
    activeItem: "",
  };
  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>

          <Menu.Menu>
            <Link to={`/product_reg/`}>
              <Menu.Item
                name="Create-product"
                active={this.state.activeItem === "enterprise"}
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to={`/product_list/`}>
            <Menu.Item
              name="Product-listing"
              active={this.state.activeItem === "Product-listing"}
              onClick={this.handleItemClick}
            />
            </Link>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Orders</Menu.Header>

          <Menu.Menu>
           
              <Menu.Item
                name="Fulfilled-orders"
                active={this.state.activeItem === "Fulfilled-orders"}
                onClick={this.handleItemClick}
              />
           
            <Menu.Item
              name="Unfulfilled-orders"
              active={this.state.activeItem === "Unfulfilled-orders"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Settings</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Account-info"
              active={this.state.activeItem === "Account-info"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Seller-settings"
              active={this.state.activeItem === "Seller-settings"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Shop</Menu.Header>

          <Menu.Menu>
          <Link to={`/seller_reg/`}>
            <Menu.Item
              name="create-shop"
              active={this.state.activeItem === "emcreate-shop"}
              onClick={this.handleItemClick}
            >
             My Shop
            </Menu.Item></Link>

            <Menu.Item
              name="faq"
              active={this.state.activeItem === "faq"}
              onClick={this.handleItemClick}
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
