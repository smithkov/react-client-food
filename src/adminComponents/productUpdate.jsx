import React from "react";

import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";
import AfterNav from "./common/afterNav";

import _ from "lodash";

import { Icon } from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import SaveSuccess from "./common/saveSuccess";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
  MISSING_USER_MSG,
  IMG_MAX_SIZE,
  ERROR_MSG,
  toastOptions,
  MEAL_CREATE,
  MEAL_LIST,
  SAVE_SUCCESS,
  IMAGE_URL,
} from "../utility/global";
import { Button, Message, Form } from "semantic-ui-react";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.state = {
      loadedFiles: [],
      name: "",
      desc: "",
      weight: "",
      price: "",
      origin: [],
      selectedPhoto: null,
      selectedOrigin: "",
      discountPrice: "",
      unitType: [],
      category: [],
      selectedUnitType: "",
      selectedCategory: "",
      showAlert: false,
      hasSave: true,
      message: "",
      hasError: false,
      hasImageLimit: false,
      redirect: false,
      photoPreviewUrl: null,
      categoryText: "",
      originText: "",
      unitText: "",
      oldPhoto: "",
      productId: "",
      userId:""
    };
  }
  componentDidMount = async () => {
    const productId = this.props.match.params.id;
    const getMealById = await clientService.productById(productId);

    if (getMealById) {
      const {
        name,
        desc,
        price,
        discountPrice,
        Category,
        weight,
        Origin,
        Unit,
        photo,
        id,
        userId
      } = getMealById.data.data;
      
      this.setState({
        name,
        desc,
        weight,
        price,
        userId,
        categoryText: Category ? Category.name : "",
        originText: Origin ? Origin.name : "",
        unitText: Unit ? Unit.name : "",
        discountPrice,
        origin: [],
        selectedPhoto: "",
        selectedOrigin: Origin ? Origin.id : "",
        selectedUnitType:Unit ? Unit.id : "",
        oldPhoto: photo,
        productId: id,
        selectedCategory: Category ? Category.id : "",
        photoPreviewUrl: photo ? `${IMAGE_URL}${photo}` : "",
      });
    }

    const unitResponse = await ClientService.unitTypes();
    let unitTypes = unitResponse.data.data.map((unitType) => {
      return {
        key: unitType.id,
        value: unitType.id,
        text: unitType.name,
      };
    });
    this.setState({
      unitType: [{ key: "", text: "--Select unit type--" }].concat(unitTypes),
    });

    const originResponse = await ClientService.origins();
    let origins = originResponse.data.data.map((origin) => {
      return {
        key: origin.id,
        value: origin.id,
        text: origin.name,
      };
    });
    this.setState({
      origin: [{ key: "", text: "--Select product origin--" }].concat(origins),
    });

    const categoryResponse = await ClientService.category();

    let categories = categoryResponse.data.data.map((category) => {
      return {
        key: category.id,
        value: category.id,
        text: category.name,
      };
    });
    this.setState({
      category: [{ value: "", text: "--Select category--" }].concat(categories),
    });
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
    }
  };
  fileChangedHandlerForPhoto = (event) => {
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
    } catch (err) {
      console.log(err);
    }
  };
  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
  };

  onUpload = async (e) => {
    e.preventDefault();
    const result = await clientService.hasAuth();
    const user = result.data.data;
    if (user) {
      const {
        discountPrice,
        selectedOrigin,
        selectedUnitType,
        selectedCategory,
        selectedPhoto,
        weight,
        price,
        name,
        desc,
        oldPhoto,
        productId,
        userId,
        shopId
      } = this.state;
      if (selectedPhoto ) {
        if (selectedCategory || selectedOrigin) {
          let formData = new FormData();

          if (discountPrice) formData.append("discountPrice", discountPrice);
          formData.append("price", price);
          formData.append("categoryId", selectedCategory);
          if (selectedUnitType) formData.append("unitId", selectedUnitType);
          if (weight) formData.append("weight", weight);
          formData.append("image", selectedPhoto);
          formData.append("name", name);
          formData.append("originId", selectedOrigin);
          formData.append("desc", desc);
          formData.append("photo", oldPhoto);
          formData.append("userId", userId);
          
          clientService
            .productUpdate(productId,formData)
            .then((response) => {
              if (!response.data.error) {
                this.props.history.push(`${MEAL_LIST}`);
              } else toast.success(response.data.message, toastOptions(true));
            })
            .catch((err) => {
              toast.success(ERROR_MSG, toastOptions(true));
            });
        } else {
          toast.success(
            "Please required options must be selected such as category and origin.",
            toastOptions(true)
          );
        }
      } else {
        toast.success(
          "A photo is required in order to proceed with update.",
          toastOptions(true)
        );
      }
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      name,
      price,
      weight,
      discountPrice,
      desc,
      category,
      unitType,
      origin,
      loadedFiles,
      message,
      hasImageLimit,
      redirect,
      photoPreviewUrl,
      categoryText,
      originText,
      unitText,
    } = this.state;

    const alert = this.state.showAlert ? (
      <div className="ui info message">
        <p>{message}</p>
      </div>
    ) : (
      ""
    );

    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Create Product"} />
        <hr></hr>
        <Row className="dash-layout">
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="8">
            {redirect ? (
              <SaveSuccess
                data={{
                  message: "Your meal was created successfully.",
                  btnText1: "Create Another Meal",
                  btnText2: "Go to Meal List",
                  url1: MEAL_CREATE,
                  url2: MEAL_LIST,
                }}
              />
            ) : (
              <div
                className="inner-container"
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form
                  style={{ width: "80%" }}
                  onSubmit={this.onUpload.bind(this)}
                >
                  {alert}
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Photo</label>
                      <input
                        type="file"
                        onChange={this.fileChangedHandlerForPhoto}
                      />
                    </Form.Field>
                    <Form.Field>
                      <img
                        style={{
                          objectFit: "cover",
                          objectPosition: "center center",
                          height: 100,
                          width: "100",
                        }}
                        src={photoPreviewUrl}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field required>
                    <label>Category</label>
                    <Form.Select
                      required
                      fluid
                      onChange={this.onChangeDropdown}
                      name="selectedCategory"
                      options={category}
                      placeholder={categoryText}
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Food origin</label>
                    <Form.Select
                      required
                      fluid
                      onChange={this.onChangeDropdown}
                      name="selectedOrigin"
                      options={origin}
                      placeholder={originText}
                    />
                  </Form.Field>

                  <Form.Field required>
                    <label>Food name</label>
                    <input
                      value={name}
                      type="text"
                      required
                      maxlength="40"
                      name="name"
                      onChange={this.onChange}
                      placeholder="Food name"
                    />
                  </Form.Field>
                  <Form.Field required>
                    <label>Price</label>
                    <input
                      value={price}
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      name="price"
                      onChange={this.onChange}
                      placeholder="Price"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Discount price</label>
                    <input
                      value={discountPrice}
                      type="number"
                      min="0"
                      step="0.01"
                      name="discountPrice"
                      onChange={this.onChange}
                      placeholder="Discount price"
                    />
                  </Form.Field>
                  <Form.Group widths="equal">
                    <Form.Select
                      fluid
                      label="Unit"
                      name="selectedUnitType"
                      options={unitType}
                      onChange={this.onChangeDropdown}
                      placeholder="Unit"
                    />
                    <Form.Input
                      fluid
                      label="Weight"
                      value={weight}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Field required>
                    <label>Food description</label>
                    <Form.TextArea
                      value={desc}
                      required
                      name="desc"
                      onChange={this.onChange}
                      placeholder="Food description"
                    />
                  </Form.Field>
                  <Button ref={this.buttonRef} type="submit">
                    Submit
                  </Button>
                </Form>{" "}
                {/* <AnchorButton
                text="Upload"
                intent={Intent.SUCCESS}
                onClick={this.onUpload.bind(this)}
              /> */}
                <p></p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
ProductForm.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(ProductForm);
