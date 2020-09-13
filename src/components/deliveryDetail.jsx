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
import Footer from "./Footer";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
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
    firstAddress: "",
    secondAddress: "",
    postCode: "",
    phone: "",
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
      const result = await clientService.hasAuth();
      const auth = result.data.data;

      if (auth) {
        const user = await clientService.findUserById(auth.id);
        const { firstAddress, secondAddress, postCode, phone } = user.data.data;

        this.setState({
          firstAddress,
          secondAddress,
          postCode,
          phone,
        });
      }
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
  handleSubmit = async () => {
    const {
      tempId,
      shopId,
      firstAddress,
      secondAddress,
      postCode,
      message,
      phone,
    } = this.state;
    const paymentProceed = await clientService.orderMessage({
      tempId,
      shopId,
      message,
    });

    if (!paymentProceed.data.error) {
      const updateAddress = await clientService.updateUserAddress({
        firstAddress,
        secondAddress,
        postCode,
        phone,
      });
     
      this.props.history.push(`/payment/${getTempId()}/${shopId}`);
    } else {
    }
  };

  render() {
    const { redirect, shopId } = this.state;
    if (redirect) {
      return <ErrorPage />;
    } else {
      const { firstAddress, secondAddress, postCode, phone } = this.state;
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
                  <input
                    value={phone}
                    name="phone"
                    onChange={this.onChange}
                    
                    placeholder="Mobile number"
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Address line 1</label>
                  <input
                    value={firstAddress}
                    name="firstAddress"
                    onChange={this.onChange}
                    required
                    placeholder="Address line 1"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Address line 2</label>
                  <input
                    value={secondAddress}
                    name="secondAddress"
                    onChange={this.onChange}
                    placeholder="Address line 2"
                  />
                </Form.Field>

                <Form.Field required>
                  <label>Post code</label>
                  <input
                    value={postCode}
                    name="postCode"
                    onChange={this.onChange}
                    required
                    placeholder="Post code"
                  />
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
                <Button type="submit" fluid primary>
                  Go to payment
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid>
          <Footer/>
        </React.Fragment>
      );
    }
  }
}
