import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Grid, Button, Label } from "semantic-ui-react";
import { IMAGE_URL,DEFAULT_LOGO } from "../../utility/global";

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
   
    const { name, image, price,productImages, Category } = this.props.product;
    return (
      <React.Fragment>
        <Grid.Column>
          <Card color="red">
            <Image style={styles} src={productImages.length>0? `${IMAGE_URL}${productImages[0].imagePath}`:DEFAULT_LOGO} ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                {" "}
                <Label key={name} size="medium">
                  £{price}
                </Label>
              </Card.Meta>
              <Card.Description>
                {Category ? Category.name : ""}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button fluid primary>
                Order
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
