import React, { Component } from "react";
import ClientService from "../../services/clientService";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProduct } from "../../actions/productActions";
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }
  componentDidMount() {
    ClientService.origins()
      .then((response) => {
        //const data = response.data;
        console.log(response.data);
        this.setState({
          menu: response.data.data,
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  }
  onChange = (id) => {
    console.log(id);
    this.props.updateProduct(id);
  };
  render() {
    const menu = this.state.menu.map((menu) => {
      return (
        <li
          key={menu.id}
          onClick={() => this.onChange(menu.id)}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {menu.name}
          <span className="badge badge-primary badge-pill">
            {menu.products.length}
          </span>
        </li>
      );
    });
    return (
      <div>
        <ul className="list-group">{menu}</ul>
      </div>
    );
  }
}

SideMenu.propTypes = {
  updateProduct: PropTypes.func.isRequired,
};

export default connect(null, { updateProduct })(SideMenu);
