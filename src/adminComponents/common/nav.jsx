import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { addUser } from "../../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DASHBOARD_URL,
  LOGIN_URL,
  logout,
  DASHBOARD_USER_URL,
} from "../../utility/global";
import clientService from "../../services/clientService";
import { Icon, Image } from "semantic-ui-react";

class Nav extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  state = {
    activeItem: "",
    role: "",
  };
  componentDidMount() {
    this.props.addUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        role: nextProps.user.role,
      });
      // console.log("Next prop",nextProps)
    }
  }
  logout = async (e) => {
    e.preventDefault();
    logout();

    this.props.history.push(LOGIN_URL);
  };
  dashboard = async (e) => {
    e.preventDefault();
    const role = this.state.role;
    this.props.history.push(
      role === "Customer" ? DASHBOARD_USER_URL : DASHBOARD_URL
    );
  };
  render() {
    return (
      <Menu fixed>
        <Menu.Item>
        <Link to={'/'}>
          <Image size="mini" circular src="/images/onelogo.png" />
          </Link>
        </Menu.Item>

        <Menu.Item
          name="dashboard"
          active={this.state.activeItem === "dashboard"}
          onClick={this.dashboard}
        >
          Dashboard <Icon color="red" name="dashboard" />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={this.state.activeItem === "logout"}
            onClick={this.logout}
          >
            {" "}
            Logout <Icon color="red" name="sign out" />
          </Menu.Item>
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

export default withRouter(connect(mapStateToProps, { addUser })(Nav));
