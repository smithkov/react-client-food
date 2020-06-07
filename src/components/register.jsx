import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import ClientService from "../services/clientService";
import { Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    hasError: false,
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
          hasError: error,
          message: message,
        });
      });
  };
  render() {
    const alert = (
      <div className="alert alert-warning" role="alert">
        {this.state.message}
      </div>
    );

    return (
      <Container fluid={true}>
        <Row style={{paddingTop:"100px", position:"relative"}}>
          <Col lg="4"></Col>
          <Col lg="4">
            <form onSubmit={this.register} class="text-center border border-light p-5" action="#!">
              {this.state.hasError?alert:''}
              <p class="h4 mb-4">Sign up</p>

              <div class="form-row mb-4">
                <div class="col">
                  <input
                    type="text" name="firstName"
                    id="defaultRegisterFormFirstName"
                    class="form-control"
                    placeholder="First name" onChange={this.onChange}
                  />
                </div>
                <div class="col">
                  <input
                    type="text" name="lastName"
                    id="defaultRegisterFormLastName"
                    class="form-control"
                    placeholder="Last name" onChange={this.onChange}
                  />
                </div>
              </div>

              <input
                type="email" name="email"
                id="defaultRegisterFormEmail"
                class="form-control mb-4"
                placeholder="E-mail" onChange={this.onChange}
              />

              <input
                type="password" name="password"
                id="defaultRegisterFormPassword"
                class="form-control"
                placeholder="Password" onChange={this.onChange}
                aria-describedby="defaultRegisterFormPasswordHelpBlock"
              />
              <small
                id="defaultRegisterFormPasswordHelpBlock"
                class="form-text text-muted mb-4"
              >
                At least 8 characters and 1 digit
              </small>

              {/* <input
                type="text"
                id="defaultRegisterPhonePassword"
                class="form-control"
                placeholder="Phone number"
                aria-describedby="defaultRegisterFormPhoneHelpBlock"
              /> */}
              <small
                id="defaultRegisterFormPhoneHelpBlock"
                class="form-text text-muted mb-4"
              >
                Optional - for two step authentication
              </small>

              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="defaultRegisterFormNewsletter"
                />
                <label
                  class="custom-control-label"
                  for="defaultRegisterFormNewsletter"
                >
                  Subscribe to our newsletter
                </label>
              </div>

              <button class="btn btn-info my-4 btn-block" type="submit">
                Sign in
              </button>

              {/* <p>or sign up with:</p>

              <a href="#" class="mx-2" role="button">
                <i class="fab fa-facebook-f light-blue-text"></i>
              </a>
              <a href="#" class="mx-2" role="button">
                <i class="fab fa-twitter light-blue-text"></i>
              </a>
              <a href="#" class="mx-2" role="button">
                <i class="fab fa-linkedin-in light-blue-text"></i>
              </a>
              <a href="#" class="mx-2" role="button">
                <i class="fab fa-github light-blue-text"></i>
              </a> */}

              <p>
                By clicking
                <em>Sign up</em> you agree to our
                <a href="" target="_blank">
                  terms of service
                </a>
              </p>
            </form>
          </Col>
          <Col lg="4"></Col>
        </Row>
      </Container>
    );
  }
}
export default Register;
