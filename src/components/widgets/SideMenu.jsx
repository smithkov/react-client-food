import React, { Component, Fragment } from "react";
import ClientService from "../../services/clientService";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoaderTemp from "../loader";
import { updateProduct, updateCategory } from "../../actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const { hasCategory, category, hasOrigin, origins } = this.state;
    return (
      <Fragment>
        <Menu fluid vertical>
          {hasOrigin ? (
            origins.map((menu) => {
              const { id, code, shops, name } = menu;
              return shops.length > 0 ? (
                <Menu.Item
                  name={id}
                  // active={activeItem === "browse"}
                  onClick={() => this.props.originEvent(id)}
                >
                  <Flag floated="right" name={code} />
                  {name}
                  <Label color="">{shops.length}</Label>
                </Menu.Item>
              ) : (
                <Menu.Item name={id}>
                  <Flag floated="right" name={code} />
                  {name}
                  <Label color="">{shops.length}</Label>
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
            category.map((category) => {
              const { id, name, products } = category;
              return products.length > 0 ? (
                <Menu.Item
                  key={id}
                  name={id}
                  onClick={() => this.props.categoryEvent(id)}
                >
                  <Label color="">{category.products.length}</Label>
                  {name}
                </Menu.Item>
              ) : (
                ""
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
