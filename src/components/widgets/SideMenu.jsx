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
  Segment,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      category: [],
    };
  }
  state = {
    hasOrigin: false,
    hasCategory: false,
  };
  componentDidMount() {
    ClientService.origins()
      .then((response) => {
        this.setState({
          menu: response.data.data,
          hasOrigin: true,
        });
      })
      .catch((err) => {
        //console.log(err);
      });

    ClientService.category()
      .then((response) => {
        this.setState({
          category: response.data.data,
          hasCategory: true,
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
    const { hasCategory, hasOrigin } = this.state;
    return (
      <Fragment>
        <Icon name="filter" /> All Cuisines{" "}
        <Link className="pull-right">Reset</Link>
        <Menu fluid vertical>
          {hasOrigin ? (
            this.state.menu.map((menu) => {
              return (
                <Menu.Item
                  key={menu.id}
                  name="inbox"
                  onClick={() => this.onChange(menu.id)}
                >
                  <Label color="green">{menu.products.length}</Label>
                  {menu.name}
                </Menu.Item>
              );
            })
          ) : (
            <LoaderTemp />
          )}
        </Menu>
        <Icon name="filter" /> Cuisine Categories{" "}
        <Link className="pull-right">Reset</Link>
        <Menu fluid vertical>
          

          {hasCategory? this.state.category.map((category) => {
            return (
              <Menu.Item
                key={category.id}
                name="inbox"
                onClick={() => this.onChangeCategory(category.id)}
              >
                <Label color="green">{category.products.length}</Label>
                {category.name}
              </Menu.Item>
            );
          }):<LoaderTemp />}
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
