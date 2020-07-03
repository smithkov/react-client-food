import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { addUser } from "../../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {DASHBOARD_URL} from '../../utility/global'

class Nav extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  state = {
    activeItem: "",
  };
  componentDidMount(){
    this.props.addUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      //console.log("Next prop",nextProps)
    }
  }
  render() {
    return (
      <Menu fixed>
        <Menu.Item>
          <img src="/images/logo.png" />
        </Menu.Item>
        <Link to={`${DASHBOARD_URL}`}>
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
Nav.propTypes = {
  addUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { addUser })(Nav);