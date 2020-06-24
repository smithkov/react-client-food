import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import clientService from '../../services/clientService'

export default class AfterNav extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    navigate: false,
    firstName: ""
  };
  componentDidMount=async()=>{
    let result = await clientService.hasAuth();
     
     const user = result.data.data
     
     this.setState({
       firstName : user?user.firstName:""
     })
  }
  onClick = (e) => {
    e.preventDefault();
    
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
                Logged In as {this.state.firstName}
                <Link onClick={this.onClick}> (Sign Out)</Link>
              </span>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}
