import React, { Component } from "react";
import SideMenu from "./SideMenu";
import { Container, Row, Col } from "reactstrap";
import { IMAGE_URL } from "../../utility/global";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
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
  componentDidMount() {
    this.props.fetchProducts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct) {
      this.props.products.unshift(nextProps.newProduct);
    }
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col lg="3">
          <br></br><br></br><br></br>
            {this.props.children}</Col>
          <Col style={{ paddingTop: 10 }} lg="8">
            <br></br><br></br><br></br>
            <React.Fragment>
              <Input style={{width:'100%'}}  type="text" placeholder="Search..." action>
                <input  />
                <Select compact options={options} defaultValue="meals" />
                <Button type="submit">Search</Button>
              </Input>
              <br />
              <br />
              <br />
              {this.props.products.map((seller) => {
                // const rating = { id: 2, value: seller.rating}
                return (
                  <Item.Group divided>
                    <Item>
                      <Item.Image
                        style={{ height: "auto" }}
                        src={`${IMAGE_URL}${seller.productImages[1].imagePath}`}
                      />

                      <Item.Content>
                        <Item.Header as="a">{seller.name}</Item.Header>
                        <Item.Meta>
                          <span className="cinema">
                            {seller.VirtualShop.shopName}
                          </span>
                        </Item.Meta>
                        <Item.Description>{seller.desc}</Item.Description>
                        <Item.Extra>
                <Label>£{seller.price}</Label>
                          <Rating
                            maxRating={5}
                            defaultRating={3}
                            icon="star"
                            size="huge"
                          />

                          <Button floated="right" animated="vertical">
                            <Button.Content hidden>Order</Button.Content>
                            <Button.Content visible>
                              <Icon name="shop" />
                            </Button.Content>
                          </Button>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                );
              })}
            </React.Fragment>
          </Col>
          <Col lg="1"></Col>
        </Row>
      </Container>
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
