import React, { Component } from "react";
import Listing from "./widgets/Listing";
import SideMenu from "./widgets/SideMenu";
import clientService from "../services/clientService";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {
  IMAGE_URL,
  DEFAULT_STORE_BANNER,
  DEFAULT_STORE_LOGO,
  totalRating,
  displayRating,
} from "../utility/global";
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
  Table,
  Segment,
} from "semantic-ui-react";

class StoreListing extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    stores: [],
  };
  // componentDidMount() {
  //   ClientService.products()
  //     .then((response) => {
  //       //const data = response.data;
  //       console.log(response.data.data[0]);
  //       this.setState({
  //         sellers: response.data.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  componentDidMount = async () => {
    const storeResponse = await clientService.storeListing();

    this.setState({
      stores: storeResponse.data.data,
    });
  };

  render() {
    const { stores } = this.state;
    const styles = {
      height: 150,
      width: "100%",
      objectFit: "cover",
      objectPosition: "center center",
    };
    const logoStyles = {
      height: 40,
      objectFit: "cover",
      objectPosition: "center center",
    };
    return (
      <div>
        <Grid stackable style={{ paddingTop: 140 }}>
          <NavBar />
          <Grid.Column width={4}>
            <SideMenu />
          </Grid.Column>
          <Grid.Column width={10}>
            <Grid stackable>
              <Grid.Row style={{ margin: "auto" }} columns={3}>
                {stores.map((item) => {
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
                  } = item;
                  return (
                    <Grid.Column style={{ paddingBottom: 15 }}>
                      <Link to={`/${shopUrl}`}>
                        <Card raised color="orange" fluid>
                          <Card.Content>
                            <Image
                              floated="left"
                              circular
                              fluid
                              size="mini"
                              style={logoStyles}
                              src={
                                logo
                                  ? `${IMAGE_URL}/${logo}`
                                  : DEFAULT_STORE_LOGO
                              }
                            />

                            <Card.Header>{shopName}</Card.Header>
                            <Card.Meta>{item.Origin.name}</Card.Meta>
                            <img
                              style={styles}
                              src={
                                banner
                                  ? `${IMAGE_URL}/${banner}`
                                  : DEFAULT_STORE_BANNER
                              }
                            />

                            <Card.Content extra>
                              <Table
                                very
                                basic
                                unstackable
                                size="small"
                                singleLine
                                compact
                              >
                                <Table.Row>
                                  {minTime ? (
                                    <Table.Cell textAlign="left">
                                      <Card.Meta>
                                        <Icon
                                          color="red"
                                          size="large"
                                          name="time"
                                        />
                                        {`${minTime} - ${maxTime} mins`}
                                      </Card.Meta>
                                    </Table.Cell>
                                  ) : (
                                    <Table.Cell textAlign="left">
                                      <Card.Meta>
                                        <Icon
                                          color="red"
                                          size="large"
                                          name="time"
                                        />
                                        {`0 mins`}
                                      </Card.Meta>
                                    </Table.Cell>
                                  )}{" "}
                                  {percentageDiscount ? (
                                    <Table.Cell textAlign="right">
                                      <Card.Meta>
                                        <Icon
                                          color="red"
                                          size="large"
                                          name="fire"
                                        />
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
                                <Icon size="large" color="green" name="money bill alternate"/>
                                {` Minimun spend £${
                                minOrder ? minOrder : "0"
                              }`}</Card.Meta>
                            
                            </Card.Content>
                            <Card.Content>
                            <Card.Meta>
                            <Icon size="large" name="truck" />
                            {` Delivery £${
                                deliveryPrice ? deliveryPrice : "0"
                              }`}
                              </Card.Meta>
                            </Card.Content>
                            <Card.Description>
                              <Rating
                                padding
                                maxRating={5}
                                rating={displayRating(item.ratings)}
                                disabled
                                icon="star"
                                size="small"
                              />
                            </Card.Description>
                          </Card.Content>
                        </Card>
                      </Link>
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default StoreListing;
