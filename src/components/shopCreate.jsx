import React, { Component } from "react";
import Nav from "../adminComponents/common/nav";
import SideMenu from "../adminComponents/common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Row } from "reactstrap";
import clientService from "../services/clientService";
import { toast } from "react-toastify";
import {
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  toastOptions,
  DEFAULT_LOGO,
} from "../utility/global";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Message,
  Input,
  Header,
  Container,
  List,
} from "semantic-ui-react";
import AfterNav from "../adminComponents/common/afterNav";
import Icon from "react-icons-kit";
//import "date-fns";
//import MomentUtils from "@date-io/moment";

export default class ShopCreate extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    shopName: "",
    initialShopName: "",
    hasError: false,
    message: "",
    selectedCity: "",
    city: [],
    hasShop: false,
    firstAddress: "",
    postCode: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    disabled: false,
    cityText: "City",
    loading: false,
    isDuplicateName: false,
    emailMessage: "",
    isDuplicateEmail: false,
  };

  componentDidMount = async () => {
    ClientService.cities()
      .then((response) => {
        let cities = response.data.data.map((city) => {
          return {
            key: city.id,
            value: city.id,
            text: city.name,
          };
        });
        this.setState({
          city: [{ value: "", text: "--Select city--" }].concat(cities),
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      firstAddress,
      lastName,
      email,
      phone,
      firstName,
      postCode,
      password,
      shopName,
      selectedCity,
    } = this.state;

    this.setState({
      loading: true,
    });
    try {
      const response = await clientService.createShop({
        firstAddress,
        lastName,
        email,
        phone,
        firstName,
        postCode,
        password,
        shopName,
        cityId: selectedCity,
      });

      if (response.data.error) {
        toast.success(response.data.message, toastOptions(true));
        this.setState({
          loading: false,
        });
      } else {
        this.props.history.push(
          `/food_vendor/application-success/${response.data.id}`
        );
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  onBlur = async (e) => {
    const { shopName } = this.state;
    if (e.target.name == "shopName") {
      const response = await clientService.findShopByName({ shopName });

      if (response.data) {
        this.setState({
          disabled: true,
          isDuplicateName: true,
        });
      } else {
        this.setState({
          disabled: false,
          isDuplicateName: false,
        });
      }
    }
  };
  onBlurEmail = (e) => {
    const { email } = this.state;

    clientService.findEmail({ email }).then((response) => {
      const { hasEmail, message } = response.data;
      if (hasEmail) {
        this.setState({
          disabled: true,
          emailMessage: message,
          isDuplicateEmail: true,
        });
      } else {
        this.setState({
          disabled: false,
          isDuplicateEmail: false,
        });
      }
    });
  };
  render() {
    const {
      shopName,
      shopUrl,
      logoPreviewUrl,
      hasShop,
      bannerPreviewUrl,
      firstAddress,
      secondAddress,
      postCode,
      selectedCity,
      cityText,
      city,
      email,
      disabled,
      isDuplicateName,
      isDuplicateEmail,
      isDuplicateUrl,
      loading,
      emailMessage
    } = this.state;
    const nameAlert = isDuplicateName ? (
      <Message color="yellow">
        The restaurant name is already taken. Please choose a different one.
      </Message>
    ) : (
      ""
    );
    const emailAlert = isDuplicateEmail ? (
      <Message color="yellow">{emailMessage}</Message>
    ) : (
      ""
    );

    return (
      <Container fluid={true}>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="12">
            <Image fluid src="/images/signup.png" />
            <hr></hr>
          </Col>
          <Col className="padding" lg="3">
            <Container fluid>
              <Header as="h2">3 Steps to get started </Header>

              <List>
                <List.Item icon="check" content="Fill out the form." />
                <List.Item
                  icon="check"
                  content="Submit proof of ownership eg. Passport or national identity."
                />
                <List.Item icon="check" content="Verification." />
              </List>
            </Container>
          </Col>
          <Col className="dashboard-panel" lg="6">
            <Message
              warning
              header="All fields marked with asterisk (*) are required."
            />
            <Message
              attached
              header="Restaurant Registration Form"
              content="Fill out the form below to register as a vendor"
            />
            <Form
              className="attached fluid segment"
              style={{
                width: "100%",
                margin: "auto",
                height: "auto",
                padding: 13,
              }}
              onSubmit={this.onSubmit}
            >
              {nameAlert}
              <Form.Field required>
                <label>Restaurant name</label>
                <input
                  className="capitalize"
                  type="text"
                  required
                  value={shopName}
                  onBlur={this.onBlur}
                  name="shopName"
                  onChange={this.onChange}
                  placeholder="Restaurant name"
                />
              </Form.Field>
              <Form.Field required>
                <label>Contact number</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  onChange={this.onChange}
                  placeholder="eg. 07857965032"
                />
              </Form.Field>

              <Message floating content="Restaurant address" />
              <Form.Field required>
                <label>Your restaurant's street address</label>
                <input
                  type="text"
                  required
                  value={firstAddress}
                  name="firstAddress"
                  onChange={this.onChange}
                  placeholder="eg. 22 Moat Drive"
                />
              </Form.Field>

              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Post code</label>
                  <input
                    type="text"
                    required
                    value={postCode}
                    name="postCode"
                    onChange={this.onChange}
                    placeholder="Post code"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>City</label>
                  <Dropdown
                    required
                    fluid
                    selection
                    search
                    defaultValue={selectedCity}
                    name="selectedCity"
                    label="City"
                    placeholder={cityText}
                    options={city}
                    onChange={this.onChangeDropdown}
                  />
                </Form.Field>
              </Form.Group>
              <Message floating content="Name of restaurant owner" />

              <Form.Group widths="equal">
                <Form.Field required>
                  <label>First name</label>
                  <input
                    className="capitalize"
                    type="text"
                    required
                    name="firstName"
                    onChange={this.onChange}
                    placeholder="First name"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Last name</label>
                  <input
                    className="capitalize"
                    type="text"
                    required
                    name="lastName"
                    onChange={this.onChange}
                    placeholder="Last name"
                  />
                </Form.Field>
              </Form.Group>
              <Message floating content="Login Details" />
              {emailAlert}
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    onBlur={this.onBlurEmail}
                    name="email"
                    onChange={this.onChange}
                    placeholder="Email"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    name="password"
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                </Form.Field>
              </Form.Group>
              <Button
                loading={loading}
                disabled={disabled}
                color="red"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <br />
            <br />
          </Col>
          <Col className="padding" lg="3">
            <Container fluid>
              <Header as="h2">What you will get</Header>

              <Header icon="bullhorn" color="red" as="h4">
                <Image circular src="/images/foodengo_marketing.png" /> Sales
                Boost
              </Header>
              <p>
                We will do the talking while you do the selling as we are
                obliged to utilize all marketing medium to reach out to your
                potential customers.
              </p>
              <Header color="red" as="h4">
                <Image circular src="/images/foodengo_camera.png" />
                Professional Photography
              </Header>
              <p>
                When you register with Foodengo, our photography team will take
                super high quality of the meals to help to showcase what you
                have got to sell our hungry customers.
              </p>
              <Header color="red" as="h4">
                <Image circular src="/images/foodengo_approve.png" />
                Brand Recognition
              </Header>
              <p>
                Our customers have the perception that all vendors were
                scruntinized accordingly.
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
