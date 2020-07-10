import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { addUser } from "../../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DASHBOARD_URL, LOGIN_URL } from "../../utility/global";
import clientService from "../../services/clientService";

class Nav extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  state = {
    activeItem: "",
  };
  componentDidMount() {
    this.props.addUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      // console.log("Next prop",nextProps)
    }
  }
  logout = async (e) => {
    e.preventDefault();
    const response = await clientService.logout();
    this.props.history.push(LOGIN_URL);
  };
  render() {
    return (
      <Menu fixed>
        <Menu.Item>
          <img src="/images/onelogo.jpg" />
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
            onClick={this.logout}
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

export default withRouter(connect(mapStateToProps, { addUser })(Nav));
