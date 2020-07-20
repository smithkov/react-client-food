import React, { Component } from "react";
import SideMenu from "./SideMenu";
import { Container, Row, Col } from "reactstrap";
import {
  IMAGE_URL,
  totalRating,
  displayRating,
  formatPrice,
  LISTING_URL,
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
  };
  componentDidMount() {
    this.props.fetchProducts();
    
  }
  componentWillReceiveProps(nextProps) {
    console.log("will receive props", nextProps);
    const propProduct = nextProps.products;
    this.setState({
      products: propProduct,
      hasListing:true
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
    const { products } = this.state;
    return (
      <Grid style={{ paddingTop: 80 }} stackable>
        <Grid.Row>
          <Grid.Column style={{ paddingLeft: 40 }} width={3}>
            {this.props.children}
          </Grid.Column>
          <Grid.Column style={{ padding: 20 }} width={10}>
            <React.Fragment>
              <Input fluid type="text" placeholder="Search..." action>
                <input />

                <Button color="blue" type="submit">
                  Search
                </Button>
              </Input>
              <br />
              <br />
              <br />

              {this.state.hasListing ? (
                products.length > 0 ? (
                  products.map((seller) => {
                    // const rating = { id: 2, value: seller.rating}
                    return (
                      <React.Fragment>
                        <Grid
                          style={{ backgroundColor: "white", padding: 10 }}
                          stackable
                        >
                          <Grid.Row>
                            <Grid.Column width={5}>
                              <Card fluid color="red" raised>
                                <Image
                                  style={styles}
                                  src={`${IMAGE_URL}${seller.photo}`}
                                  ui={false}
                                />
                              </Card>
                              <Link to={`/${seller.VirtualShop.shopUrl}`}>
                                <Button basic color="red" fluid>
                                  Order from vendor
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
                                    <h5>{seller.VirtualShop.shopName}</h5>
                                  </Grid.Column>
                                  <Grid.Column className="desc" width={8}>
                                    {seller.VirtualShop.maxTime ? (
                                      <p>
                                        <Icon name="time" />
                                        {` ${seller.VirtualShop.minTime} - ${seller.VirtualShop.maxTime} mins`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.percentageDiscount ? (
                                      <p style={{ color: "red" }}>
                                        <Icon color="red" name="fire" />
                                        {`${seller.VirtualShop.percentageDiscount} % off when you spend £${seller.VirtualShop.discountAmount}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {seller.VirtualShop.minOrder ? (
                                      <p>
                                        <Icon name="money" />
                                        {` Minimum spend £${seller.VirtualShop.minOrder}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}

                                    {seller.VirtualShop.deliveryPrice ? (
                                      <p>
                                        <Icon name="truck" />
                                        {` Delivery £${seller.VirtualShop.deliveryPrice}`}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {/* <Link to={`/${seller.VirtualShop.shopUrl}`}>
                                  <Button fluid color="red">Order from vendor</Button>
                                </Link> */}
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
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.products.items,
  newProduct: state.products.item,
});

export default connect(mapStateToProps, { fetchProducts })(Listing);
