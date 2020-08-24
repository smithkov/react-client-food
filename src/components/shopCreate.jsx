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
  scrollToTop,
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
    origin: [],
    originText: "",
    selectedOrigin: "",
    isValidationError: false,
    validationMsg: "",
    loadingOrigin: true,
    loadingCity: true,
  };

  componentDidMount = async () => {
    const originResponse = await ClientService.origins();
    this.setState({
      loadingOrigin:false
    })
    let origins = originResponse.data.data.map((origin) => {
      return {
        key: origin.id,
        value: origin.id,
        text: origin.name,
      };
    });
    this.setState({
      origin: [{ key: "", text: "--Select food origin--" }].concat(origins),
    });
    const cityResponse = await ClientService.cities();
    this.setState({
      loadingCity:false
    })
    let cities = cityResponse.data.data.map((city) => {
      return {
        key: city.id,
        value: city.id,
        text: city.name,
      };
    });
    this.setState({
      city: [{ value: "", text: "--Select city--" }].concat(cities),
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
      selectedOrigin,
    } = this.state;

    try {
      if (selectedOrigin == "" || selectedCity == "") {
        this.setState({
          validationMsg: "City and origin are required",
          isValidationError: true,
        });
        scrollToTop();
      } else {
        this.setState({
          loading: true,
          disabled: true,
        });
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
          originId: selectedOrigin,
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
  onHandleTelephoneChange = (e) => {
    let phone = e.target.value;

    if (!Number(phone) && phone !== "") {
      return;
    }
    this.setState({
      [e.target.name]: phone,
    });
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
      originText,
      city,
      email,
      disabled,
      isDuplicateName,
      isDuplicateEmail,
      isDuplicateUrl,
      loading,
      emailMessage,
      selectedOrigin,
      origin,
      isValidationError,
      validationMsg,
      loadingCity,
      loadingOrigin
    } = this.state;
    const nameAlert = isDuplicateName ? (
      <Message color="yellow">
        The vendor's name is already taken. Please choose a different one.
      </Message>
    ) : (
      ""
    );
    const validationAlert = isValidationError ? (
      <Message color="yellow">{validationMsg}</Message>
    ) : (
      ""
    );
    const emailAlert = isDuplicateEmail ? (
      <Message color="yellow">{emailMessage}</Message>
    ) : (
      ""
    );
    const countryOptions = [
      { key: "gb", value: "gb", flag: "gb", text: "+44" },
    ];

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
                <List.Item icon="check" content="Verify your email address." />
                <List.Item
                  icon="check"
                  content="List your food menu and sample photos of foods on your menu."
                />
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
              header="Food Vendor Registration Form"
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
              {validationAlert}
              {nameAlert}
              <Form.Field required>
                <label>Business name</label>
                <input
                  className="capitalize"
                  type="text"
                  required
                  value={shopName}
                  onBlur={this.onBlur}
                  name="shopName"
                  onChange={this.onChange}
                  placeholder="Business name"
                />
              </Form.Field>
              <Message floating content="Business Phone Number" />
              <Form.Group>
                <Form.Field width={2}>
                  <label>Code</label>
                  <Form.Input readonly value="+44" />
                </Form.Field>
                <Form.Field width={5} required>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength="15"
                    value={this.state.phone}
                    onChange={this.onHandleTelephoneChange}
                    placeholder="eg. 07857965032"
                  />
                </Form.Field>
              </Form.Group>
              <Message floating content="Food Origin" />
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Food Origin</label>
                  <Dropdown
                    required
                    fluid
                    selection
                    search
                    defaultValue={selectedOrigin}
                    name="selectedOrigin"
                    label="Food Origin"
                    placeholder="Food origin"
                    options={origin}
                    onChange={this.onChangeDropdown}
                    loading={loadingOrigin}
                  />
                </Form.Field>
              </Form.Group>
              <Message floating content="Business Address" />
              <Form.Field required>
                <label>Street address</label>
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
                  <label>Post Code</label>
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
                    loading={loadingCity}
                  />
                </Form.Field>
              </Form.Group>
              <Message floating content="Your Name" />

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
                obliged to utilize all marketing media to reach out to your
                potential customers.
              </p>
              <Header color="red" as="h4">
                <Image circular src="/images/foodengo_camera.png" />
                Professional Photography
              </Header>
              <p>
                When you register with Foodengo, our photography team will take
                high resolution photos of what you sell for good presentation.
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
