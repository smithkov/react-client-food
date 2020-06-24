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
  Divider,
  Header,
  Segment,
  Label,
  Icon,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
//import "date-fns";
//import MomentUtils from "@date-io/moment";

const durations = [];

export default class ShopSetting extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    shopId: "",
    deliveryPrice: "",
    minOrder: "",
    maxTime: "",
    minTime: "",
    showAlert: false,
    message: "",
    discountAmount: "",
    percentageDiscount: "",
    notice: "",
  };

  componentDidMount = async () => {
    const result = await ClientService.hasAuth();
    const user = result.data.data;
    if (user) {
      ClientService.findShopByUser(user.id)
        .then((response) => {
          const data = response.data.data;

          const {
            id,
            percentageDiscount,
            discountAmount,
            notice,
            deliveryPrice,
            minOrder,
            maxTime,
            minTime,
          } = data;

          this.setState({
            deliveryPrice,
            minOrder,
            minTime,
            shopId: id,
            maxTime,
            notice,
            percentageDiscount,
            discountAmount,
          });
        })
        .catch((err) => {
          //console.log(err);
        });
    }
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

  onSubmit = (e) => {
    e.preventDefault();

    const {
      percentageDiscount,
      discountAmount,
      notice,
      deliveryPrice,
      minOrder,
      maxTime,
      minTime,
      shopId,
    } = this.state;

    if (shopId) {
      clientService
        .settings(shopId, {
          percentageDiscount,
          discountAmount,
          notice,
          deliveryPrice,
          minOrder,
          maxTime,
          minTime,
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
  };

  render() {
    const {
      percentageDiscount,
      discountAmount,
      notice,
      deliveryPrice,
      minOrder,
      maxTime,
      minTime,
      shopId,
      message,
      showAlert,
    } = this.state;

    const alert = showAlert ? (
      <div className="ui info message">
        <p>{message}</p>
      </div>
    ) : (
      ""
    );

    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Shop Settings"} />
        <hr></hr>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
            <Message attached header="Shop settings" />

            <Segment>
              <Header as="h3">
                Delivery <Icon name="time" />
              </Header>
              <Form onSubmit={this.onSubmit} size="tiny">
                <Form.Group>
                  <Form.Field width={5}>
                    <label>Min. delivery time</label>
                    <Input
                      value={minOrder}
                      labelPosition="right"
                      min="0"
                      max="120"
                      onChange={this.onChange}
                      name="minTime"
                      type="number"
                      placeholder="Min. delivery time"
                    >
                      <input />
                      <Label>mins</Label>
                    </Input>
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Max. delivery time (120 mins)</label>
                    <Input
                      labelPosition="right"
                      min="0"
                      max="120"
                      value={maxTime}
                      onChange={this.onChange}
                      name="maxTime"
                      type="number"
                      placeholder="Max. delivery time"
                    >
                      <input />
                      <Label>mins</Label>
                    </Input>
                  </Form.Field>
                </Form.Group>
                <br />
                <Button size="mini" type="submit">
                  Save
                </Button>
              </Form>
              <Divider hidden />
              <Divider section />

              <Header as="h3">
                Delivery Price <Icon name="money" />
              </Header>
              <Form onSubmit={this.onSubmit} size="tiny">
                <Form.Field width={5}>
                  <label>Delivery price</label>
                  <Input
                    labelPosition="right"
                    min="0"
                    step="0.01"
                    value={deliveryPrice}
                    type="number"
                    onChange={this.onChange}
                    name="deliveryPrice"
                    placeholder="Delivery price"
                  >
                    <Label basic>£</Label>
                    <input />
                    <Label>.00</Label>
                  </Input>
                </Form.Field>

                <Button size="mini" type="submit">
                  Save
                </Button>
              </Form>
              <Divider section />
              <Header as="h3">
                Minimum Order <Icon name="minus" />
              </Header>
              <Form onSubmit={this.onSubmit} size="tiny">
                <Form.Field width={5}>
                  <label>Minimum order </label>
                  <Input
                    labelPosition="right"
                    min="0"
                    value={minOrder}
                    name="minOrder"
                    step="0.01"
                    onChange={this.onChange}
                    type="number"
                    placeholder="Minimum order"
                  >
                    <Label basic>£</Label>
                    <input />
                    <Label>.00</Label>
                  </Input>
                </Form.Field>

                <Button size="mini" type="submit">
                  Save
                </Button>
              </Form>
              <Divider section />
              <Header as="h3">
                Discount <Icon name="tag" />
              </Header>
              <Form onSubmit={this.onSubmit} size="tiny">
                <Form.Group>
                  <Form.Field width={5}>
                    <label>Percentage discount</label>
                    <Input
                      labelPosition="right"
                      min="0"
                      max="100"
                      step="0.01"
                      value={percentageDiscount}
                      onChange={this.onChange}
                      name="percentageDiscount"
                      type="number"
                      placeholder="Discount"
                    >
                      <input />
                      <Label>%</Label>
                    </Input>
                  </Form.Field>

                  <Form.Field width={5}>
                    <label>When you spend</label>
                    <Input
                      labelPosition="right"
                      min="0"
                      step="0.01"
                      value={discountAmount}
                      onChange={this.onChange}
                      name="discountAmount"
                      type="number"
                      placeholder="Spend"
                    >
                      <Label basic>£</Label>
                      <input />
                      <Label>.00</Label>
                    </Input>
                  </Form.Field>
                </Form.Group>

                <br />
                <Button size="mini" type="submit">
                  Save
                </Button>
              </Form>
              <Divider section />
              <Header as="h3">
                Public Notice <Icon name="announcement" />
              </Header>
              <Form onSubmit={this.onSubmit} size="tiny">
                <Form.TextArea
                  maxlength="300"
                  name="notice"
                  onChange={this.onChange}
                  value={notice}
                  placeholder="Write a short welcome message for customers..."
                />
                <Button size="mini" type="submit">
                  Save
                </Button>
                <br />
                <br />
              </Form>
            </Segment>
          </Col>
        </Row>
      </Container>
    );
  }
}
