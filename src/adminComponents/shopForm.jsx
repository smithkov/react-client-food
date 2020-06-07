import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import { getUserProfile, MISSING_USER_MSG, ERROR_MSG } from "../utility/global";
import { MDBAlert } from "mdbreact";

export default class ShopForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    shopType: [],
    selectedShopType: "",
    showAlert: false,
    shopName: "",
    hasSave: true,
    message: "",
  };
  componentDidMount() {
    ClientService.shopTypes()
      .then((response) => {
        //const data = response.data;
        console.log(response);
        console.log("response.data.data");
        let shopTypes = response.data.data.map((shopType) => {
          return { value: shopType.id, display: shopType.name };
        });
        this.setState({
          shopType: [{ value: "", display: "--Select shop type--" }].concat(
            shopTypes
          ),
        });
        // this.setState({
        //   sellers: response.data.data,
        // });
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
  onSubmit = (e) => {
    e.preventDefault();

    if (getUserProfile()) {
      clientService
        .createShop({
          shopName: this.state.shopName,
          shopTypeId: this.state.selectedShopType,
          userId: getUserProfile().id,
        })
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
  render() {
    const alert = this.state.showAlert ? (
      <MDBAlert color="info">{this.state.message}</MDBAlert>
    ) : (
      ""
    );
    const isDisableSubmit = this.state.selectedShopType ? "disabled" : "";
    return (
      <Container fluid={true}>
        <Nav />
        <Row style={{ paddingTop: "10px", height: 600 }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="6">
            <form
              onSubmit={this.onSubmit}
              class="text-center border border-light p-5"
              action="#!"
            >
              <p class="h4 mb-4">Shop Details</p>
              {alert}
              <input
                type="text"
                required
                name="shopName"
                onChange={this.onChange}
                id="defaultContactFormName"
                class="form-control mb-4"
                placeholder="Name"
              />

              <select
                class="browser-default custom-select mb-4"
                name="selectedShopType"
                required
                value={this.state.selectedShopType}
                onChange={this.onChange}
              >
                {this.state.shopType.map((shopType) => (
                  <option key={shopType.value} value={shopType.value}>
                    {shopType.display}
                  </option>
                ))}
              </select>
              <button class="btn btn-info btn-block" type="submit">
                Create Shop
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}
