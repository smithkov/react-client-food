import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ClientService from "../services/clientService";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Checkbox,
  Message,
  Segment,
} from "semantic-ui-react";

class Register extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    hasError: false,
    showAlert: false,
    message: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    };

    ClientService.register(data)
      .then((response) => {
        this.props.history.push("/listing/");
      })
      .catch((err) => {
        const { error, message } = err.response.data;

        this.setState({
          showAlert: true,
          message: message,
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
        <Row style={{ paddingTop: "100px", position: "relative" }}>
          <Col lg="4"></Col>
          <Col lg="4">
            <form onSubmit={this.register}>
              <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as="h2" color="teal" textAlign="center">
                    <Image src="./images/logo.png" /> Sign-up to order/sell
                  </Header>

                  <Form size="large">
                    {alert}
                    <Button color="primary" fluid  size="large">
                      <i class="facebook icon"></i>
                     Continue with Facebook
                    </Button>
                    <hr></hr>
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

                      <Button type="submit" color="teal" fluid size="large">
                        Sign up
                      </Button>
                    </Segment>
                  </Form>
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
