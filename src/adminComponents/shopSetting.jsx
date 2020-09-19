import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import Wrapper from "./wrapper";
import { toast } from "react-toastify";
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
  Divider,
  Header,
  Segment,
  Label,
  Icon,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
const hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const min = [];
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
    minText: "",
    hourText: "",
    discountAmount: "",
    selectedMin: "",
    selectedHour: "",
    cboHours: [{ value: "", text: "--Select hour--" }].concat(
      hour.map((hour) => {
        return {
          key: hour,
          value: hour,
          text: hour,
        };
      })
    ),
    cboMins: [],
    percentageDiscount: "",
    notice: "",
    prepareTime: [],
  };

  componentDidMount = async () => {
    min.push("00");
    min.push("01");
    min.push("02");
    min.push("03");
    min.push("04");
    min.push("05");
    min.push("06");
    min.push("07");
    min.push("08");
    min.push("09");
    for (let i = 10; i < 60; i++) {
      min.push(i);
    }
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
            prepareTime,
          } = data;

          this.setState({
            cboMins: [{ value: "", text: "--Select mins--" }].concat(
              min.map((min) => {
                return {
                  key: min,
                  value: min,
                  text: min,
                };
              })
            ),
            deliveryPrice,
            minOrder,
            minTime,
            shopId: id,
            maxTime,
            notice,
            minText: prepareTime ? prepareTime.min : "Min(s)",
            hourText: prepareTime ? prepareTime.hour : "Hour(s)",
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
      selectedHour,
      selectedMin,
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
          prepareTime: { hour: selectedHour, min: selectedMin },
        })
        .then((response) => {
          toast.success(response.data.message, toastOptions());
        })
        .catch((err) => {
          const message = err.response.data.message;

          toast.success(message, toastOptions(true));
        });
    } else {
      toast.success(MISSING_USER_MSG, toastOptions(true));
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
      cboMins,
      cboHours,
      shopId,
      selectedHour,
      selectedMin,
      minText,
      hourText,
    } = this.state;

    return (
      <Container fluid={true}>
        <Wrapper>
          <Message attached header="Store settings" />

          <Segment>
            <Header as="h3">
              Delivery Time <Icon name="time" />
            </Header>
            <Form
              className="attached fluid segment"
              onSubmit={this.onSubmit}
              size="tiny"
            >
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
              <Button color="red" size="mini" type="submit">
                Save <Icon name="save" />
              </Button>
            </Form>
            <Divider hidden />
            <Divider section />
            <Header as="h3">
              Preparation Time <Icon name="hourglass one" />
            </Header>
            <Form onSubmit={this.onSubmit} size="tiny">
              <Form.Group>
                <Form.Field width={5}>
                  <label>Hour(s)</label>
                  <Form.Select
                    required
                    fluid
                    onChange={this.onChangeDropdown}
                    name="selectedHour"
                    options={cboHours}
                    placeholder={hourText}
                  />
                </Form.Field>
                <Form.Field width={5}>
                  <label>Min(s)</label>
                  <Form.Select
                    required
                    fluid
                    onChange={this.onChangeDropdown}
                    name="selectedMin"
                    options={cboMins}
                    placeholder={minText}
                  />
                </Form.Field>
              </Form.Group>
              <Button color="red" size="mini" type="submit">
                Save <Icon name="save" />
              </Button>
            </Form>
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

              <Button color="red" size="mini" type="submit">
                Save <Icon name="save" />
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

              <Button color="red" size="mini" type="submit">
                Save <Icon name="save" />
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
              <Button color="red" size="mini" type="submit">
                Save <Icon name="save" />
              </Button>
            </Form>
            <Divider section />
            <Header as="h3">
              Public Notice <Icon name="announcement" />
            </Header>
            <Form onSubmit={this.onSubmit} size="tiny">
              <Form.TextArea
                maxlength="200"
                name="notice"
                onChange={this.onChange}
                value={notice}
                placeholder="Write a short welcome message for customers..."
              />
              <Button color="red" size="mini" type="submit">
                Save <Icon name="save" />
              </Button>
              <br />
              <br />
            </Form>
          </Segment>
          <br />
          <br />
        </Wrapper>
      </Container>
    );
  }
}
