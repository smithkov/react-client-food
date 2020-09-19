import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import Wrapper from "./wrapper";
import {
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  DEFAULT_LOGO,
  toastOptions,
} from "../utility/global";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Message,
  Input,
  Icon,
  Popup,
  Label,
  Placeholder,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { toast } from "react-toastify";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class ShopForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showAlert: false,
    shopName: "",
    about: "",
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
    cityText: "City",
    disabled: false,
    isDuplicateUrl: false,
    isDuplicateName: false,
    loading: false,
    shopId: "",
    selectedOrigin: "",
    origin: [],
    originText: "",
    loadingOrigin: true,
    loadingCity: true,
    hasLoaded: false,
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      if (user) {
        ClientService.findShopById(user.shopId)
          .then((response) => {
            const data = response.data.data;
            const {
              shopName,
              shopUrl,
              logo,
              shopBanners,
              cityId,
              firstAddress,
              secondAddress,
              postCode,
              about,
              City,
              Origin,
              banner,
              id,
            } = data;

            this.setState({
              hasLoaded: true,
              shopName,
              shopId: id,
              bannerPreviewUrl: banner ? `${banner}` : DEFAULT_BANNER,
              logoPreviewUrl: logo ? `${logo}` : DEFAULT_LOGO,
              hasShop: data,
              firstAddress,
              shopUrl,
              about,
              selectedOrigin: Origin ? Origin.id : "",
              initialShopName: shopName,
              initialShopUrl: shopUrl,
              secondAddress: secondAddress == null ? "" : secondAddress,
              postCode,
              cityText: City ? City.name : "City",
              originText: Origin ? Origin.name : "Origin",
              selectedCity: cityId,
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
    this.props.fetchUser();
    const originResponse = await ClientService.origins();
    this.setState({
      loadingOrigin: false,
    });
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
      loadingCity: false,
    });
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
      selectedLogo,
      selectedBanner,
      shopName,
      shopUrl,
      secondAddress,
      firstAddress,
      postCode,
      selectedCity,
      about,
      loading,
      disabled,
      shopId,
      selectedOrigin,
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
    formData.append("originId", selectedOrigin);
    formData.append("shopId", shopId);
    formData.append("about", about);

    this.setState({
      loading: true,
      disabled: true,
    });
    try {
      const updateResponse = await clientService.updateShop(formData);

      toast.success(updateResponse.data.message, toastOptions(false));
    } catch (err) {
      toast.success(err.response.data.message, toastOptions(true));
    } finally {
      this.setState({
        loading: false,
        disabled: false,
      });
    }
  };

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
      logoPreviewUrl,
      hasShop,
      bannerPreviewUrl,
      firstAddress,
      secondAddress,
      postCode,
      selectedCity,
      cityText,
      city,
      disabled,
      loading,
      isDuplicateName,
      isDuplicateUrl,
      about,
      selectedOrigin,
      origin,
      originText,
      loadingOrigin,
      loadingCity,
      hasLoaded,
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

    return (
      <Container fluid={true}>
        <Wrapper>
          <Message attached header="My store" />
          <Form
            loading={!hasLoaded}
            className="attached fluid segment"
            style={{
              width: "100%",
              margin: "auto",
              height: "auto",
              padding: 13,
            }}
            onSubmit={this.onSubmit}
          >
            <p class="h4 mb-4">Store Details</p>

            {nameAlert}
            <Form.Field required>
              <label>Store name</label>
              <input
                type="text"
                required
                value={shopName}
                onBlur={this.onBlur}
                name="shopName"
                onChange={this.onChange}
                placeholder="Store name"
              />
            </Form.Field>
            {urlAlert}
            <Form.Field>
              <Input
                name="shopUrl"
                value={shopUrl}
                onBlur={this.onBlur}
                onChange={this.onChange}
                label="https://foodengo.co.uk/"
                placeholder="your-store-url"
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
            <Form.Field required>
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
                  loading={loadingCity}
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
                  placeholder={originText}
                  options={origin}
                  onChange={this.onChangeDropdown}
                  loading={loadingOrigin}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Popup
                trigger={<label>About your store (recommended)</label>}
                content="Enter your cooking qualifications, years of cooking experience, etc."
                position="top left"
              />

              <Form.TextArea
                required
                name="about"
                value={about}
                maxlength="1000"
                onChange={this.onChange}
                placeholder="About your store"
              />
            </Form.Field>

            <Button
              color="red"
              loading={loading}
              disabled={disabled}
              type="submit"
            >
              Save store <Icon name="save" />
            </Button>
          </Form>
          <br />
          <br />
        </Wrapper>
      </Container>
    );
  }
}
ShopForm.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});
export default connect(mapStateToProps, { fetchUser })(ShopForm);
