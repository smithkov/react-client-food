import React, { Component } from "react";
import ErrorPage from "./errorPage";
import NavBar from "./NavBar";
import PaypalBtn from "react-paypal-checkout";
import StripeCheckout from "react-stripe-checkout";
import {
  Grid,
  Image,
  Icon,
  Header,
  Button,
  Form,
  Message,
  Checkbox,
  Table,
  Accordion,
  Dropdown,
  Container,
} from "semantic-ui-react";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  totalRating,
  displayRating,
  PAYMENT_SUCCESS_URL,
  formatPrice,
  getTempId,
  TEMP_ID,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";
export default class Payment extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tempId: "",
    shopId: "",
    activeIndex: 0,
    redirect: false,
    total: 0,
    subTotal: 0,
    orders: [],
    offerDiscount: 0,
    deliveryPrice: 0,
    year: [],
    month: [],
    selectedYear: "",
    selectedMonth: "",
    shopName: "",
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
        shopId: shopId,
        tempId: getTempId(),
      });

      // Retrieve shop name for to include in payment description
      const result = await clientService.findShopById(shopId);
      const shopObject = result.data.data;
      this.setState({
        shopName: shopObject ? shopObject.shopName : "",
      });

      const data = getCart.data.data;

      if (!shopId || !tempId || data.orders.length < 1) {
        this.setState({
          redirect: true,
        });
      } else {
        const { total, subTotal, orders, offerDiscount, deliveryPrice } = data;
        this.setState({
          redirect: false,
          total,
          subTotal,
          shopId,
          offerDiscount,
          orders: orders ? orders : [],
          deliveryPrice,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        redirect: true,
      });
    }
  };
  stripeToken = async (token) => {
    const { total, tempId, shopName, shopId } = this.state;
    const desc = `refId: ${tempId}  store name: ${shopName}`;
    const product = { amount: total, desc };
    const body = {
      token,
      product,
    };
    const result = await clientService.stripePay({ token, product });

    if (result.data.error) {
      this.props.history.push(`/payment/error/${tempId}/${shopId}`);
    } else {
      const transac = await clientService.transaction({
        tempId: getTempId(),
        shopId: shopId,
      });
      if (transac.data.error)
        this.props.history.push(`/payment/error/${tempId}/${shopId}`);
      else {
        
        this.props.history.push(`/payment/success/${tempId}/${shopId}`);
        
      }
    }
  };
  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const {
      activeIndex,
      redirect,
      orders,
      total,
      offerDiscount,
      subTotal,
      deliveryPrice,
      year,
      month,
      tempId,
      shopId,
    } = this.state;
    if (redirect) {
      return <ErrorPage />;
    } else {
      const onSuccess = async (payment) => {
        // Congratulation, it came here means everything's fine!
        //console.log("The payment was succeeded!", payment);
        const { shopId } = this.state;
        const { paymentID, email } = payment;
        const transac = await clientService.transaction({
          tempId: getTempId(),
          shopId: shopId,
          paymentId: paymentID,
          paymentEmail: email,
        });

        this.props.history.push(`/payment/success/${tempId}/${shopId}`);
      };

      const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log("The payment was cancelled!", data);
      };

      const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        //console.log("Error!", err);
        this.props.history.push(`/payment/error/${tempId}/${shopId}`);
      };

      let env = "production"; // you can set here to 'production' for production
      let currency = "GBP"; // or you can set this value from your props or state

      let locale = "en_GB";
      // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
      let style = {
        label: "pay",
        tagline: false,
        size: "medium",
        shape: "pill",
        color: "gold",
      };

      const client = {
        sandbox:
          "AbXd8olHlByPObAylLiLc9KoI99qub1YLnHglMT0vHUmNWvPOKHsC0JLs0oDdQA_iJXmjaN11jFY5X3N",
        production: process.env.REACT_APP_PAYPALKEY,
      };

      return (
        <React.Fragment>
          <NavBar />
          <Container>
            <Grid style={{ margin: 70 }} stackable>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Grid stackable divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column width={9}>
                      <Accordion styled>
                        <Accordion.Title
                          active={activeIndex === 0}
                          index={0}
                          onClick={this.handleClick}
                        >
                          <Icon name="dropdown" />
                          Pay with debit or credit card
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                          <StripeCheckout
                            stripeKey={process.env.REACT_APP_STRIPEKEY}
                            token={this.stripeToken}
                            amount={total * 100}
                          >
                            <Button fluid primary>
                              Pay with card
                            </Button>
                          </StripeCheckout>
                          {/* <Form unstackable> */}
                          {/* <Form.Field>
                              <Image
                                src={`${IMAGE_URL}card_types.png`}
                                size="tiny"
                              />
                              <label>Card number</label>
                              <input />
                            </Form.Field>
                            <Form.Field>
                              <Checkbox label="Save this card" defaultChecked />
                            </Form.Field>

                            <label>Expiry date</label>
                            <Form.Group>
                              <Form.Field width={4}>
                                <Dropdown
                                  required
                                  selection
                                  search
                                  fluid
                                  name="selectedMonth"
                                  placeholder="MM"
                                  options={month}
                                  onChange={this.onChangeDropdown}
                                />
                              </Form.Field>
                              <Form.Field width={4}>
                                <Dropdown
                                  required
                                  selection
                                  fluid
                                  search
                                  name="selectedYear"
                                  placeholder="Year"
                                  options={year}
                                  onChange={this.onChangeDropdown}
                                />
                              </Form.Field>
                            </Form.Group>
                            <br />
                            <Form.Group>
                              <Form.Field width={4}>
                                <input />
                              </Form.Field>
                              <Form.Field width={4}>
                                <Image
                                  src={`${IMAGE_URL}card_sample.jpg`}
                                  size="tiny"
                                />
                              </Form.Field>
                            </Form.Group>

                            <label>Card holder name</label>
                            <input />
                            <br />
                            <br />
                            <Button onClick={this.onSubmit} fluid primary>
                              Place my order
                            </Button>
                          </Form> */}
                        </Accordion.Content>

                        <Accordion.Title
                          active={activeIndex === 1}
                          index={1}
                          onClick={this.handleClick}
                        >
                          <Icon name="dropdown" />
                          Pay with PayPal
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                          <PaypalBtn
                            env={env}
                            client={client}
                            currency={currency}
                            total={total}
                            locale={locale}
                            style={style}
                            onError={onError}
                            onSuccess={onSuccess}
                            onCancel={onCancel}
                          />
                        </Accordion.Content>

                        <Accordion.Title
                          active={activeIndex === 2}
                          index={2}
                          onClick={this.handleClick}
                        >
                          <Icon name="dropdown" />
                          Pay with cash
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                          <p></p>
                          <p></p>
                        </Accordion.Content>
                      </Accordion>
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <Table color="red">
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Your order</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {orders.map((order) => {
                            return (
                              <Table.Row>
                                <Table.Cell>{`${order.quantity}x ${order.name}`}</Table.Cell>
                                <Table.Cell textAlign="right">
                                  {formatPrice(order.price * order.quantity)}
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
                      <Table color="orange">
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Your order</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>Subtotal</Table.Cell>
                            <Table.Cell textAlign="right">
                              {formatPrice(subTotal)}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Delivery</Table.Cell>
                            <Table.Cell textAlign="right">
                              {formatPrice(deliveryPrice)}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Discount</Table.Cell>
                            <Table.Cell textAlign="right">
                              {formatPrice(offerDiscount)}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Total</Table.Cell>
                            <Table.Cell textAlign="right">
                              {formatPrice(total)}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid>
          </Container>
          <Footer />
        </React.Fragment>
      );
    }
  }
}
