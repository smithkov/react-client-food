import React, { Component } from "react";
import Listing from "./widgets/Listing";
import SideMenu from "./widgets/SideMenu";
import clientService from "../services/clientService";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IMAGE_URL,
  DEFAULT_STORE_BANNER,
  DEFAULT_STORE_LOGO,
  totalRating,
  displayRating,
  SERVER_URL,
  ENDPOINT,
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
  Search,
  Table,
  Segment,
  Loader,
  Dimmer,
  Message,
} from "semantic-ui-react";
const imageUrl = `${ENDPOINT}uploads`;
class StoreListing extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    stores: [],
    categories: [],
    autoCompleteResult: [],
    searchVal: "",
    loading: false,
    loadingCategory: true,
    loadingStore: true,
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
    const categoryResponse = await clientService.category();

    this.setState({
      stores: storeResponse.data.data,
      categories: categoryResponse.data.data,
      loadingCategory: false,
      loadingStore: false,
    });
  };
  searchSelect = async (e, data) => {
    const search = data.result.title;

    const searchResponse = await clientService.listingSearch({ search });

    this.setState({
      stores: searchResponse.data.data,
    });
  };
  handleSearchChange = async (e, data) => {
    this.setState({
      loading: false,
    });
    const autoCompleteResponse = await clientService.listingSearch({
      search: data.value,
    });
    this.setState({
      autoCompleteResult: autoCompleteResponse.data.data,
      loading: false,
    });
  };
  render() {
    const {
      stores,
      categories,
      loading,
      loadingCategory,
      loadingStore,
    } = this.state;
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
    const categoryStyles = {
      height: 80,
      objectFit: "cover",
      objectPosition: "center center",
    };
    let settings = {
      infinite: false,
      speed: 1000,
      arrows: true,
      slidesToShow: 8,
      slidesToScroll: 8,

      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
          },
        },
      ],
    };

    return (
      <>
        <Grid stackable style={{ paddingTop: 100 }}>
          <NavBar />
          <Grid.Column style={{ paddingLeft: 30 }} width={4}>
            <Message floating icon>
              <Message.Header> </Message.Header>
            </Message>
          </Grid.Column>
          <Grid.Column style={{ paddingRight: 60 }} width={10}>
            <Search
              showNoResults
              placeholder="Search for a dish or food vendor"
              name="search"
              input={{ fluid: true }}
              loading={loading}
              onResultSelect={this.searchSelect}
              results={this.state.autoCompleteResult.map((item) => {
                const { logo, shopName, Origin } = item;
                return {
                  title: shopName,
                  image: logo ? `${IMAGE_URL}/${logo}` : DEFAULT_STORE_LOGO,
                  description: Origin.name,
                };
              })}
              onSearchChange={this.handleSearchChange}
            />
          </Grid.Column>
        </Grid>
        <Grid stackable padding style={{ paddingLeft: 40 }}>
          <Grid.Column width={4}>
            <SideMenu />
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loadingCategory} inline="centered" />
            <Slider {...settings}>
              {categories.map((item) => {
                const { id, imagePath, display } = item;
                return (
                  <div className="out" key={id}>
                    <Card padding>
                      <img
                        src={`${imageUrl}/${imagePath}`}
                        style={categoryStyles}
                      />

                      <Card.Content>
                        <Card.Meta>{display}</Card.Meta>
                      </Card.Content>
                    </Card>
                  </div>
                );
              })}
            </Slider>

            <hr />

            {loadingStore ? (
              <Segment>
                <Dimmer active={loadingStore} inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Segment>
            ) : (
              ""
            )}
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
                                <Icon
                                  size="large"
                                  color="green"
                                  name="money bill alternate"
                                />
                                {` Minimun spend £${minOrder ? minOrder : "0"}`}
                              </Card.Meta>
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
      </>
    );
  }
}

export default StoreListing;
