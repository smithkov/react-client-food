import React, { Component } from "react";
import SideMenu from "./SideMenu";
import { Container, Row, Col } from "reactstrap";
import {
  IMAGE_URL,
  totalRating,
  displayRating,
  formatPrice,
} from "../../utility/global";
import { Link } from "react-router-dom";
import "./listing.css";

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
  componentDidMount() {
    this.props.fetchProducts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct) {
      this.props.products.unshift(nextProps.newProduct);
    }
  }

  render() {
    const styles = {
      width: "100%",
      height: 150,
      objectFit: "cover",
      objectPosition: "center center",
    };
    return (
      <Grid style={{ paddingTop: 80, paddingLeft: 30 }} stackable>
        <Grid.Row>
          <Grid.Column width={3}>{this.props.children}</Grid.Column>
          <Grid.Column width={10}>
            <React.Fragment>
              <Input fluid type="text" placeholder="Search..." action>
                <input />

                <Button color="blue" type="submit">Search</Button>
              </Input>
              <br />
              <br />
              <br />
              {this.props.products.map((seller) => {
                // const rating = { id: 2, value: seller.rating}
                return (
                  <React.Fragment>
                    <Grid style={{ backgroundColor: "#F2F2F2" }} stackable>
                      <Grid.Row>
                        <Grid.Column width={5}>
                          <Image
                            style={{
                              objectFit: "cover",
                              objectPosition: "center center",
                              height: 200,
                              width: "100%",
                            }}
                            src={`${IMAGE_URL}${seller.photo}`}
                            rounded
                          />
                        </Grid.Column>
                        <Grid.Column width={11}>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Header as="h4">{seller.name}</Header>
                                <span>{seller.desc}</span>
                                <Header color="red" as="h4">
                                  {formatPrice(seller.price)}
                                </Header>
                                <Rating
                                  maxRating={5}
                                  defaultRating={0}
                                  rating={displayRating(seller.productRatings)}
                                  disabled
                                  icon="star"
                                  size="small"
                                />{" "}
                                | {totalRating(seller.productRatings)}
                                <br />
                                <Link to={`/${seller.VirtualShop.shopUrl}`}>
                                  {seller.VirtualShop.shopName}
                                </Link>
                              </Grid.Column>
                              <Grid.Column width={8}>
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
              })}
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
