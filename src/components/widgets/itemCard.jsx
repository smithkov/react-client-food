import React, { Component } from "react";

import {
  Grid,
  Button,
  Header,
  Rating,
  Accordion,
  Table,
  Card,
  Icon,
  Image,
  List,
} from "semantic-ui-react";
import { DEFAULT_LOGO, displayRating, totalRating } from "../../utility/global";
import { Link } from "react-router-dom";

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeIndex: 0,
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const styles = {
      height: 130,
      width: "100%",
      objectFit: "cover",
      objectPosition: "center center",
    };
    const { activeIndex } = this.state;
    const {
      id,
      name,
      image,
      price,
      photo,
      Category,
      productRatings,
      ingredients,
    } = this.props.product;
    // alert(JSON.stringify(this.props.product))
    const isForMenu = this.props.isForMenu;

    return (
      <React.Fragment>
        <Grid.Column style={{ paddingBottom: 20 }}>
          <Card fluid color="red">
            <Image
              style={styles}
              src={photo ? `${photo}` : DEFAULT_LOGO}
              ui={false}
            />
            <Card.Content>
              <Header as="h4">{name}</Header>
              {isForMenu ? (
                ""
              ) : (
                <Link to={`/${this.props.product.VirtualShop.shopUrl}`}><Card.Meta>
                  {this.props.product.VirtualShop.shopName}
                  <hr></hr>
                </Card.Meta></Link>
              )}
              <Card.Meta>
                {" "}
                <Header color="red" as="h4">
                  {" "}
                  £{parseInt(price).toFixed(2)}
                </Header>
                <Rating
                  maxRating={5}
                  defaultRating={0}
                  rating={displayRating(productRatings)}
                  disabled
                  icon="star"
                  size="small"
                />{" "}
                | {totalRating(productRatings)}
              </Card.Meta>
              <Card.Description>
                {Category ? Category.name : ""}
                {isForMenu ? (
                  <Link to={`/item_meal/${id}`}>
                    {" "}
                    <span style={{ float: "right" }}>Details</span>
                  </Link>
                ) : (
                  ""
                )}
              </Card.Description>
              {isForMenu ? (
                ingredients.length > 0 ? (
                  <React.Fragment>
                    <hr />
                    <Accordion styled>
                      <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                      >
                        <Icon name="dropdown" />
                        Ingredients
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 1}>
                        <Table fluid color="green">
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Ingredient</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {ingredients.map((item) => {
                              return (
                                <Table.Row key={item.id}>
                                  <Table.Cell textAlign="left">
                                    <List>
                                      <List.Item>
                                        <List.Icon
                                          color="green"
                                          name="check circle"
                                        />
                                        <List.Content>
                                          <h6>{item.name}</h6>
                                        </List.Content>
                                      </List.Item>
                                    </List>
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })}
                          </Table.Body>
                        </Table>
                      </Accordion.Content>
                    </Accordion>
                  </React.Fragment>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Card.Content>
            {isForMenu ? (
              <Card.Content extra>
                <Button
                  basic
                  color="red"
                  type="button"
                  onClick={() => this.props.handleAdd(this.props.product)}
                  fluid
                  danger
                >
                  {`Add to basket  `} <Icon name="shopping basket" />
                </Button>
              </Card.Content>
            ) : (
              ""
            )}
            {isForMenu ? (
              ""
            ) : (
              <Card.Content extra>
                <Link to={`/${this.props.product.VirtualShop.shopUrl}`}>
                  <Button basic color="red" type="button" fluid danger>
                    {`Order from seller's store  `}
                  </Button>
                </Link>
              </Card.Content>
            )}
          </Card>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
