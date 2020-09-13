import React, { Component } from "react";
import Listing from "./widgets/Listing";
import SideMenu from "../adminComponents/common/sideMenu";
import StoreCard from "./widgets/storeCard";
import ProductCard from "./widgets/ItemCard";
import clientService from "../services/clientService";
import NavBar from "./NavBarCustomerDash";
import Footer from "./Footer";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DEFAULT_STORE_BANNER,
  DEFAULT_STORE_LOGO,
  totalRating,
  displayRating,
  SERVER_URL,
  ENDPOINT,
  formatPrice,
  storeNextOpening,
} from "../utility/global";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Grid,
  Image,
  Item,
  Label,
  Header,
  Rating,
  Select,
  Input,
  Card,
  List,
  Search,
  Table,
  Segment,
  Loader,
  Dimmer,
  Container,
  Message,
  Form,
  Dropdown,
} from "semantic-ui-react";
import Moment from "react-moment";
import moment from "moment";
const imageUrl = `${ENDPOINT}uploads`;
class CustomerAccount extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    city: [],
    selectedCity: "",
    showAlert: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firstAddress: "",
    secondAddress: "",
    postCode: "",
    message: "",
    cityText: "",
    userId: "",

    //selectedDateStart: new Date("2014-08-18T21:11:54").setHours(10, 0, 0),
    //selectedDateEnd: new Date("2014-08-18T21:11:54").setHours(20, 0, 0),
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      if (user) {
        clientService
          .findUserById(user.id)
          .then((response) => {
            const data = response.data.data;
            const {
              id,
              firstName,
              lastName,
              email,
              firstAddress,
              secondAddress,
              postCode,
              cityId,
              City,
            } = data;

            this.setState({
              firstName,
              lastName,
              email,
              firstAddress,
              secondAddress,
              postCode,
              userId: user.id,
              selectedCity: cityId,
              cityText: City ? City.name : "City",
            });
          })
          .catch((err) => {
            //console.log(err);
          });
      }
    }
  };

  componentDidMount = async () => {
    clientService
      .cities()
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
      firstName,
      lastName,
      email,
      firstAddress,
      secondAddress,
      postCode,
      selectedCity,
      userId,
    } = this.state;

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("firstAddress", firstAddress);
    formData.append("secondAddress", secondAddress);
    formData.append("postCode", postCode);
    formData.append("cityId", selectedCity);
    
    clientService
      .userUpdate(userId, formData)
      .then((response) => {
        this.setState({
          showAlert: true,
          message: response.data.message,
        });
      })
      .catch((err) => {
        const message = err.response.data.message;

        this.setState({ showAlert: true, message: message });
      });
  };
  render() {
    const userAlert = this.state.showAlert ? (
      <div className="ui info message">
        <p>{this.state.message}</p>
      </div>
    ) : (
      ""
    );

    const {
      firstName,
      lastName,
      email,
      firstAddress,
      secondAddress,
      selectedCity,
      postCode,
      city,
      cityText,
    } = this.state;
    return (
      <>
        <Container>
          <NavBar caption={`My Account`} />

          <Grid style={{ paddingTop: 100 }} stackable>
            <Grid.Column width={4}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              <Message attached header="Personal details" />
              <Form
                className="attached fluid segment"
                style={{
                  width: "auto",
                  margin: "auto",
                  height: "auto",
                  padding: 13,
                }}
                onSubmit={this.onSubmit}
              >
                {userAlert}

                <Form.Group widths="equal">
                  <Form.Field>
                    <label>First name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      name="firstName"
                      onChange={this.onChange}
                      placeholder="First name"
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Last name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      name="lastName"
                      onChange={this.onChange}
                      placeholder="Last name"
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    readOnly
                    value={email}
                    name="email"
                    onChange={this.onChange}
                    placeholder="Email"
                  />
                </Form.Field>

                <hr />

                <Message floating content="Delivery Address" />
                <Form.Field>
                  <label>Address 1</label>
                  <input
                    type="text"
                    required
                    value={firstAddress}
                    name="firstAddress"
                    onChange={this.onChange}
                    placeholder="Address 1"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address 2</label>
                  <input
                    type="text"
                    value={secondAddress}
                    name="secondAddress"
                    onChange={this.onChange}
                    placeholder="Address 2"
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Field>
                    <input
                      type="text"
                      required
                      value={postCode}
                      name="postCode"
                      onChange={this.onChange}
                      placeholder="Post code"
                    />
                  </Form.Field>

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
                </Form.Group>

                <Button color="red" type="submit">
                  Save <Icon name="save" />
                </Button>
              </Form>
              <br />
              <br />
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
}
CustomerAccount.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(CustomerAccount);
