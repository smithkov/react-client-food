import React, { Component } from "react";
import clientService from "../services/clientService";
import { setToken } from "../http-common";
import {
  setUserProfile,
  DASHBOARD_URL,
  DASHBOARD_USER_URL,
  REGISTER_URL,
  SERVER_ERROR,
  asyncLocalStorage,
} from "../utility/global";
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
    loading: false,
    disabled: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = async (e) => {
    try {
      var dashType;
      e.preventDefault();
      this.setState({ loading: true, disabled: true });

      const dataObj = {
        email: this.state.email,
        password: this.state.password,
      };
      const loginResponse = await clientService.login(dataObj);
      this.setState({ loading: false });
      const { data, token } = loginResponse.data;
      const setStorage = await asyncLocalStorage.setItem("tk", token);
      dashType = data.role === "Seller" ? DASHBOARD_URL : DASHBOARD_USER_URL;

      let { from } = this.props.location.state || {
        from: { pathname: dashType },
      };

      this.props.history.replace(from);
    } catch (err) {
      this.setState({
        hasError: true,
        message: SERVER_ERROR,
      });
    } finally {
      this.setState({ loading: false, disabled: false });
    }
  };

  responseGoogle = (response) => {};
  responseFacebook = (res) => {
    var dashType;

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
          localStorage.setItem("tk", token);
          dashType =
            data.role === "Seller" ? DASHBOARD_URL : DASHBOARD_USER_URL;
          dashType =
            data.role === "Seller" ? DASHBOARD_URL : DASHBOARD_USER_URL;

          let { from } = this.props.location.state || {
            from: { pathname: dashType },
          };
          this.props.history.replace(from);
        })
        .catch((err) => {
          this.setState({
            showAlert: true,
            message: SERVER_ERROR,
          });
        });
    }
  };
  render() {
    const { loading, disabled } = this.state;
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
            <Header as="h2" color="black" textAlign="center">
              <Image circular size="mini" src="/images/onelogo.png" /> Log-in to
              your account
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
              {/* <GoogleLogin
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
              /> */}
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

                <Button
                  loading={loading}
                  disabled={disabled}
                  type="submit"
                  color="red"
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to={REGISTER_URL}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </form>
    );
  }
}
export default Login;
