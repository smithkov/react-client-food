import React, { Fragment } from "react";

import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";

import _ from "lodash";

import { remove } from "react-icons-kit/fa/remove";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import SaveSuccess from "./common/saveSuccess";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import clientService from "../services/clientService";
import Wrapper from "./wrapper";
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
  Grid,
  Table,
  Input,
  Segment,
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
      selectedPhoto: null,
      discountPrice: "",
      unitType: [],
      unitText: "",
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
      oldPhoto: "",
      productId: "",
      userId: "",
      isLockButton: false,
      isSubmitLoading: false,
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
        ingredients,
        Category,
        weight,
        Unit,
        photo,
        id,
      } = getMealById.data.data;

      if (ingredients) {
        count = ingredients.length;
        this.setState({
          ingredients: ingredients,
        });
      }

      this.setState({
        name,
        desc,
        weight,
        price,
        unitText: Unit ? Unit.name : "Unit",
        categoryText: Category ? Category.name : "",
        discountPrice,
        selectedPhoto: photo,
        selectedUnitType: Unit ? Unit.id : "",
        oldPhoto: photo,
        productId: id,
        selectedCategory: Category ? Category.id : "",
        photoPreviewUrl: photo ? `${photo}` : "",
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

    const {
      discountPrice,
      selectedUnitType,
      selectedCategory,
      selectedPhoto,
      weight,
      price,
      ingredients,
      name,
      desc,
      oldPhoto,
      productId,
      shopId,
    } = this.state;
    if (selectedPhoto) {
      if (selectedCategory !== "") {
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
        formData.append("image", selectedPhoto);
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("photo", oldPhoto);

        try {
          const response = await clientService.productUpdate(
            productId,
            formData
          );
          if (!response.data.error) {
            this.props.history.push(`${MEAL_LIST}`);
          } else {
            toast.success(response.data.message, toastOptions(true));
          }
        } catch (err) {
          toast.success(ERROR_MSG, toastOptions(true));
        }
        //Release button and hide loading
        this.setState({
          isSubmitLoading: false,
          isLockButton: false,
        });
      } else {
        toast.success(
          "Please required options must be selected such as category.",
          toastOptions(true)
        );
      }
    } else {
      toast.success(
        "A photo is required in order to proceed with update.",
        toastOptions(true)
      );
    }

    //Release button and hide loading
    this.setState({
      isSubmitLoading: false,
      isLockButton: false,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
  render() {
    const {
      name,
      price,
      weight,
      discountPrice,
      desc,
      category,
      unitType,
      loadedFiles,
      message,
      hasImageLimit,
      redirect,
      photoPreviewUrl,
      categoryText,
      ingredient,
      ingredients,
      unitText,
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
        <Wrapper>
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
            <Fragment>
              <Message attached header="Update food" />
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
                    placeholder={categoryText}
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
                    placeholder={unitText}
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
                    maxlength="120"
                    name="desc"
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
                <hr></hr>
                <Button
                  color="red"
                  disabled={isLockButton}
                  loading={isSubmitLoading}
                  type="submit"
                >
                  Submit <Icon name="save" />
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
        </Wrapper>
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
