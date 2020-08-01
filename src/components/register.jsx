import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ClientService from "../services/clientService";
import { Redirect, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { CRED, LISTING_URL, LOGIN_URL, SERVER_ERROR } from "../utility/global";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Checkbox,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import clientService from "../services/clientService";

class Register extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    hasError: false,
    showAlert: false,
    message: "",
    orders: [],
    loading: false,
  };
  responseGoogle = (response) => {
    console.log(response);
  };
  responseFacebook = (res) => {
    //const firstName
    console.log(res);
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
          this.props.history.push(LISTING_URL);
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addOrder() {}
  register = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    };

    ClientService.register(data)
      .then((response) => {
        this.setState({
          loading: false,
        });
        const error = response.data.error;
        if (!error) this.props.history.push(LISTING_URL);
        else {
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        this.setState({
          showAlert: true,
          message: SERVER_ERROR,
        });
      });
  };
  render() {
    const alert = this.state.showAlert ? (
      <div className="ui info message">
        <p>{this.state.message}</p>
      </div>
    ) : (
      ""
    );

    return (
      <Container fluid={true}>
        <Row style={{ paddingTop: "40px", position: "relative" }}>
          <Col lg="4"></Col>
          <Col lg="4">
            <form onSubmit={this.register}>
              <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as="h2" color="black" textAlign="center">
                    <Image circular size="mini" src="/images/onelogo.jpg" /> Sign-up to
                    order
                  </Header>

                  <Form size="large">
                    {alert}
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
                      <Form.Group widths="equal">
                        <Form.Field>
                          <input
                            required
                            type="text"
                            name="firstName"
                            id="defaultRegisterFormFirstName"
                            placeholder="First name"
                            onChange={this.onChange}
                          />
                        </Form.Field>

                        <Form.Field>
                          <input
                            type="text"
                            required
                            name="lastName"
                            id="defaultRegisterFormLastName"
                            placeholder="Last name"
                            onChange={this.onChange}
                          />
                        </Form.Field>
                      </Form.Group>
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
                      <Form.Input>
                        <Checkbox
                          required
                          label="I agree to the Terms and Conditions"
                        />
                      </Form.Input>

                      <Button loading={this.state.loading} type="submit" color="red" fluid size="large">
                        Sign up
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    Already have an account? <Link to={LOGIN_URL}>Log In</Link>
                  </Message>
                </Grid.Column>
              </Grid>
            </form>
          </Col>
          <Col lg="4"></Col>
        </Row>
      </Container>
    );
  }
}
export default Register;
