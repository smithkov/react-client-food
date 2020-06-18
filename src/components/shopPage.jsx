import React, { Component } from "react";
import ClientService from "../services/clientService";
import NavBar from "./NavBar";
import { Grid, Image, Tab, Message } from "semantic-ui-react";
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

export default class ShopPage extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.shopUrl);
  }

  state = {
    shopName: "",
    bannerPreviewUrl: "",
    logoPreviewUrl: "",
    shopTypeText: "",
    products: [],
    shopId: "",
    comments: [],
  };
  componentDidMount = async () => {
    const shopUrl = this.props.match.params.shopUrl;
    const getShop = await ClientService.findShopByUrl({ shopUrl });

    const data = getShop.data;
    const { id, shopName, logo, shopBanners, products, ShopType } = data;

    this.setState({
      shopId: id,
      shopName: shopName,
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
      { menuItem: "Contact Us", render: () => <Tab.Pane></Tab.Pane> },
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
    const { logoPreviewUrl, bannerPreviewUrl } = this.state;
    console.log(logoPreviewUrl);
    return (
      <React.Fragment>
        <NavBar />

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
              <Message
                icon="announcement"
                header="Have you heard about our mailing list?"
                content="Get the best news in your e-mail every day."
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={12}>
              <Tab panes={panes} onTabChange={this.handleTabChange} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
