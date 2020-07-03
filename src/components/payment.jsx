import React, { Component } from "react";
import ErrorPage from "./errorPage";
import NavBar from "./NavBar";
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
import { PayPalButton } from "react-paypal-button-v2";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  totalRating,
  displayRating,
  PAY_STATUS_URL,
  formatPrice,
  getTempId,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link, Redirect } from "react-router-dom";

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
  };
  componentDidMount = async () => {
    try {
      const yearArray = [];
      let currentYear = new Date().getFullYear() - 2000;
      for (let i = 0; i < 10; i++) {
        yearArray.push({
          key: currentYear,
          value: currentYear,
          text: currentYear,
        });
        currentYear++;
      }
      this.setState({
        year: yearArray,
      });

      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const monthArray = months.map((month) => {
        return { key: month, value: month, text: month };
      });

      this.setState({
        month: monthArray,
      });

      const shopId = this.props.match.params.sel;
      const tempId = this.props.match.params.by;

      const getCart = await clientService.getCartByTempId({
        shopId: shopId,
        tempId: getTempId(),
      });
      const data = getCart.data.data;

      if (!data) {
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
  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
  };
  onSubmit = async () => {
    const { shopId } = this.state;
    const transac = await clientService.transaction({
      tempId: getTempId(),
      shopId: shopId,
    });
    this.props.history.push(`${PAY_STATUS_URL}`)
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
    } = this.state;
    if (redirect) {
      return <ErrorPage />;
    } else {
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
                          <Form unstackable>
                            <Form.Field>
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
                          </Form>
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
                          <PayPalButton
                            amount="0.01"
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details, data) => {
                              alert(
                                "Transaction completed by " +
                                  details.payer.name.given_name
                              );

                              // OPTIONAL: Call your server to save the transaction
                              return fetch("/paypal-transaction-complete", {
                                method: "post",
                                body: JSON.stringify({
                                  orderID: data.orderID,
                                }),
                              });
                            }}
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
                          <p>
                            Three common ways for a prospective owner to acquire
                            a dog is from pet shops, private owners, or
                            shelters.
                          </p>
                          <p>
                            A pet shop may be the most convenient way to buy a
                            dog. Buying a dog from a private owner allows you to
                            assess the pedigree and upbringing of your dog
                            before choosing to take it home. Lastly, finding
                            your dog from a shelter, helps give a good home to a
                            dog who may not find one so readily.
                          </p>
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
        </React.Fragment>
      );
    }
  }
}
