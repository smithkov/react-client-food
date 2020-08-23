import React, { Component } from "react";
//import Grid from "@material-ui/core/Grid";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_USER,
} from "../utility/global";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Message,
  Icon,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import "date-fns";
//import MomentUtils from "@date-io/moment";

class Account extends Component {
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
    selectedPhoto: "",
    photoPreviewUrl: "",
    userId: "",

    //selectedDateStart: new Date("2014-08-18T21:11:54").setHours(10, 0, 0),
    //selectedDateEnd: new Date("2014-08-18T21:11:54").setHours(20, 0, 0),
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      if (user) {
        ClientService.findUserById(user.id)
          .then((response) => {
            const data = response.data.data;
            const {
              firstName,
              lastName,
              email,
              firstAddress,
              secondAddress,
              postCode,
              cityId,
              City,
              photo,
            } = data;
           
            const myPhoto = photo ? `${IMAGE_URL}${photo}` : "";
            this.setState({
              photoPreviewUrl: myPhoto,
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
  fileChangedHandler = (event) => {
    try {
      this.setState({
        selectedPhoto: event.target.files[0],
      });

      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          logoPreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    } catch (err) {
      console.log(err);
    }
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
      firstName,
      lastName,
      email,
      firstAddress,
      secondAddress,
      postCode,
      selectedCity,
      selectedPhoto,
      userId
    } = this.state;
    
    
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("firstAddress", firstAddress);
    formData.append("secondAddress", secondAddress);
    formData.append("postCode", postCode);
    formData.append("cityId", selectedCity);
    formData.append("photo", selectedPhoto);

    clientService
      .userUpdate(userId, formData)
      .then((response) => {
        console.log(response);
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
  fileChangedHandler = (event) => {
    try {
      this.setState({
        selectedPhoto: event.target.files[0],
      });

      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          photoPreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    } catch (err) {}
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
      photoPreviewUrl,
    } = this.state;

    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"My Account"} />
        <hr></hr>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
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
                  <label>Photo</label>
                  <input type="file" onChange={this.fileChangedHandler} />
                </Form.Field>

                <Form.Field>
                  <img
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                      height: 100,
                      width: "100",
                    }}
                    src={photoPreviewUrl ? photoPreviewUrl : DEFAULT_USER}
                  />
                </Form.Field>
              </Form.Group>
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
                  value={email}
                  name="email"
                  onChange={this.onChange}
                  placeholder="Email"
                />
              </Form.Field>

              <hr />

              <Message floating content="Home Address" />
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
          </Col>
        </Row>
      </Container>
    );
  }
}
Account.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});
export default connect(mapStateToProps, { fetchUser })(Account);
