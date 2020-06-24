import React from "react";

import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";
import AfterNav from "./common/afterNav";

import _ from "lodash";

import { Icon } from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
  MISSING_USER_MSG,
  IMG_MAX_SIZE,
} from "../utility/global";
import { Button, Message, Form } from "semantic-ui-react";

export default class ProductForm extends React.Component {
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
      selectedOrigin: "",
      discountPrice: "",
      quantity: "",
      unitType: [],
      category: [],
      selectedUnitType: "",
      selectedCategory: "",
      showAlert: false,
      hasSave: true,
      message: "",
      hasError: false,
      hasImageLimit: false,
    };
  }
  componentDidMount=async() =>{
    const result = await clientService.hasAuth();
    const user = result.data.data;

    if (user) {
      ClientService.unitTypes()
        .then((response) => {
          let unitTypes = response.data.data.map((unitType) => {
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
        })
        .catch((err) => {});

      ClientService.origins()
        .then((response) => {
          let origins = response.data.data.map((origin) => {
            return {
              key: origin.id,
              value: origin.id,
              text: origin.name,
            };
          });
          this.setState({
            origin: [{ key: "", text: "--Select product origin--" }].concat(
              origins
            ),
          });
        })
        .catch((err) => {});

      ClientService.category(user.id)
        .then((response) => {
          let categories = response.data.data.map((category) => {
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
        })
        .catch((err) => {});
    } else {
      this.buttonRef.current.disabled = true;
      this.setState({
        message: MISSING_USER_MSG,
        showAlert: true,
      });
    }
  }
  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
  };
  onFileLoad(e) {
    try {
      const file = e.currentTarget.files[0];
      const oldFile = e.currentTarget.files[0];
      const imageSize = (file.size / 1024) * 0.001;
      if (imageSize < IMG_MAX_SIZE) {
        this.setState({
          hasImageLimit: false,
        });
        let fileReader = new FileReader();
        fileReader.onload = () => {
          console.log("IMAGE LOADED: ", fileReader.result);

          const file = {
            data: fileReader.result,
            isUploading: false,
            file: oldFile,
          };
          //Add file

          this.addLoadedFile(file);
        };

        fileReader.onabort = () => {
          alert("Reading Aborted");
        };

        fileReader.onerror = () => {
          alert("Reading ERROR!");
        };

        fileReader.readAsDataURL(file);
      } else {
        this.setState({
          hasImageLimit: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  addLoadedFile(file) {
    this.setState((prevState) => ({
      loadedFiles: [...prevState.loadedFiles, file],
    }));
  }

  removeLoadedFile(file) {
    //Remove file from the State
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
        return ldFile != file;
      });
      return { loadedFiles: newLoadedFiles };
    });
  }

  removeAllLoadedFile() {
    this.setState({ loadedFiles: [] });
  }

  updateLoadedFile(oldFile, newFile) {
    this.setState((prevState) => {
      const loadedFiles = [...prevState.loadedFiles];
      _.find(loadedFiles, (file, idx) => {
        if (file == oldFile) loadedFiles[idx] = newFile;
      });

      return { loadedFiles };
    });

    return newFile;
  }

  onUpload = async (e) => {
    e.preventDefault();
    const result = await clientService.hasAuth();
    const user = result.data.data;
    if (user) {
      const {
        category,
        unitType,
        origin,
        discountPrice,
        selectedOrigin,
        selectedUnitType,
        selectedCategory,
        weight,
        price,
        quantity,
        name,
        desc,
      } = this.state;
      if (this.state.loadedFiles.length > 0) {
        let formData = new FormData();
        this.state.loadedFiles.forEach((file) => {
          formData.append("image", file.file);
        });
        formData.append("discountPrice", discountPrice);
        formData.append("price", price);
        formData.append("categoryId", selectedCategory);
        formData.append("unitId", selectedUnitType);
        formData.append("weight", weight);
        formData.append("quantity", quantity);
        formData.append("name", name);
        formData.append("originId", selectedOrigin);
        formData.append("desc", desc);
        formData.append("userId", user.id);

        //This shows progress bar on images
        const { loadedFiles } = this.state;
        loadedFiles.map((file, idx) => {
          //Update file (Change it's state to uploading)
          let newFile = this.updateLoadedFile(file, {
            ...file,
            isUploading: true,
          });
        });

        clientService
          .createProduct(formData)
          .then((response) => {
            this.setState({
              showAlert: true,
              message: response.data.message,
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              showAlert: true,
              message: err.response.data.message,
            });
          });
      } else {
        this.setState({
          showAlert: true,
          message: "At least one product photo is required.",
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
      unitType,
      origin,
      loadedFiles,
      message,
      hasImageLimit,
    } = this.state;
    const imgAlert = hasImageLimit ? (
      <Message
        warning
        header="Maximum image limit reached!"
        content="You can only be allowed a maximum image limit of 5MB"
      />
    ) : (
      ""
    );

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
            <div
              className="inner-container"
              style={{ padding: 10, display: "flex", flexDirection: "column" }}
            >
              {imgAlert}
              <div className="sub-header">Drag an Image</div>
              <div className="draggable-container">
                <input
                  type="file"
                  id="file-browser-input"
                  name="file-browser-input"
                  ref={(input) => (this.fileInput = input)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={this.onFileLoad.bind(this)}
                  onChange={this.onFileLoad.bind(this)}
                />
                <div className="files-preview-container ip-scrollbar">
                  {loadedFiles.map((file, idx) => {
                    return (
                      <div className="file" key={idx}>
                        <img src={file.data} />
                        <div className="container">
                          <span className="progress-bar">
                            {file.isUploading && <ProgressBar />}
                          </span>
                          <span
                            className="remove-btn"
                            onClick={() => this.removeLoadedFile(file)}
                          >
                            <Icon icon={remove} size={19} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="helper-text">Drag and Drop Images Here</div>
                <div className="file-browser-container">
                  <AnchorButton
                    text="Browse"
                    intent={Intent.PRIMARY}
                    minimal={true}
                    onClick={() => this.fileInput.click()}
                  />
                </div>
              </div>
              <hr></hr>
              <Form
                style={{ width: "80%" }}
                onSubmit={this.onUpload.bind(this)}
              >
                {alert}
                <Form.Select
                  fluid
                  onChange={this.onChangeDropdown}
                  name="selectedCategory"
                  label="Category"
                  options={category}
                  placeholder="Category"
                />
                <Form.Select
                  fluid
                  onChange={this.onChangeDropdown}
                  name="selectedOrigin"
                  label="Product origin"
                  options={origin}
                  placeholder="Product origin"
                />
                <Form.Field>
                  <label>Product name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    onChange={this.onChange}
                    placeholder="Product name"
                  />
                </Form.Field>
                <Form.Field>
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
                    required
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
                <Form.Field>
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="0"
                    name="quantity"
                    onChange={this.onChange}
                    placeholder="Quantity"
                  />
                </Form.Field>
                <Form.TextArea
                  name="desc"
                  onChange={this.onChange}
                  label="Product description"
                  placeholder="Product description"
                />
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
            </div>{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}
