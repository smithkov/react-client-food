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
  getUserProfile,
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
} from "../utility/global";
import { Button, Dropdown, Form, Image } from "semantic-ui-react";
import AfterNav from "./common/afterNav";
//import "date-fns";
//import MomentUtils from "@date-io/moment";

export default class ShopForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    shopType: [],
    selectedShopType: "",
    shopTypeText:'Shop Types',
    showAlert: false,
    shopName: "",
    hasSave: true,
    message: "",
    hasShop:false,
    selectedLogo: null,
    selectedBanner: null,
    logoPreviewUrl: null,
    bannerPreviewUrl: null,

    //selectedDateStart: new Date("2014-08-18T21:11:54").setHours(10, 0, 0),
    //selectedDateEnd: new Date("2014-08-18T21:11:54").setHours(20, 0, 0),
  };

  fileChangedHandler = (event) => {
    try {
      this.setState({
        selectedLogo: event.target.files[0],
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

  fileChangedHandler2 = (event) => {
    this.setState({
      selectedBanner: event.target.files[0],
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        bannerPreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };
  componentDidMount() {
    ClientService.shopTypes()
      .then((response) => {
        let shopTypes = response.data.data.map((shopType) => {
          return {
            key: shopType.id,
            value: shopType.id,
            text: shopType.name,
          };
        });
        this.setState({
          shopType: [{ value: "", text: "--Select shop type--" }].concat(
            shopTypes
          ),
        });
      })
      .catch((err) => {
        //console.log(err);
      });

    ClientService.findShopByUser(getUserProfile().id)
      .then((response) => {
        const data = response.data.data;
        const { shopName, logo, shopBanners, ShopType } = data;
        

        this.setState({
          shopName: shopName,
          shopTypeText: ShopType.name,
          bannerPreviewUrl:
            shopBanners.length > 0
              ? `${IMAGE_URL}${shopBanners[0].bannerPath}`
              : DEFAULT_BANNER,
          logoPreviewUrl: logo ? `${IMAGE_URL}${logo}` : DEFAULT_LOGO,
          selectedShopType: ShopType.id,
          hasShop: data
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

  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selectedLogo,
      selectedBanner,
      shopName,
      selectedShopType
    } = this.state;
    let formData = new FormData();
    formData.append("logo", selectedLogo);
    formData.append("banner", selectedBanner);
    formData.append("shopName", shopName);
    formData.append("shopTypeId", selectedShopType);
    formData.append("userId", getUserProfile().id);
    if (getUserProfile()) {
      clientService
        .createShop(formData)
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
  render() {
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

    const {
      shopName,
      selectedShopType,
      shopType,
      logoPreviewUrl,
      hasShop,
      bannerPreviewUrl,
      shopTypeText
    } = this.state;
    console.log(selectedShopType);
    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={hasShop?"Update Shop": "Create Shop"} />
        <hr></hr>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
            <Form
              style={{
                width: "80%",
                margin: "auto",
                height: "auto",
                padding: 13,
              }}
              onSubmit={this.onSubmit}
            >
              <p class="h4 mb-4">Shop Details</p>
              {alert}
              
              <Dropdown
                fluid
                selection
                name="selectedShopType"
                label="Shop type"
                placeholder = {shopTypeText}
                options={shopType}
                onChange={this.onChangeDropdown}
              />
              <Form.Field>
                <label>Shop name</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  name="shopName"
                  onChange={this.onChange}
                  placeholder="Shop name"
                />
              </Form.Field>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>Logo</label>
                  <input type="file" onChange={this.fileChangedHandler} />
                </Form.Field>

                <Image
                  style={{ paddingTop: 5 }}
                  src={logoPreviewUrl || DEFAULT_LOGO}
                  size="small"
                />
              </Form.Group>
              <Form.Field>
                <label>Banner (728×90)</label>
                <input type="file" onChange={this.fileChangedHandler2} />
              </Form.Field>
              <br />
              <Image src={bannerPreviewUrl || DEFAULT_BANNER} />
              <br />
              
              <Button type="submit">Create Shop</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
