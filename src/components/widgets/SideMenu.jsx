import React, { Component, Fragment } from "react";
import ClientService from "../../services/clientService";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateProduct, updateCategory } from "../../actions/productActions";
import { Input, Label, Menu, Icon } from "semantic-ui-react";
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      category: [],
    };
  }
  componentDidMount() {
    ClientService.origins()
      .then((response) => {
        this.setState({
          menu: response.data.data,
        });
      })
      .catch((err) => {
        //console.log(err);
      });

    ClientService.category()
      .then((response) => {
        this.setState({
          category: response.data.data,
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  }
  onChange = (id) => {
    this.props.updateProduct(id);
  };

  onChangeCategory = (id) => {
    this.props.updateCategory(id);
  };
  render() {
    return (
      <Fragment>
        <Icon name="filter" /> All Cuisines <Link className="pull-right">Reset</Link>
        <Menu fluid vertical>
          {this.state.menu.map((menu) => {
            return (
              <Menu.Item
                key={menu.id}
                name="inbox"
                onClick={() => this.onChange(menu.id)}
              >
                <Label color="red">{menu.products.length}</Label>
                {menu.name}
              </Menu.Item>
            );
          })}
        </Menu>
        <Icon name="filter" /> Cuisine Categories <Link className="pull-right">Reset</Link>
        <Menu fluid vertical>
          {this.state.category.map((category) => {
            return (
              <Menu.Item
                key={category.id}
                name="inbox"
                onClick={() => this.onChangeCategory(category.id)}
              >
                <Label color="red">{category.products.length}</Label>
                {category.name}
              </Menu.Item>
            );
          })}
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
