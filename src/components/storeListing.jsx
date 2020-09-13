import React, { Component } from "react";
import Listing from "./widgets/Listing";
import SideMenu from "./widgets/SideMenu";
import StoreCard from "./widgets/storeCard";
import ProductCard from "./widgets/ItemCard";
import clientService from "../services/clientService";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  DEFAULT_STORE_BANNER,
  DEFAULT_STORE_LOGO,
  totalRating,
  displayRating,
  SERVER_URL,
  ENDPOINT,
  storeNextOpening,
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
  Container,
  Message,
} from "semantic-ui-react";
const imageUrl = `${ENDPOINT}uploads`;
class StoreListing extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    stores: [],
    closeStores: [],
    categories: [],
    autoCompleteResult: [],
    meals: [],
    searchVal: "",
    loading: false,
    loadingCategory: true,
    loadingStore: true,
    title: "",
    closeTitle: "",
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
      title: storeResponse.data.desc,
      categories: categoryResponse.data.data,
      loadingCategory: false,
      loadingStore: false,
    });
    const storeCloseResponse = await clientService.storeListingClose();
    this.setState({
      closeTitle: storeCloseResponse.data.desc,
      closeStores: storeCloseResponse.data.data,
    });
  };
  searchSelect = async (e, data) => {
    const search = data.result.title;

    const searchResponse = await clientService.listingSearch({ search });

    this.setState({
      closeTitle: searchResponse.data.desc,
      stores: [],
      closeStores: searchResponse.data.data,
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
  originEvent = async (originId) => {
    const originResponse = await clientService.shopByOrigin({ originId });
    const response = originResponse.data;

    this.setState({
      stores: response.data.open,
      closeStores: response.data.close,
      title: response.openDesc,
      closeTitle: response.closeDesc,
      meals: [],
    });
  };

  categoryEvent = async (categoryId) => {
    const categoryResponse = await clientService.productByCategory({
      categoryId,
    });
    this.setState({
      meals: categoryResponse.data.data,
      title: categoryResponse.data.desc,
      stores: [],
      closeStores: [],
    });
  };

  render() {
    const {
      stores,
      categories,
      loading,
      loadingCategory,
      loadingStore,
      closeStores,
      title,
      closeTitle,
      meals,
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
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        <Container>
          <NavBar />
          <Grid stackable padding style={{ paddingTop: 100 }}>
            <Grid.Column width={4}>
              {/* <Message floating icon>
                <Message.Header> </Message.Header>
              </Message> */}
            </Grid.Column>
            <Grid.Column width={12}>
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
                    image: logo ? `${logo}` : DEFAULT_STORE_LOGO,
                    description: Origin.name,
                  };
                })}
                onSearchChange={this.handleSearchChange}
              />
            </Grid.Column>
          </Grid>
          <Grid stackable>
            <Grid.Column width={4}>
              <SideMenu
                categoryEvent={this.categoryEvent}
                originEvent={this.originEvent}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Loader active={loadingCategory} inline="centered" />
              <Slider {...settings}>
                {categories.map((item) => {
                  const { id, imagePath, display } = item;
                  return (
                    <div className="out" key={id}>
                      <Card onClick={()=>this.categoryEvent(id)}>
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
              {stores.length > 0 ? <Message floating>{title}</Message> : ""}

              <Grid stackable>
                <Grid.Row style={{ margin: "auto" }} columns={3}>
                  {stores.map((item) => {
                    return (
                      <StoreCard isOpen={true} key={item.id} item={item} />
                    );
                  })}
                </Grid.Row>
              </Grid>
              {closeStores.length > 0 ? (
                <Message floating>{closeTitle}</Message>
              ) : (
                ""
              )}

              <Grid stackable>
                <Grid.Row style={{ margin: "auto" }} columns={3}>
                  {closeStores.map((item) => {
                    return (
                      <StoreCard isOpen={false} key={item.id} item={item} />
                    );
                  })}
                </Grid.Row>
              </Grid>
              {meals.length > 0 ? <Message floating>{title}</Message> : ""}
              <Grid stackable>
                <Grid.Row style={{ margin: "auto" }} columns={3}>
                  {meals.map((item) => {
                    return <ProductCard isForMenu={false} key={item.id} product={item} />;
                  })}
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }
}

export default StoreListing;
