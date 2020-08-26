import React, { Component } from "react";
import SideMenu from "./SideMenu";
import moment from "moment";
import { Container, Row, Col } from "reactstrap";
import {
  IMAGE_URL,
  totalRating,
  displayRating,
  formatPrice,
  LISTING_URL,
  isShopOpen,
  DAYS,
  LATER_TODAY,
  OPEN,
  NOT_OPEN,
  nextOpening,
} from "../../utility/global";
import { Link } from "react-router-dom";
import "./listing.css";
import BigLoader from "../bigLoader";
import EmptySearch from "../emptySearch";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productActions";

import {
  Button,
  Icon,
  Grid,
  Image,
  Item,
  Header,
  Rating,
  Select,
  Input,
  Card,
  Segment,
} from "semantic-ui-react";
import clientService from "../../services/clientService";

const options = [
  { key: "all", text: "All", value: "all" },
  { key: "meals", text: "Meals", value: "meals" },
  { key: "groceries", text: "Groceries", value: "groceries" },
];

class Listing extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    hasListing: false,
    products: [],
    productsClose: [],
    stores: [],
    search: "",
  };
  componentDidMount = async () => {
    this.props.fetchProducts("");
    const storeResponse = await clientService.storeListing();

    this.setState({
      stores: storeResponse.data.data,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSearch = async () => {
    this.props.fetchProducts(this.state.search);
  };
  componentWillReceiveProps(nextProps) {
    //console.log("will receive props", nextProps);
    const propProduct = nextProps.products;
    const productClose = nextProps.productsClose;

    this.setState({
      products: propProduct,
      productsClose: productClose,
      hasListing: true,
    });

    const newProducts = nextProps.newProduct;
    if (newProducts.length > 0) {
      this.state.products.unshift(newProducts);
    }
  }

  render() {
    const styles = {
      width: "100%",
      height: 150,
      objectFit: "cover",
      objectPosition: "center center",
    };
    const { products, productsClose, stores, hasListing } = this.state;

    return (
      <Grid style={{ paddingTop: 80 }} stackable>
        <Grid.Row>
          <Grid.Column style={{ paddingLeft: 40 }} width={3}>
            {this.props.children}
          </Grid.Column>
          <Grid.Column style={{ padding: 20 }} width={10}>
            <React.Fragment>
              <Input fluid type="text" placeholder="Search..." action>
                <input onChange={this.onChange} name="search" />

                <Button
                  basic
                  onClick={this.onSearch}
                  color="blue"
                  type="submit"
                >
                  Search
                </Button>
              </Input>
              <Card>
                <Card.Content>
                  <Image
                    floated="right"
                    circular
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                  />
                  <Card.Header>Steve Sanders</Card.Header>
                  <Card.Meta>Friends of Elliot</Card.Meta>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={true} />
                  <Card.Description>
                    Steve wants to add you to the group{" "}
                    <strong>best friends</strong>
                  </Card.Description>
                </Card.Content>
               
              </Card>
              {/* <h3>
                <Icon color="red" name="food" /> Available meals
              </h3>
              <hr /> */}

              {/* {hasListing ? (
                products.length > 0 ? (
                  products.map((seller) => {
                    return (
                      <React.Fragment>
                        <Grid
                          id={seller.id}
                          style={{ backgroundColor: "white", padding: 10 }}
                          stackable
                        >
                          <Grid.Row>
                            <Grid.Column width={5}>
                              <Card id={seller.id} fluid color="red" raised>
                                <Image
                                  style={styles}
                                  src={`${IMAGE_URL}${seller.photo}`}
                                  ui={false}
                                />
                              </Card>
                              <Link to={`/${seller.VirtualShop.shopUrl}`}>
                                <Button basic color="green" fluid>
                                  Order from seller
                                </Button>
                              </Link>
                            </Grid.Column>
                            <Grid.Column width={11}>
                              <Grid stackable>
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <h4>{seller.name}</h4>
                                    <span>{seller.desc}</span>
                                    <Header color="red" as="h4">
                                      {formatPrice(seller.price)}
                                    </Header>
                                    <Rating
                                      maxRating={5}
                                      rating={displayRating(
                                        seller.productRatings
                                      )}
                                      disabled
                                      icon="star"
                                      size="small"
                                    />{" "}
                                    | {totalRating(seller.productRatings)}
                                    <h5>
                                      {" "}
                                      <Link
                                        to={`/${seller.VirtualShop.shopUrl}`}
                                      >
                                        {seller.VirtualShop.shopName}
                                      </Link>
                                    </h5>
                                  </Grid.Column>
                                  <Grid.Column className="desc" width={8}>
                                    {seller.VirtualShop.maxTime ? (
                                      <p style={{ color: "green" }}>
                                        <Icon
                                          color="green"
                                          size="large"
                                          name="hourglass three"
                                        />
                                        {` ${seller.VirtualShop.minTime} - ${seller.VirtualShop.maxTime} mins`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.percentageDiscount ? (
                                      <p style={{ color: "red" }}>
                                        <Icon
                                          color="red"
                                          size="large"
                                          name="fire"
                                        />
                                        {`${seller.VirtualShop.percentageDiscount}% off when you spend £${seller.VirtualShop.discountAmount}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.minOrder ? (
                                      <p>
                                        <Icon size="large" name="money" />
                                        {` Minimum spend £${seller.VirtualShop.minOrder}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}

                                    {seller.VirtualShop.deliveryPrice ? (
                                      <p>
                                        <Icon size="large" name="truck" />
                                        {` Delivery £${seller.VirtualShop.deliveryPrice}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                     {seller.VirtualShop.prepareTime ? (
                                      <p>
                                        <Icon size="large" name="spinner" />
                                        {`Preparation ${seller.VirtualShop.prepareTime.hour} hour(s) ${seller.VirtualShop.prepareTime.min} min(s)`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <br />
                        <br />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <EmptySearch />
                )
              ) : (
                <BigLoader />
              )} */}
              <h3>
                <Icon color="red" name="food" /> Order for later
              </h3>
              <hr />
              {this.state.hasListing ? (
                productsClose.length > 0 ? (
                  productsClose.map((seller) => {
                    const shopTimes = seller.VirtualShop.openingTimes
                      .filter((time) => time.checked == true)
                      .sort((a, b) => a.dayNum - b.dayNum);

                    const currentDayNum = new Date().getDay();
                    //const currentDayWord = DAYS[currentDayNum];

                    let openStatus;
                    let shopTime;
                    let hasSetTimeForShop = shopTimes.length > 0;
                    let nextOpeningTime;

                    if (hasSetTimeForShop) {
                      shopTime = shopTimes.find((time) => {
                        return time.dayNum === currentDayNum;
                      });
                      const findIndexOf = shopTimes.indexOf(shopTime);
                      if (findIndexOf != -1) {
                        const nextday = nextOpening(shopTime, shopTimes);
                        nextOpeningTime = `Today at ${moment(
                          nextday.opening
                        ).format("LT")}`;
                      } else {
                        const nextday = nextOpening(shopTime, shopTimes);
                        nextOpeningTime = `Opens ${nextday.day} ${moment(
                          nextday.opening
                        ).format("LT")}`;
                        //console.log(moment(nextday.opening).format("LT"))
                      }
                    }

                    return (
                      <React.Fragment>
                        <Grid
                          id={seller.id}
                          style={{ backgroundColor: "white", padding: 10 }}
                          stackable
                        >
                          <Grid.Row>
                            <Grid.Column width={5}>
                              <Card id={seller.id} fluid color="red" raised>
                                <Image
                                  style={styles}
                                  src={`${IMAGE_URL}${seller.photo}`}
                                  ui={false}
                                />
                              </Card>
                              <Link to={`/${seller.VirtualShop.shopUrl}`}>
                                <Button basic color="green" fluid>
                                  Order from seller
                                </Button>
                              </Link>
                            </Grid.Column>
                            <Grid.Column width={11}>
                              <Grid stackable>
                                <Grid.Row>
                                  <Grid.Column width={8}>
                                    <h4>{seller.name}</h4>
                                    <span>{seller.desc}</span>
                                    <Header color="red" as="h4">
                                      {formatPrice(seller.price)}
                                    </Header>
                                    <Rating
                                      maxRating={5}
                                      rating={displayRating(
                                        seller.productRatings
                                      )}
                                      disabled
                                      icon="star"
                                      size="small"
                                    />{" "}
                                    | {totalRating(seller.productRatings)}
                                    <h5>
                                      {" "}
                                      <Link
                                        to={`/${seller.VirtualShop.shopUrl}`}
                                      >
                                        {seller.VirtualShop.shopName}
                                      </Link>
                                    </h5>
                                  </Grid.Column>
                                  <Grid.Column className="desc" width={8}>
                                    {seller.VirtualShop.maxTime ? (
                                      <p style={{ color: "green" }}>
                                        <Icon
                                          color="green"
                                          size="large"
                                          name="hourglass three"
                                        />
                                        {` ${seller.VirtualShop.minTime} - ${seller.VirtualShop.maxTime} mins`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.percentageDiscount ? (
                                      <p style={{ color: "red" }}>
                                        <Icon
                                          color="red"
                                          size="large"
                                          name="fire"
                                        />
                                        {`${seller.VirtualShop.percentageDiscount}% off when you spend £${seller.VirtualShop.discountAmount}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.minOrder ? (
                                      <p>
                                        <Icon size="large" name="money" />
                                        {` Minimum spend £${seller.VirtualShop.minOrder}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}

                                    {seller.VirtualShop.deliveryPrice ? (
                                      <p>
                                        <Icon size="large" name="truck" />
                                        {` Delivery £${seller.VirtualShop.deliveryPrice}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}

                                    {nextOpeningTime ? (
                                      <p>
                                        <Icon
                                          size="large"
                                          name="clock outline"
                                        />
                                        {nextOpeningTime}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.prepareTime ? (
                                      <p>
                                        <Icon size="large" name="spinner" />
                                        {`Preparation ${seller.VirtualShop.prepareTime.hour} hour(s) ${seller.VirtualShop.prepareTime.min} min(s)`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        <br />
                        <br />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <EmptySearch />
                )
              ) : (
                <BigLoader />
              )}
            </React.Fragment>
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
Listing.propTypes = {
  fetchProducts: PropTypes.array.isRequired,
  productsClose: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.products.items,
  productsClose: state.products.closeItems,
  newProduct: state.products.item,
});

export default connect(mapStateToProps, { fetchProducts })(Listing);
