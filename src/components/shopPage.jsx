import React, { Component, createRef } from "react";
import ClientService from "../services/clientService";
import Geocode from "react-geocode";
import Footer from "./Footer";
import ErrorPage from "./errorPage";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  withGoogleMap,
  GoogleMap,
} from "google-maps-react";
import NavBar from "./NavBar";
import {
  Grid,
  Image,
  Tab,
  Message,
  Card,
  Icon,
  List,
  Button,
  Table,
  Header,
  Ref,
} from "semantic-ui-react";
import ItemCard from "./widgets/ItemCard";
import Order from "./widgets/order";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";
import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  Rating,
  formatPrice,
  getTempId,
  toastOptions,
  formatCurrentDay,
  formatCurrentTime,
  formatClose,
  days,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import Social from "../adminComponents/social";
import { toast } from "react-toastify";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const moment = require("moment");

class ShopPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isAllowUpdate: false,
    shopName: "",
    about: "",
    notice: "",
    minTime: "",
    maxTime: "",
    minOrder: "",
    percentageDiscount: "",
    discountAmount: "",
    bannerPreviewUrl: "",
    logoPreviewUrl: "",
    shopTypeText: "",
    products: [],
    shopId: "",
    lat: "",
    lng: "",
    firstAddress: "",
    postCode: "",
    city: "",
    comments: [],
    socials: "",
    orders: [],
    offerDiscount: 0,
    subTotal: 0,
    total: 0,
    deliveryPrice: 0,
    redirect: false,
    posterName: "",
    replyResult: "",
    sunMinDate: "",
    sunMaxDate: "",
    monMinDate: "",
    monMaxDate: "",
    tueMinDate: "",
    tueMaxDate: "",
    wedMinDate: "",
    wedMaxDate: "",
    thurMinDate: "",
    thurMaxDate: "",
    friMinDate: "",
    friMaxDate: "",
    satMinDate: "",
    satMaxDate: "",
    hasSun: false,
    hasMon: false,
    hasTue: false,
    hasWed: false,
    hasThur: false,
    hasFri: false,
    hasSat: false,
  };
  contextRef = createRef();
  componentWillUpdate(nextProps, nextState) {
    if (nextState.isAllowUpdate) {
      const {
        shopId,
        orders,
        subTotal,
        offerDiscount,
        total,
        deliveryPrice,
      } = nextState;
      const cart = clientService.cart({
        shopId,
        orders,
        subTotal,
        offerDiscount,
        total,
        deliveryPrice,
        tempId: getTempId(),
      });
    }
  }
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      if (user) {
        this.setState({
          posterName: user.firstName,
        });
      }
    }
  };
  componentDidMount = async () => {
    try {
      console.log(getTempId());
      const shopUrl = this.props.match.params.shopUrl;
      const getShop = await ClientService.findShopByUrl({ shopUrl });

      const data = getShop.data;

      const {
        id,
        shopName,
        about,
        logo,
        shopBanners,
        products,
        ShopType,
        notice,
        minTime,
        maxTime,
        minOrder,
        banner,
        percentageDiscount,
        discountAmount,
        City,
        postCode,
        firstAddress,
        socials,
        deliveryPrice,
      } = data;

      this.setState({
        shopId: id,
        shopName: shopName,
        notice,
        socials,
        minTime,
        maxTime,
        about,
        minOrder,
        orders: [],
        deliveryPrice: deliveryPrice ? deliveryPrice : 0,
        city: City ? City.name : "",
        postCode,
        firstAddress,
        percentageDiscount,
        discountAmount: discountAmount ? discountAmount : 0,
        logoPreviewUrl: logo ? `${IMAGE_URL}${logo}` : DEFAULT_LOGO,
        bannerPreviewUrl: banner ? `${IMAGE_URL}${banner}` : DEFAULT_BANNER,
      });

      clientService.productsByShopId(id).then((response) => {
        this.setState({
          products: response.data.data,
        });
      });
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
      Geocode.fromAddress(`${firstAddress}, ${City.name}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({
            lat: lat,
            lng: lng,
          });
        },
        (error) => {}
      );
      const openingTime = data.openingTimes;

      if (openingTime.length > 0) {
        const sunday = openingTime.find((t) => t.day === "Sunday");
        const monday = openingTime.find((t) => t.day === "Monday");
        const tuesday = openingTime.find((t) => t.day === "Tuesday");
        const wednesday = openingTime.find((t) => t.day === "Wednesday");
        const thursday = openingTime.find((t) => t.day === "Thursday");
        const friday = openingTime.find((t) => t.day === "Friday");
        const saturday = openingTime.find((t) => t.day === "Saturday");

        if (sunday) {
          this.setState({
            hasSun: true,
            sunMinDate: moment(sunday.opening),
            sunMaxDate: moment(sunday.closing),
          });
        }
        if (monday) {
          this.setState({
            hasMon: true,
            monMinDate: moment(monday.opening),
            monMaxDate: moment(monday.closing),
          });
        }
        if (tuesday) {
          this.setState({
            hasTue: true,
            tueMinDate: moment(tuesday.opening),
            tueMaxDate: moment(tuesday.closing),
          });
        }
        if (wednesday) {
          this.setState({
            hasWed: true,
            wedMinDate: moment(wednesday.opening),
            wedMaxDate: moment(wednesday.closing),
          });
        }
        if (thursday) {
          this.setState({
            hasThur: true,
            thurMinDate: moment(thursday.opening),
            thurMaxDate: moment(thursday.closing),
          });
        }
        if (friday) {
          this.setState({
            hasFri: true,
            friMinDate: moment(friday.opening),
            friMaxDate: moment(friday.closing),
          });
        }
        if (saturday) {
          this.setState({
            hasSat: true,
            satMinDate: moment(saturday.opening),
            satMaxDate: moment(saturday.closing),
          });
        }
      }
    } catch (err) {
      this.setState({
        redirect: true,
      });
    }
    const getCart = await clientService.getCartByTempId({
      shopId: this.state.shopId,
      tempId: getTempId(),
    });

    const data = getCart.data.data;

    if (data) {
      const { total, orders, subTotal, offerDiscount } = data;
      this.setState({
        total: total ? parseFloat(total) : 0,
        subTotal: subTotal ? parseFloat(subTotal) : 0,
        orders: orders ? orders : [],
        offerDiscount: offerDiscount ? parseFloat(offerDiscount) : 0,
      });
    }
    //console.log("get Cart", getCart.data);
  };
  handleAddOrder = async (data) => {
    try {
      this.setState({ isAllowUpdate: true });

      const newOrder = {
        name: data.name,
        quantity: 1,
        id: data.id,
        price: data.price,
      };

      const subTotal = parseFloat(newOrder.price) + this.state.subTotal;

      const findOrder = this.state.orders.find(
        (order) => order.id == newOrder.id
      );
      let newOfferDiscount = 0;
      let newTotal = 0;

      if (findOrder) {
        findOrder.quantity++;

        newOfferDiscount = this.findDiscount(subTotal);
        newTotal = this.getTotal(subTotal, newOfferDiscount);

        this.saveToServer =
          (this.state.shopId,
          this.state.orders,
          subTotal,
          newOfferDiscount,
          newTotal);
        this.setState({
          orders: [...this.state.orders],
          subTotal: subTotal,
          offerDiscount: newOfferDiscount,
          total: newTotal,
        });
        // const { shopName, orders, subTotal, offerDiscount, total } = this.state;
        // const cart = clientService.cart({
        //   shopName,
        //   data: { orders, subTotal, offerDiscount, total },
        // });
      } else {
        newOfferDiscount = this.findDiscount(subTotal);
        newTotal = this.getTotal(subTotal, newOfferDiscount);

        this.setState({
          orders: [...this.state.orders, newOrder],
          subTotal: subTotal,
          offerDiscount: newOfferDiscount,
          total: newTotal,
        });
        // const { shopName, orders, subTotal, offerDiscount, total } = this.state;
        // const cart = clientService.cart({
        //   shopName,
        //   data: { orders, subTotal, offerDiscount, total },
        // });
      }
      toast.success("Item was added successfully.", toastOptions());
    } catch (err) {}
  };

  handleRemoveOrder = (id) => {
    try {
      this.setState({ isAllowUpdate: true });
      const currentOrder = this.state.orders.filter((order) => order.id == id);
      const filteredOrder = this.state.orders.filter((order) => order.id != id);

      let subTotal =
        this.state.subTotal -
        parseFloat(currentOrder[0].price) *
          parseFloat(currentOrder[0].quantity);

      let newOfferDiscount = this.findDiscount(subTotal);
      let newTotal = this.getTotal(subTotal, newOfferDiscount);

      if (filteredOrder.length == 0) {
        newTotal = 0;
        newOfferDiscount = 0;
        subTotal = 0;
      }

      this.setState({
        orders: [...filteredOrder],
        subTotal: subTotal,
        offerDiscount: newOfferDiscount,
        total: newTotal,
      });
      toast.success("Item was removed successfully.", toastOptions());
    } catch (err) {}
  };
  handleTabChange = (e, { activeIndex }) => {
    if (activeIndex === 2) {
      const shopId = this.state.shopId;
      clientService
        .findReviewByShop({ shopId })
        .then((response) => {
          const data = response.data.data;
          this.setState({
            comments: data,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  findDiscount(subTotal) {
    const { percentageDiscount, discountAmount } = this.state;

    if (percentageDiscount && subTotal >= discountAmount) {
      return (percentageDiscount / 100) * subTotal;

      // this.setState({ subTotal: total - discountPercent });
    } else if (discountAmount && !percentageDiscount) return discountAmount;
    else return 0;
  }
  getTotal(subTotal, offerDiscount) {
    const { deliveryPrice } = this.state;

    return subTotal - offerDiscount + parseFloat(deliveryPrice);
  }
  handleReply = async (data) => {
    const { content, userId, ratingId } = data;
    const result = await clientService.createShopReviewResponse({
      content,
      userId,
      ratingId,
    });
    this.setState({ replyResult: result.data.data });
  };
  render() {
    if (this.state.redirect) {
      return <ErrorPage />;
    } else {
      const mapStyles = {
        width: "100%",
        margin: "auto",
        height: "100%",
      };
      const { socials } = this.state;
      let socialRender;
      const {
        hasSun,
        hasMon,
        hasTue,
        hasWed,
        hasThur,
        hasFri,
        hasSat,
        sunMinDate,
        sunMaxDate,
        monMinDate,
        monMaxDate,
        tueMinDate,
        tueMaxDate,
        wedMinDate,
        wedMaxDate,
        thurMinDate,
        thurMaxDate,
        friMinDate,
        friMaxDate,
        satMinDate,
        satMaxDate,
        about,
      } = this.state;

      if (socials.length > 0) {
        let social = socials[0];

        const facebook = social.facebook ? (
          <a target="blank" href={social.facebook}>
            <Button circular color="facebook" icon="facebook" />
          </a>
        ) : (
          ""
        );
        const twitter = social.twitter ? (
          <a target="blank" href={social.twitter}>
            <Button circular color="twitter" icon="twitter" />
          </a>
        ) : (
          ""
        );
        const instagram = social.instagram ? (
          <a target="blank" href={social.instagram}>
            <Button circular color="instagram" icon="instagram" />
          </a>
        ) : (
          ""
        );

        socialRender = (
          <div>
            {facebook}
            {instagram}
            {twitter}
          </div>
        );
      }
      const panes = [
        {
          menuItem: "Menu",
          render: () => (
            <React.Fragment>
              <Tab.Pane>
                <Grid stackable columns={3}>
                  {this.state.products.map((product) => {
                    return (
                      <ItemCard
                        handleAdd={this.handleAddOrder}
                        key={product.id}
                        product={product}
                      />
                    );
                  })}
                </Grid>
              </Tab.Pane>
            </React.Fragment>
          ),
        },
        {
          menuItem: "Info",
          render: () => (
            <Tab.Pane>
              <Grid style={{ height: 220, padding: 20 }} columns={2} padded>
                <Grid.Column>
                  <Card
                    header={this.state.firstAddress}
                    meta={this.state.city}
                    description={this.state.postCode}
                  />
                  {socialRender}
                </Grid.Column>
                <Grid.Column>
                  <Map
                    google={this.props.google}
                    zoom={15}
                    style={mapStyles}
                    initialCenter={{
                      lat: this.state.lat,
                      lng: this.state.lng,
                    }}
                  >
                    <Marker
                      position={{ lat: this.state.lat, lng: this.state.lng }}
                    />
                  </Map>
                </Grid.Column>
              </Grid>
              <hr></hr>

              <Grid padded>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as="h4">Opening hours</Header>
                    <hr />
                    <Table basic="very">
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>{formatCurrentDay("Sunday")}</Table.Cell>
                          <Table.Cell>
                            {hasSun
                              ? formatCurrentTime(
                                  "Sunday",
                                  sunMinDate,
                                  sunMaxDate
                                )
                              : formatClose(days.Sunday)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{formatCurrentDay("Monday")}</Table.Cell>
                          <Table.Cell>
                            {hasMon
                              ? formatCurrentTime(
                                  "Monday",
                                  monMinDate,
                                  monMaxDate
                                )
                              : formatClose(days.Monday)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{formatCurrentDay("Tuesday")}</Table.Cell>
                          <Table.Cell>
                            {hasTue
                              ? formatCurrentTime(
                                  "Tuesday",
                                  tueMinDate,
                                  tueMaxDate
                                )
                              : formatClose(days.Tuesday)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {formatCurrentDay("Wednesday")}
                          </Table.Cell>
                          <Table.Cell>
                            {hasWed
                              ? formatCurrentTime(
                                  "Wednesday",
                                  wedMinDate,
                                  wedMaxDate
                                )
                              : formatClose(days.Wednesday)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {formatCurrentDay("Thursday")}
                          </Table.Cell>
                          <Table.Cell>
                            {hasThur
                              ? formatCurrentTime(
                                  "Thursday",
                                  thurMinDate,
                                  thurMaxDate
                                )
                              : formatClose(days.Thursday)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>{formatCurrentDay("Friday")}</Table.Cell>
                          <Table.Cell>
                            {hasFri
                              ? formatCurrentTime(
                                  "Friday",
                                  friMinDate,
                                  friMaxDate
                                )
                              : formatClose(days.Friday)}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {formatCurrentDay("Saturday")}
                          </Table.Cell>
                          <Table.Cell>
                            {hasSat
                              ? formatCurrentTime(
                                  "Saturday",
                                  satMinDate,
                                  satMaxDate
                                )
                              : formatClose(days.Saturday)}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header as="h4">About us</Header>
                    <hr />
                    {about}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Tab.Pane>
          ),
        },
        {
          menuItem: "Rating",
          render: () => (
            <Tab.Pane>
              <Review
                isForShop={true}
                poster={this.state.posterName}
                shopId={this.state.shopId}
              />
              <hr></hr>
              {this.state.comments.map((comment) => {
                return (
                  <ReviewList
                    poster={this.state.posterName}
                    key={comment.id}
                    handleReply={this.handleReply}
                    replyResult={this.state.replyResult}
                    data={comment}
                  />
                );
              })}
            </Tab.Pane>
          ),
        },
      ];
      const styles = {
        height: 150,
        width: "100%",
        objectFit: "cover",
        objectPosition: "center center",
      };
      const {
        logoPreviewUrl,
        bannerPreviewUrl,
        notice,
        minTime,
        maxTime,
        minOrder,
        total,
        orders,
        percentageDiscount,
        discountAmount,
        subTotal,
        shopId,
        deliveryPrice,
        offerDiscount,
      } = this.state;

      const orderLength = orders.length;
      const hasOrder = orderLength > 0;

      const isShowDeliveryLimBox = subTotal < minOrder && orderLength > 0;

      return (
        <React.Fragment>
          <NavBar />
          <Ref innerRef={this.contextRef}>
            <Grid stackable style={{ margin: 70 }}>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image
                    className="img-resize"
                    src={logoPreviewUrl || DEFAULT_LOGO}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Image
                    style={styles}
                    className="img-resize"
                    src={bannerPreviewUrl}
                  />
                  {notice ? (
                    <Message
                      icon="announcement"
                      // header="Have you heard about our mailing list?"
                      content={notice}
                    />
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Message floating>
                    <Message.Header>{this.state.shopName}</Message.Header>
                  </Message>

                  <Message floating>
                    <List>
                      {percentageDiscount ? (
                        <List.Item>
                          <List.Icon color="red" name="fire" />
                          <List.Content className="red">
                            {" "}
                            {percentageDiscount}% off when you spend £
                            {discountAmount}
                          </List.Content>
                          <hr />
                        </List.Item>
                      ) : (
                        ""
                      )}
                      {minTime ? (
                        <List.Item>
                          <List.Icon name="shipping fast" />
                          <List.Content>
                            {" "}
                            Delivery {minTime}-{maxTime} mins
                          </List.Content>
                          <hr />
                        </List.Item>
                      ) : (
                        ""
                      )}
                    </List>
                    {!isShowDeliveryLimBox ? (
                      ""
                    ) : (
                      <div className="alertBox">{`Spend ${formatPrice(
                        minOrder - subTotal
                      )} more for delivery`}</div>
                    )}
                    {hasOrder ? (
                      <Table color="red">
                        <Table.Body>
                          {orders.map((order) => {
                            return (
                              <Order
                                handleRemove={this.handleRemoveOrder}
                                item={order}
                              />
                            );
                          })}
                        </Table.Body>
                      </Table>
                    ) : (
                      `There are no items in your basket`
                    )}

                    {hasOrder ? (
                      <Table color="orange">
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>SubTotal:</Table.Cell>
                            <Table.Cell textAlign="right">
                              {formatPrice(subTotal)}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Delivery:</Table.Cell>{" "}
                            <Table.Cell textAlign="right">
                              {formatPrice(deliveryPrice)}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Discount:</Table.Cell>{" "}
                            <Table.Cell textAlign="right">
                              {formatPrice(offerDiscount)}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Total:</Table.Cell>{" "}
                            <Table.Cell textAlign="right">
                              {formatPrice(total)}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    ) : (
                      ``
                    )}
                    {hasOrder ? (
                      <Link to={`/delivery/detail/${getTempId()}/${shopId}`}>
                        <Button
                          fluid
                          primary
                          disabled={
                            parseFloat(subTotal) <= parseFloat(minOrder)
                          }
                        >
                          Checkout
                        </Button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </Message>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Tab panes={panes} onTabChange={this.handleTabChange} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Ref>
          <Footer />
        </React.Fragment>
      );
    }
  }
}
ShopPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(
  GoogleApiWrapper({
    apiKey: "AIzaSyDSYuGeHrv1KmGmB-mU1PdtvBNozgoYctU",
  })(ShopPage)
);
