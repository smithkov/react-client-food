import React, { Component, createRef } from "react";
import ClientService from "../services/clientService";
import Geocode from "react-geocode";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  withGoogleMap,
  GoogleMap,
} from "google-maps-react";
import NavBar from "./NavBar";
import {
  Grid,
  Image,
  Tab,
  Message,
  Card,
  Icon,
  List,
  Header,
  Ref,
} from "semantic-ui-react";
import ItemCard from "./widgets/ItemCard";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";
import {
  getUserProfile,
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  Rating,
} from "../utility/global";
import clientService from "../services/clientService";

class ShopPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    shopName: "",
    notice: "",
    minTime: "",
    maxTime: "",
    percentageDiscount: "",
    discountAmount: "",
    bannerPreviewUrl: "",
    logoPreviewUrl: "",
    shopTypeText: "",
    products: [],
    shopId: "",
    lat: "",
    lng: "",
    firstAddress: "",
    postCode: "",
    city: "",
    comments: [],
  };
  contextRef = createRef();
  componentDidMount = async () => {
    try {
      const shopUrl = this.props.match.params.shopUrl;
      const getShop = await ClientService.findShopByUrl({ shopUrl });

      const data = getShop.data;
      console.log(data);
      const {
        id,
        shopName,
        logo,
        shopBanners,
        products,
        ShopType,
        notice,
        minTime,
        maxTime,
        percentageDiscount,
        discountAmount,
        City,
        postCode,
        firstAddress,
      } = data;

      this.setState({
        shopId: id,
        shopName: shopName,
        notice,
        minTime,
        maxTime,
        city: City ? City.name : "",
        postCode,
        firstAddress,
        percentageDiscount,
        discountAmount,
        shopTypeText: ShopType.name,
        logoPreviewUrl: logo ? `${IMAGE_URL}${logo}` : DEFAULT_LOGO,
        bannerPreviewUrl:
          shopBanners.length > 0
            ? `${IMAGE_URL}${shopBanners[0].bannerPath}`
            : DEFAULT_BANNER,
      });

      clientService.productsByShopId(id).then((response) => {
        this.setState({
          products: response.data.data,
        });
      });
      Geocode.setApiKey("AIzaSyDSYuGeHrv1KmGmB-mU1PdtvBNozgoYctU");
      Geocode.fromAddress(`${firstAddress}, ${City.name}`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({
            lat: lat,
            lng: lng,
          });
          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  handleTabChange = (e, { activeIndex }) => {
    if (activeIndex === 2) {
      const shopId = this.state.shopId;
      clientService
        .findReviewByShop({ shopId })
        .then((response) => {
          const data = response.data.data;
          this.setState({
            comments: data,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    const mapStyles = {
      width: "100%",
      margin: "auto",
      height: "100%",
    };
    const panes = [
      {
        menuItem: "Menu",
        render: () => (
          <React.Fragment>
            <Tab.Pane>
              <Grid doubling relaxed="very" columns={3}>
                {this.state.products.map((product) => {
                  return <ItemCard key={product.id} product={product} />;
                })}
              </Grid>
            </Tab.Pane>
          </React.Fragment>
        ),
      },
      {
        menuItem: "Contact Us",
        render: () => (
          <Tab.Pane>
            <div>
              <Grid style={{ height: 220, padding: 20 }} columns={2} padded>
                <Grid.Column>
                  <Card
                    header={this.state.firstAddress}
                    meta={this.state.city}
                    description={this.state.postCode}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Map
                    google={this.props.google}
                    zoom={15}
                    style={mapStyles}
                    initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                  >
                    <Marker
                      position={{ lat: this.state.lat, lng: this.state.lng }}
                    />
                  </Map>
                </Grid.Column>
              </Grid>
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Rating",
        render: () => (
          <Tab.Pane>
            <Review isForShop={true} shopId={this.state.shopId} />
            <hr></hr>
            {this.state.comments.map((comment) => {
              return <ReviewList key={comment.id} data={comment} />;
            })}
          </Tab.Pane>
        ),
      },
    ];
    const styles = {
      height: 150,
      width: "100%",
      objectFit: "cover",
      objectPosition: "center center",
    };
    const {
      logoPreviewUrl,
      bannerPreviewUrl,
      notice,
      minTime,
      maxTime,
      percentageDiscount,
      discountAmount,
    } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <Ref innerRef={this.contextRef}>
          <Grid stackable style={{ margin: 70 }}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image
                  className="img-resize"
                  src={logoPreviewUrl || DEFAULT_LOGO}
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <Image
                  style={styles}
                  className="img-resize"
                  src={bannerPreviewUrl}
                />
                {notice ? (
                  <Message
                    icon="announcement"
                    // header="Have you heard about our mailing list?"
                    content={notice}
                  />
                ) : (
                  ""
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3}>
                <Message floating>
                  <List>
                    {percentageDiscount ? (
                      <List.Item>
                        <List.Icon color="red" name="fire" />
                        <List.Content className="red">
                          {" "}
                          {percentageDiscount}% off when you spend £
                          {discountAmount}
                        </List.Content>
                        <hr />
                      </List.Item>
                    ) : (
                      ""
                    )}
                    {minTime ? (
                      <List.Item>
                        <List.Icon name="shipping fast" />
                        <List.Content>
                          {" "}
                          Delivery {minTime}-{maxTime} mins
                        </List.Content>
                        <hr />
                      </List.Item>
                    ) : (
                      ""
                    )}
                  </List>
                  There are no items in your basket
                </Message>
              </Grid.Column>
              <Grid.Column width={12}>
                <Tab panes={panes} onTabChange={this.handleTabChange} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Ref>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDSYuGeHrv1KmGmB-mU1PdtvBNozgoYctU",
})(ShopPage);
