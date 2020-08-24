import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import clientService from "../../services/clientService";
import { fetchUser } from "../../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AfterNav extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    navigate: false,
    firstName: "",
  };
  componentDidMount = async () => {
    this.props.fetchUser();
    
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const user = nextProps.user;
      
      this.setState({
        firstName: user.firstName
      })
    }
  }
  onClick = (e) => {
    e.preventDefault();

    this.setState({
      navigate: true,
    });
  };
  render() {
    const {firstName} = this.state;
    return (
      <div>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <span>Control Panel - {this.props.form}</span>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <span className="float-right">
              Logged In as {firstName}
              <Link onClick={this.onClick}></Link>
            </span>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
AfterNav.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(AfterNav);
