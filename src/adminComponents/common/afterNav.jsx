import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { getUserProfile } from "../../utility/global";
import { Link, Redirect } from "react-router-dom";

export default class AfterNav extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    navigate: false,
  };
  onClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("cred");
    this.setState({
        navigate:true
    })
  };
  render() {
    if (this.state.navigate) {
      return <Redirect to="/login" push={true}></Redirect>;
    } else {
      return (
        <div>
          <Grid>
            <Grid.Column floated="left" width={5}>
              <span>Control Panel - {this.props.form}</span>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <span className="float-right">
                Logged In as {getUserProfile().fullName}{" "}
                <Link onClick={this.onClick}> (Sign Out)</Link>
              </span>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}
