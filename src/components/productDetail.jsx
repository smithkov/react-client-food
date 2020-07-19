import React, { Component } from "react";
import ClientService from "../services/clientService";
import NavBar from "./NavBar";
import { Grid, Image, Card, Header, Rating } from "semantic-ui-react";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";
import Footer from "./Footer";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  totalRating,
  displayRating,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    productId: "",
    name: "",
    price: "",
    discountprice: "",
    desc: "",
    productImages: [],
    productRatings: [],
    category: "",
    shop: "",
    overallRating: 0,
    replyResult: "",
    posterName: "",
  };
  componentDidMount = async () => {
    const productId = this.props.match.params.id;

    const product = await ClientService.productById(productId);

    const data = product.data.data;
    //Get overall ratings
    let ratingCount = 0;
    const productRatings = data.productRatings;

    const {
      id,
      name,
      price,
      discountprice,
      desc,
      Category,
      VirtualShop,
      photo,
    } = data;

    this.setState({
      overallRating: displayRating(productRatings),
      productId: id,
      name,
      photo,
      price,
      discountprice,
      desc,
      category: Category.name,
      shop: VirtualShop,
    });

    clientService.findReviewByProduct({ productId }).then((response) => {
      this.setState({
        productRatings: response.data.data,
      });
    });
  };

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
  handleReply = async (data) => {
    const { content, userId, ratingId } = data;
    const result = await clientService.createProductRatingResponse({
      content,
      userId,
      ratingId,
    });
    this.setState({ replyResult: result.data.data });
  };
  render() {
    const styles = {
      objectFit: "cover",
      objectPosition: "center center",
      padding: 5,
    };
    const {
      photo,
      name,
      desc,
      price,
      category,
      shop,
      productId,
      overallRating,
      productRatings,
      replyResult,
      posterName,
    } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <Grid style={{ paddingTop: 80, paddingLeft: 30 }}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  width: "100%",
                }}
                src={`${IMAGE_URL}${photo}`}
                size="medium"
                rounded
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h1">{name}</Header>
              <span>{desc}</span>
              <Header color="red" as="h4">
                £{parseInt(price).toFixed(2)}
              </Header>
              <Rating
                maxRating={5}
                defaultRating={0}
                rating={overallRating}
                disabled
                icon="star"
                size="huge"
              />{" "}
              | {totalRating(productRatings)}
              <Header as="h4">{category}</Header>
              <Header as="h5">
                By{" "}
                {shop ? (
                  <Link to={`/${shop.shopUrl}`}>{shop.shopName}</Link>
                ) : (
                  ""
                )}
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <hr />
              <br />
              <br />
              <br />
              <Review
                poster={posterName}
                productId={productId}
                isForShop={false}
                shopId={shop.id}
              />
              <hr />
              {this.state.productRatings.map((rating) => {
                return (
                  <ReviewList
                    poster={posterName}
                    handleReply={this.handleReply}
                    replyResult={replyResult}
                    key={rating.id}
                    data={rating}
                  />
                );
              })}
            </Grid.Column>
            <Grid.Column width={8}></Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}
ProductDetail.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(ProductDetail);
