import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
  getUserProfile,
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
} from "../utility/global";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Message,
  Input,
  Divider,
  Header,
  Segment,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
//import "date-fns";
//import MomentUtils from "@date-io/moment";

export default class ShopSetting extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    deliveryPrice: "",
    minOrder: "",
    maxTime: "",
    minTime: "",
  };

  componentDidMount() {
    ClientService.findShopByUser(getUserProfile().id)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        const { deliveryPrice, minOrder, maxTime, minTime } = data;

        this.setState({
          deliveryPrice,
          minOrder,
          maxTime,
          minTime,
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // onChangeDropdown = (e, data) => {
  //   this.setState({
  //     [data.name]: data.value,
  //   });
  // };

  onSubmit = (e) => {
    e.preventDefault();
    const { deliveryPrice, minOrder, maxTime, minTime } = this.state;

    if (getUserProfile()) {
      clientService
        .settings({ deliveryPrice, minOrder, maxTime, minTime })
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
    } else {
      this.setState({ showAlert: true, message: MISSING_USER_MSG });
    }
    //    clientService.createShop({

    //    })
  };
  // handleDateChangeStart = (date) => {
  //   this.setState({
  //     selectedDateStart: date._d,
  //   });
  // };
  // handleDateChangeEnd = (date) => {
  //   this.setState({
  //     selectedDateEnd: date._d,
  //   });
  // };
  onBlur = (e) => {
    const { shopName, initialShopName, initialShopUrl, shopUrl } = this.state;
    if (e.target.name == "shopName" && shopName !== initialShopName) {
      clientService.findShopByName({ shopName }).then((response) => {
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
      });
    }

    if (e.target.name == "shopUrl" && shopUrl !== initialShopUrl) {
      clientService.findShopByUrl({ shopUrl }).then((response) => {
        if (response.data) {
          this.setState({
            disabled: true,
            isDuplicateUrl: true,
          });
        } else {
          this.setState({
            disabled: false,
            isDuplicateUrl: false,
          });
        }
      });
    }
  };
  render() {
    const {
      shopName,
      shopUrl,
      selectedShopType,
      shopType,
      logoPreviewUrl,
      hasShop,
      bannerPreviewUrl,
      shopTypeText,
      firstAddress,
      secondAddress,
      postCode,
      selectedCity,
      cityText,
      city,
      disabled,
      isDuplicateName,
      isDuplicateUrl,
    } = this.state;
    const nameAlert = isDuplicateName ? (
      <Message color="yellow">
        The shop name already exist! Please choose a different one.
      </Message>
    ) : (
      ""
    );
    const urlAlert = isDuplicateUrl ? (
      <Message color="yellow">
        The shop url already exist! Please choose a different one.
      </Message>
    ) : (
      ""
    );
    let $logoPreview = (
      <div className="previewText image-container">
        Please select an Image for Preview
      </div>
    );
    if (this.state.logoPreviewUrl) {
      $logoPreview = (
        <div className="image-container">
          <img src={this.state.imagePreviewUrl} alt="icon" width="200" />{" "}
        </div>
      );
    }
    const alert = this.state.showAlert ? (
      <div className="ui info message">
        <p>{this.state.message}</p>
      </div>
    ) : (
      ""
    );

    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={hasShop ? "Update Shop" : "Create Shop"} />
        <hr></hr>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
            <Message attached header="Shop details" />
            <Segment>
              <Header as="h3">Section One</Header>
              <Form size="tiny" >
                <Form.Group widths="equal">
                  <Form.Field
                    label="First name"
                    control="input"
                    placeholder="First name"
                  />
                  <Form.Field
                    label="Last name"
                    control="input"
                    placeholder="Last name"
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
                <Divider hidden />
              </Form>

              <Divider section />

              <Header as="h3">Section Two</Header>
              <Image src="/images/wireframe/short-paragraph.png" />
            </Segment>
          </Col>
        </Row>
      </Container>
    );
  }
}
