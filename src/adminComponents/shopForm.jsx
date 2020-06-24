import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
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
} from "semantic-ui-react";
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
    shopTypeText: "Shop Types",
    showAlert: false,
    shopName: "",
    initialShopName: "",
    initialShopUrl: "",
    shopUrl: "",
    hasSave: true,
    message: "",
    selectedCity: "",
    city: [],
    hasShop: false,
    selectedLogo: null,
    selectedBanner: null,
    logoPreviewUrl: null,
    bannerPreviewUrl: null,
    firstAddress: "",
    secondAddress: "",
    postCode: "",
    cityText: "",
    disabled: false,
    isDuplicateUrl: false,
    isDuplicateName: false,

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
  componentDidMount = async () => {
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
    const result = await ClientService.hasAuth();
    const user = result.data.data;
    if (user) {
      ClientService.findShopByUser(user.id)
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          const {
            shopName,
            shopUrl,
            logo,
            shopBanners,
            cityId,
            ShopType,
            firstAddress,
            secondAddress,
            postCode,
            City,
          } = data;

          this.setState({
            shopName,
            shopTypeText: ShopType.name,
            bannerPreviewUrl:
              shopBanners.length > 0
                ? `${IMAGE_URL}${shopBanners[0].bannerPath}`
                : DEFAULT_BANNER,
            logoPreviewUrl: logo ? `${IMAGE_URL}${logo}` : DEFAULT_LOGO,
            selectedShopType: ShopType.id,
            hasShop: data,
            firstAddress,
            shopUrl,
            initialShopName: shopName,
            initialShopUrl: shopUrl,
            secondAddress: secondAddress == null ? "" : secondAddress,
            postCode,
            cityText: City ? City.name : "City",
            selectedCity: cityId,
          });
        })
        .catch((err) => {
          //console.log(err);
        });
    }
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
    const result = await clientService.hasAuth();
    const user = result.data.data;
    if (user) {
      const {
        selectedLogo,
        selectedBanner,
        shopName,
        shopUrl,
        selectedShopType,
        secondAddress,
        firstAddress,
        postCode,
        selectedCity,
      } = this.state;
      let formData = new FormData();
      formData.append("firstAddress", firstAddress);
      formData.append("secondAddress", secondAddress);
      formData.append("cityId", selectedCity);
      formData.append("postCode", postCode);
      formData.append("logo", selectedLogo);
      formData.append("banner", selectedBanner);
      formData.append("shopName", shopName);
      formData.append("shopUrl", shopUrl);
      formData.append("shopTypeId", selectedShopType);
      formData.append("userId", user.id);
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
              <p class="h4 mb-4">Shop Details</p>
              {alert}

              <Dropdown
                fluid
                selection
                name="selectedShopType"
                label="Shop type"
                placeholder={shopTypeText}
                options={shopType}
                onChange={this.onChangeDropdown}
              />
              {nameAlert}
              <Form.Field>
                <label>Shop name</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onBlur={this.onBlur}
                  name="shopName"
                  onChange={this.onChange}
                  placeholder="Shop name"
                />
              </Form.Field>
              {urlAlert}
              <Form.Field>
                <Input
                  name="shopUrl"
                  onBlur={this.onBlur}
                  onChange={this.onChange}
                  label="https://cookneat/"
                  placeholder="your-url.co.uk"
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
              <hr></hr>
              <Message floating content="Business Address" />
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

              <Button disabled={disabled} type="submit">
                Create Shop
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
