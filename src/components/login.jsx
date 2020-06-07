import React, { Component } from "react";
import ClientService from "../services/clientService";
import { CRED } from "../utility/global";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    hasError: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    ClientService.login(data)

      .then((response) => {
        const { token, data } = response.data;
        data.token = token;
        localStorage.setItem(CRED, JSON.stringify(data));

        this.props.history.push("/dashboard/");
      })
      .catch((err) => {
        const { error, message } = err.response.data;
        console.log(error);
        this.setState({
          hasError: error,
        });
      });
  };
  render() {
    const alert = (
      <div className="ui info message">
        <div className="header">Login refusal</div>
        <p>
          If you're having trouble logging in,{" "}
          <a href="#">reset your password.</a>
        </p>
      </div>
    );

    return (
      <form onSubmit={this.login}>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="./images/logo.png" /> Log-in to your account
            </Header>

            <Form size="large">
              {this.state.hasError ? alert : ""}
              <Segment stacked>
                <Form.Input
                  fluid
                  type="email"
                  icon="user"
                  onChange={this.onChange}
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  onChange={this.onChange}
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button type="submit" color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </form>
    );
   
  }
}
export default Login;
