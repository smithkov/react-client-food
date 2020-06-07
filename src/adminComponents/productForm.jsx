import React from "react";

import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";

import _ from "lodash";

import { Icon } from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import { getUserProfile, MISSING_USER_MSG, ERROR_MSG } from "../utility/global";
import { Button, Checkbox, Form } from "semantic-ui-react";

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
      showLoader: false,
    };
  }
  componentDidMount() {
    if (getUserProfile()) {
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

      ClientService.category(getUserProfile().id)
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
  onFileLoad(e) {
    const file = e.currentTarget.files[0];
    const oldFile = e.currentTarget.files[0];

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

  onUpload(e) {
    this.setState({
      showLoader: true,
    });
    e.preventDefault();
    if (this.state.loadedFiles.length > 0) {
      var formData = new FormData();
      this.state.loadedFiles.forEach((file) => {
        formData.append("image", file.file);
      });
      formData.append("discountPrice", this.state.discountPrice);
      formData.append("price", this.state.price);
      formData.append("unitId", this.state.selectedUnitType);
      formData.append("weight", this.state.weight);
      formData.append("name", this.state.name);
      formData.append("desc", this.state.desc);
      formData.append("userId", getUserProfile().id);
      clientService
        .createProduct(formData)
        .then((response) => {
          this.setState({
            showAlert: true,
            message: response.data.message,
            showLoader: false,
          });
        })
        .catch((err) => {
          this.setState({
            showLoader: false,
          });
        });
      const { loadedFiles } = this.state;

      loadedFiles.map((file, idx) => {
        console.log("Updating...");
        console.log(file);
        //Update file (Change it's state to uploading)
        let newFile = this.updateLoadedFile(file, {
          ...file,
          isUploading: true,
        });
      });
    } else {
      this.setState({
        showAlert: true,
        message: "At least one product photo is required.",
        showLoader: false,
      });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { loadedFiles } = this.state;
    const alert = this.state.showAlert ? (
      <div className="ui info message">
        
        <p>
          {this.state.message}
        </p>
      </div>
    ) : (
      ""
    );
    //   Variable that checks for form submission
    // const submit = this.showLoader ? (
    //   <button
    //     ref={this.buttonRef}
    //     class="btn btn-info btn-block"
    //     type="submit"
    //     disabled
    //   >
    //     <span
    //       class="spinner-grow spinner-grow-sm"
    //       role="status"
    //       aria-hidden="true"
    //     ></span>
    //     saving...
    //   </button>
    // ) : (
    //   <button class="btn btn-info btn-block" ref={this.buttonRef} type="submit">
    //     Save
    //   </button>
    // );
    //end of submit render
    return (
      <Container fluid={true}>
        <Nav />
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
                  label="Category"
                  options={this.state.category}
                  placeholder="Category"
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
                    options={this.state.unitType}
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
