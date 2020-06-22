import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Grid, Button, Header, Rating } from "semantic-ui-react";
import { IMAGE_URL, DEFAULT_LOGO, displayRating,totalRating } from "../../utility/global";
import { Link } from "react-router-dom";

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = {
      height: 130,
      width: "100%",
      objectFit: "cover",
      objectPosition: "center center",
    };

    const { id, name, image, price, productImages, Category, productRatings } = this.props.product;
    
    return (
      <React.Fragment>
        <Grid.Column>
          <Card color="red">
            <Image
              style={styles}
              src={
                productImages.length > 0
                  ? `${IMAGE_URL}${productImages[0].imagePath}`
                  : DEFAULT_LOGO
              }
              ui={false}
            />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                {" "}
                <Header color="red" as="h4"> £{parseInt(price).toFixed(2)}</Header>
                <Rating
                maxRating={5}
                defaultRating={0}
                rating={displayRating(productRatings)}
                disabled
                icon="star"
                size="small"
              /> |  {totalRating(productRatings)}
              </Card.Meta>
              <Card.Description>
                {Category ? Category.name : ""}
               <Link to={`/item_meal_detail/product/${id}`}> <span style={{ float: "right" }}>Details</span></Link>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button type="button" onClick={()=>this.props.handleAdd(this.props.product)} fluid primary>
                Order
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}