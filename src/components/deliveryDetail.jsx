import React, { Component } from "react";
import ClientService from "../services/clientService";
import NavBar from "./NavBar";
import {
  Grid,
  Image,
  Card,
  Header,
  Button,
  Form,
  Message,
} from "semantic-ui-react";
import ErrorPage from "./errorPage";
import ReviewList from "./widgets/reviewList";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  totalRating,
  displayRating,
  getTempId,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link, Redirect } from "react-router-dom";

export default class DeliveryDetail extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tempId: "",
    shopId: "",
    redirect: false,
    message: "",
  };
  componentDidMount = async () => {
    try {
      const shopId = this.props.match.params.sel;
      const tempId = this.props.match.params.by;
      this.setState({
        shopId,
        tempId,
      });
      const getCart = await clientService.getCartByTempId({
        shopId,
        tempId: getTempId(),
      });
      const data = getCart.data.data;
     
      if (!data)
        this.setState({
          redirect: true,
        });
    } catch (err) {
      this.setState({
        redirect: true,
      });
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (url) => {
    const { tempId, shopId } = this.state;
    const paymentProceed = await clientService.orderMessage({ tempId, shopId });
    if (!paymentProceed.data.error) {
    }
  };

  render() {
    const { redirect, shopId } = this.state;
    if (redirect) {
      return <ErrorPage />;
    } else {
      return (
        <React.Fragment>
          <NavBar />

          <Grid style={{ margin: 70 }} stackable>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6}>
              <Message
                style={{ textAlign: "center" }}
                attached
                header="Delivery Details"
              />
              <Form
                onSubmit={this.handleSubmit}
                className="attached fluid segment"
              >
                <Form.Field>
                  <label>Mobile number</label>
                  <input placeholder="Mobile number" />
                </Form.Field>
                <Form.Field>
                  <label>Address line 1</label>
                  <input placeholder="Address line 1" />
                </Form.Field>
                <Form.Field>
                  <label>Address line 2</label>
                  <input placeholder="Address line 2" />
                </Form.Field>
                <Form.Field>
                  <label>City</label>
                  <input placeholder="City" />
                </Form.Field>
                <Form.Field>
                  <label>Post code</label>
                  <input placeholder="Post code" />
                </Form.Field>
                <hr />
                <Message info>
                  <p>
                    Leave a note Contact-free delivery is now applied to all
                    orders. If your order includes alcohol please have your ID
                    ready for contact-free verification. Tell us about any
                    special delivery instructions below. Do not include details
                    about any allergies.
                  </p>
                </Message>
                <Form.TextArea
                  onChange={this.onChange}
                  name="message"
                  label="Leave a note"
                  placeholder="Eg. Please leave my order outside the door"
                />
                <Link to={`/payment/${getTempId()}/${shopId}`}>
                  <Button fluid primary>
                    Go to payment
                  </Button>
                </Link>
              </Form>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid>
        </React.Fragment>
      );
    }
  }
}
