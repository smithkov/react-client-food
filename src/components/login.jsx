import React, { Component } from "react";
import clientService from "../services/clientService";
import { setUserProfile } from "../utility/global";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

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
    let { from } = this.props.location.state || {
      from: { pathname: "/dashboard" },
    };
    clientService
      .login(data)

      .then((response) => {
        const { data } = response.data;

        this.props.history.replace(from);
      })
      .catch((err) => {
        const { error, message } = err.response.data;
        this.setState({
          hasError: error,
        });
      });
  };

  responseGoogle = (response) => {
    console.log(response);
  };
  responseFacebook = (res) => {
    let { from } = this.props.location.state || {
      from: { pathname: "/dashboard" },
    };

    if (res) {
      const { email, name, graphDomain, id } = res;
      const nameArray = name.split(" ");
      const firstName = nameArray[0];
      const lastName = nameArray.pop();
      const password = id;
      const source = graphDomain;

      clientService
        .socialAccess({ email, firstName, lastName, source, password })
        .then((response) => {
          const { token, data } = response.data;
          data.token = token;
          //Cookies.set(CRED, data, { expires: 7, path: "" });
          //localStorage.setItem(CRED, JSON.stringify(data));
          this.props.history.replace(from);
        })
        .catch((err) => {
          const { error, message } = err.response.data;

          this.setState({
            showAlert: true,
            message: message,
          });
        });
    }
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
              <FacebookLogin
                appId="900223110479631"
                autoLoad={false}
                cssClass="facebookBtn"
                fields="name,email,picture"
                callback={this.responseFacebook}
                icon={<Icon name="facebook" />}
                textButton="&nbsp;&nbsp;Sign In with Facebook"
              />
              <GoogleLogin
                clientId="489905510114-d9395vk5dso3h7bb07rlfv492u444ebs.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    type="button"
                    className="google"
                  >
                    &nbsp;&nbsp;
                    <Icon name="google" />
                    Sign In with Google
                  </button>
                )}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                className="google"
                style={{ textAlign: "center" }}
                buttonText="Sign In with Google"
              />
              <div class="ui horizontal divider">Or</div>
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
              New to us? <Link to={"/register"}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </form>
    );
  }
}
export default Login;
