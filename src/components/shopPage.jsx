import React, { Component, createRef } from "react";
import ClientService from "../services/clientService";
import Geocode from "react-geocode";
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
} from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import Social from "../adminComponents/social";

class ShopPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isAllowUpdate: false,
    shopName: "",
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
  };
  contextRef = createRef();
  componentWillUpdate(nextProps, nextState) {
    if (nextState.isAllowUpdate) {
      const cart = clientService.cart({
        shopName: nextState.shopName,
        data: {
          orders: nextState.orders,
          subTotal: nextState.subTotal,
          offerDiscount: nextState.offerDiscount,
          total: nextState.total,
        },
      });
      console.log("orders", nextState.orders);
    }
  }
  componentDidMount = async () => {
    try {
      const shopUrl = this.props.match.params.shopUrl;
      const getShop = await ClientService.findShopByUrl({ shopUrl });

      const data = getShop.data;

      const {
        id,
        shopName,
        logo,
        shopBanners,
        products,
        ShopType,
        notice,
        minTime,
        maxTime,
        minOrder,
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
        minOrder,
        deliveryPrice: deliveryPrice ? deliveryPrice : 0,
        city: City ? City.name : "",
        postCode,
        firstAddress,
        percentageDiscount,
        discountAmount: discountAmount ? discountAmount : 0,
        shopTypeText: ShopType.name,
        logoPreviewUrl: logo ? `${IMAGE_URL}${logo}` : DEFAULT_LOGO,
        bannerPreviewUrl:
          shopBanners.length > 0
            ? `${IMAGE_URL}${shopBanners[0].bannerPath}`
            : DEFAULT_BANNER,
      });

      clientService.productsByShopId(id).then((response) => {
        this.setState({
          products: response.data.data,
        });
      });
      Geocode.setApiKey("AIzaSyDSYuGeHrv1KmGmB-mU1PdtvBNozgoYctU");
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
    } catch (err) {
      console.log(err);
    }
    const getCart = await clientService.getCart(this.state.shopName);

    const { total, subTotal, offerDiscount, orders } = getCart.data.data;
    console.log("getCart", getCart);

    if (orders.length > 0) {
      this.setState({
        total: total ? total : 0,
        subTotal: subTotal ? subTotal : 0,
        orders: orders,
        offerDiscount: offerDiscount ? offerDiscount : 0,
      });
    }
    //console.log("get Cart", getCart.data);
  };
  handleAddOrder = async (data) => {
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
  };

  handleRemoveOrder = (id) => {
    this.setState({ isAllowUpdate: true });
    const currentOrder = this.state.orders.filter((order) => order.id == id);
    const filteredOrder = this.state.orders.filter((order) => order.id != id);

    const subTotal =
      this.state.subTotal -
      parseFloat(currentOrder[0].price) * parseFloat(currentOrder[0].quantity);

    
    const newOfferDiscount = this.findDiscount(subTotal);
    const newTotal = this.getTotal(subTotal, newOfferDiscount);

    this.setState({
      orders: [...filteredOrder],
      subTotal: subTotal,
      offerDiscount: newOfferDiscount,
      total: newTotal,
    });
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

  render() {
    const mapStyles = {
      width: "100%",
      margin: "auto",
      height: "100%",
    };
    const { socials } = this.state;
    let socialRender;

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
              <Grid doubling relaxed="very" columns={3}>
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
        menuItem: "Contact Us",
        render: () => (
          <Tab.Pane>
            <div>
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
                    initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                  >
                    <Marker
                      position={{ lat: this.state.lat, lng: this.state.lng }}
                    />
                  </Map>
                </Grid.Column>
              </Grid>
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Rating",
        render: () => (
          <Tab.Pane>
            <Review isForShop={true} shopId={this.state.shopId} />
            <hr></hr>
            {this.state.comments.map((comment) => {
              return <ReviewList key={comment.id} data={comment} />;
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
                    <Button
                      fluid
                      primary
                      disabled={parseFloat(subTotal) <= parseFloat(minOrder)}
                    >
                      Checkout
                    </Button>
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
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSYuGeHrv1KmGmB-mU1PdtvBNozgoYctU",
})(ShopPage);
