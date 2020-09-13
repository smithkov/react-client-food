import React, { Component } from "react";
import {
  DEFAULT_STORE_BANNER,
  DEFAULT_STORE_LOGO,
  totalRating,
  displayRating,
  SERVER_URL,
  ENDPOINT,
  storeNextOpening,
} from "../../utility/global";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Grid,
  Image,
  Item,
  Label,
  Header,
  Rating,
  Select,
  Input,
  Card,
  List,
  Search,
  Table,
  Segment,
  Loader,
  Dimmer,
  Container,
  Message,
} from "semantic-ui-react";
import moment from "moment";
export default class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    const {
      logo,
      banner,
      shopName,
      shopUrl,
      minTime,
      maxTime,
      percentageDiscount,
      discountAmount,
      minOrder,
      deliveryPrice,
      storeTime,
      ratings,
      Origin,
      isPreOrder,
    } = this.props.item;
    const isOpen = this.props.isOpen;
    const logoStyles = {
      height: 40,
      objectFit: "cover",
      objectPosition: "center center",
    };
    const styles = {
      height: 150,
      width: "100%",
      objectFit: "cover",
      objectPosition: "center center",
    };
    const nextOpening = storeNextOpening(storeTime[0]);
    return (
      <Grid.Column style={{ paddingBottom: 15 }}>
        <Link to={`/${shopUrl}`}>
          <Card raised color="red" fluid>
            <Card.Content>
              <Image
                floated="left"
                circular
                fluid
                size="mini"
                style={logoStyles}
                src={logo ? `${logo}` : DEFAULT_STORE_LOGO}
              />

              <Card.Header>{shopName}</Card.Header>
              <Card.Meta>{Origin.name}</Card.Meta>
              <img
                style={styles}
                src={banner ? `${banner}` : DEFAULT_STORE_BANNER}
              />

              <Card.Content extra>
                <Table very basic unstackable size="small" singleLine compact>
                  <Table.Row>
                    {minTime ? (
                      <Table.Cell textAlign="left">
                        <Card.Meta>
                          <Icon color="red" size="large" name="time" />
                          {`${minTime} - ${maxTime} mins`}
                        </Card.Meta>
                      </Table.Cell>
                    ) : (
                      <Table.Cell textAlign="left">
                        <Card.Meta>
                          <Icon color="red" size="large" name="time" />
                          {`0 mins`}
                        </Card.Meta>
                      </Table.Cell>
                    )}{" "}
                    {percentageDiscount ? (
                      <Table.Cell textAlign="right">
                        <Card.Meta>
                          <Icon color="red" size="large" name="fire" />
                          {`${percentageDiscount}% discount`}
                        </Card.Meta>
                      </Table.Cell>
                    ) : (
                      <Table.Cell textAlign="right"></Table.Cell>
                    )}
                  </Table.Row>
                </Table>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  <Icon
                    size="large"
                    color="green"
                    name="money bill alternate"
                  />
                  {` Minimum spend £${minOrder ? minOrder : "0"}`}
                </Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Meta>
                  <Icon size="large" name="truck" />
                  {` Delivery £${deliveryPrice ? deliveryPrice : "0"}`}
                </Card.Meta>
              </Card.Content>
              <Card.Description>
                <Rating
                  padding
                  maxRating={5}
                  rating={displayRating(ratings)}
                  disabled
                  icon="star"
                  size="small"
                />
                {isOpen ? (
                  ""
                ) : nextOpening ? (
                  isPreOrder ? (
                    <Label floated="right" color="red" size="medium">
                      <Icon name="clock outline" />
                      Pre-order
                    </Label>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </Card.Description>
              {isOpen ? (
                ""
              ) : (
                <Card.Meta style={{ paddingTop: 10 }}>
                  {nextOpening ? (
                    `Opening ${
                      new Date().getDay() === nextOpening.dayNum
                        ? "today at"
                        : `on ${nextOpening.day}`
                    } ${moment(nextOpening.opening).format("LT")}`
                  ) : (
                    <Button color="orange" fluid size="mini">
                      Temporarily closed
                    </Button>
                  )}
                </Card.Meta>
              )}
            </Card.Content>
          </Card>
        </Link>
      </Grid.Column>
    );
  }
}
