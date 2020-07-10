import React, { Component } from "react";
import ClientService from "../services/clientService";
import NavBar from "./NavBar";
import { Grid, Image, Card, Header, Rating } from "semantic-ui-react";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";
import Footer from "./Footer";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  totalRating,
  displayRating
} from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";

export default class ProductDetail extends Component {
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
    overallRating: 0
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
      photo
    } = data;

    this.setState({
      overallRating:displayRating(productRatings),
      productId: id,
      name,
      photo,
      price,
      discountprice,
      desc,
      category: Category.name,
      shop: VirtualShop
    });

    clientService.findReviewByProduct({ productId }).then((response) => {
      this.setState({
        productRatings: response.data.data,
        
      });
    });
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
      productRatings
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
          <Grid.Row>
          
           
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <hr />
              <br />
              <br />
              <br />
              <Review
                productId={productId}
                isForShop={false}
                shopId={shop.id}
              />
              <hr />
              {this.state.productRatings.map((rating) => {
                return <ReviewList key={rating.id} data={rating} />;
              })}
            </Grid.Column>
            <Grid.Column width={8}></Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer/>
      </React.Fragment>
    );
  }
}
