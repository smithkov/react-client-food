import React, { Fragment } from "react";

import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";
import AfterNav from "./common/afterNav";

import _ from "lodash";

import { remove } from "react-icons-kit/fa/remove";
import { Link } from "react-router-dom";
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
  titleCase,
} from "../utility/global";
import {
  Button,
  Message,
  Form,
  Icon,
  Segment,
  Table,
  Input,
  Grid,
} from "semantic-ui-react";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
let count = 0;

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
      ingredients: [],
      ingredient: "",
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
      isLockButton: false,
      isSubmitLoading: false,
      shopId: "",
    };
  }
  componentDidMount = async () => {
    this.props.fetchUser();
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
     
      if (user) {
        this.setState({
          shopId: user.shopId,
        });
        const unitResponse = await ClientService.unitTypes();
        let unitTypes = unitResponse.data.data.map((unitType) => {
          return {
            key: unitType.id,
            value: unitType.id,
            text: unitType.name,
          };
        });
        this.setState({
          unitType: [{ key: "", text: "--Select unit type--" }].concat(
            unitTypes
          ),
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
          origin: [{ key: "", text: "--Select food origin--" }].concat(origins),
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
          category: [{ value: "", text: "--Select category--" }].concat(
            categories
          ),
        });
      }
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

    const {
      discountPrice,
      selectedOrigin,
      selectedUnitType,
      selectedCategory,
      selectedPhoto,
      weight,
      price,
      ingredients,
      name,
      desc,
      shopId,
    } = this.state;

    if (selectedPhoto) {
      if (selectedCategory && selectedOrigin) {
        //Lock submit button and show loading in the button
        this.setState({
          isLockButton: true,
          isSubmitLoading: true,
        });

        let formData = new FormData();
        if (discountPrice) formData.append("discountPrice", discountPrice);
        formData.append("price", price);
        formData.append("categoryId", selectedCategory);
        if (selectedUnitType) formData.append("unitId", selectedUnitType);
        if (weight) formData.append("weight", weight);
        formData.append("photo", selectedPhoto);
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("name", name);
        formData.append("originId", selectedOrigin);
        formData.append("desc", desc);
        formData.append("shopId", shopId);

        try {
          const response = await clientService.createProduct(formData);
          if (!response.data.error) {
            toast.success(response.data.message, toastOptions());
            this.setState({
              redirect: true,
            });
          } else toast.success(response.data.message, toastOptions(true));
        } catch (err) {
          toast.success(ERROR_MSG, toastOptions(true));
        }
        this.setState({
          isSubmitLoading: false,
          isLockButton: false,
        });
      } else {
        toast.success(
          "Please required options must be selected such as category and origin.",
          toastOptions(true)
        );
      }
    } else {
      toast.success("At least one food photo is required.", toastOptions(true));
    }
    //Release button and hide loading
  };
  removeIngredient = (id) => {
    this.setState({
      ingredients: [...this.state.ingredients.filter((item) => item.id !== id)],
    });
  };
  addIngredient = () => {
    count++;
    const ingredient = titleCase(this.state.ingredient);
    const ingredients = this.state.ingredients;
    const hasDuplicate = ingredients.find((item) => item.name === ingredient);
    if (!hasDuplicate) {
      if (ingredient != "") {
        ingredients.push({
          id: count,
          name: ingredient,
        });

        this.setState({
          ingredients: [...ingredients],
          ingredient: "",
        });
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
      category,
      ingredient,
      ingredients,
      unitType,
      origin,
      loadedFiles,
      message,
      hasImageLimit,
      redirect,
      photoPreviewUrl,
      isLockButton,
      isSubmitLoading,
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
        <AfterNav form={"Create Food"} />
        <hr></hr>
        <Row className="dash-layout">
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
            {redirect ? (
              <SaveSuccess
                data={{
                  message: "Your food was created successfully.",
                  btnText1: "Create another food",
                  btnText2: "Go to food list",
                  url1: MEAL_CREATE,
                  url2: MEAL_LIST,
                }}
              />
            ) : (
              <Fragment>
                <Message attached header="Create food" />
                <Form
                  className="attached fluid segment"
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
                      placeholder="Category"
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
                      placeholder="Food origin"
                    />
                  </Form.Field>

                  <Form.Field required>
                    <label>Food name</label>
                    <input
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
                    <Form.Input fluid label="Weight" onChange={this.onChange} />
                  </Form.Group>
                  <Form.Field fluid required>
                    <label>Food description</label>
                    <Form.TextArea
                      required
                      name="desc"
                      maxlength="120"
                      onChange={this.onChange}
                      placeholder="Food description"
                    />
                  </Form.Field>

                  <Grid fluid stackable columns={2} padded>
                    <Grid.Row>
                      <Grid.Column>
                        <Input
                          fluid
                          type="text"
                          name="ingredient"
                          value={ingredient}
                          onChange={this.onChange}
                          placeholder="Enter ingredients"
                          action
                        >
                          <input />
                          <Button
                            onClick={this.addIngredient}
                            color="green"
                            disabled={!ingredient}
                            type="button"
                          >
                            Add
                          </Button>
                        </Input>
                      </Grid.Column>
                      <Grid.Column></Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        {ingredients.length > 0 ? (
                          <Table fluid color="green">
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Ingredient</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {ingredients.map((item) => {
                                return (
                                  <Table.Row key={item.id}>
                                    <Table.Cell>
                                      {" "}
                                      <h4>{item.name}</h4>
                                    </Table.Cell>
                                    <Table.Cell textAlign="right">
                                      <Link
                                        title={`Remove ${item.name}`}
                                        onClick={() =>
                                          this.removeIngredient(item.id)
                                        }
                                      >
                                        <Icon
                                          color="red"
                                          size="large"
                                          name="minus circle"
                                        />
                                      </Link>{" "}
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table>
                        ) : (
                          ""
                        )}
                      </Grid.Column>

                      <Grid.Column></Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <hr />
                  <Button
                    color="red"
                    loading={isSubmitLoading}
                    disabled={isLockButton}
                    type="submit"
                  >
                    Save <Icon name="save" />
                  </Button>
                </Form>{" "}
                {/* <AnchorButton
                text="Upload"
                intent={Intent.SUCCESS}
                onClick={this.onUpload.bind(this)}
              /> */}
                <p></p>
              </Fragment>
            )}
            <br />
            <br />
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
