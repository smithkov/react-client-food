import React, { Component, Fragment } from "react";
import ClientService from "../../services/clientService";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoaderTemp from "../loader";
import { updateProduct, updateCategory } from "../../actions/productActions";
import {
  Input,
  Label,
  Menu,
  Icon,
  Flag,
  Segment,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origins: [],
      category: [],
    };
  }
  state = {
    hasOrigin: false,
    hasCategory: false,
  };
  componentDidMount = async () => {
    const originResponse = await ClientService.origins();
    const categoryResponse = await ClientService.category();

    this.setState({
      category: categoryResponse.data.data,
      hasCategory: true,
      origins: originResponse.data.data,
      hasOrigin: true,
    });
  };
  onChange = (id) => {
    this.props.updateProduct(id);
  };

  onChangeCategory = (id) => {
    this.props.updateCategory(id);
  };
  render() {
    const { hasCategory, hasOrigin, origins } = this.state;
    return (
      <Fragment>
        <Menu fluid vertical>
          <Menu.Item>
            <Input placeholder="Search..." />
          </Menu.Item>

          <Menu.Item
            name="browse"
            // active={activeItem === "browse"}
            // onClick={this.handleItemClick}
          >
           <Flag floated="right"  name="ng" />
            Browse
            <Label color="green">34</Label>
          </Menu.Item>
        </Menu>
        <Menu fluid vertical>
          {hasOrigin ? (
            origins.map((menu) => {
              return (
                <Menu.Item
                  key={menu.id}
                  name="inbox"
                  // onClick={() => this.onChange(menu.id)}
                >
                  <Label color="green">{menu.shops.length}</Label>
                  {menu.name}
                </Menu.Item>
              );
            })
          ) : (
            <LoaderTemp />
          )}
        </Menu>
        <Icon name="filter" /> Cuisine Categories{" "}
        <a className="pull-right">Reset</a>
        <Menu fluid vertical>
          {hasCategory ? (
            this.state.category.map((category) => {
              return (
                <Menu.Item
                  key={category.id}
                  name="inbox"
                  // onClick={() => this.onChangeCategory(category.id)}
                >
                  <Label color="green">{category.products.length}</Label>
                  {category.name}
                </Menu.Item>
              );
            })
          ) : (
            <LoaderTemp />
          )}
        </Menu>
      </Fragment>
    );
  }
}

SideMenu.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

export default connect(null, { updateProduct, updateCategory })(SideMenu);
