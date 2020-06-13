import React, { Component } from "react";
import ClientService from "../services/clientService";
import NavBar from "../components/NavBar";
import { Grid, Image, Tab } from "semantic-ui-react";
import ItemCard from "./widgets/itemCard";
import {
  getUserProfile,
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
} from "../utility/global";
import clientService from "../services/clientService";

export default class ShopPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    shopName: "",
    bannerPreviewUrl: "",
    logoPreviewUrl: "",
    shopTypeText: "",
    products: [],
  };
  componentDidMount() {
    ClientService.findShopById("65b3b2a1-4eb6-4df0-9894-0613b5b3e9af")
      .then((response) => {
        const data = response.data.data;
        const { shopName, logo, shopBanners, products, ShopType } = data;

        this.setState({
          shopName: shopName,
          shopTypeText: ShopType.name,
          logoPreviewUrl: logo ? `${IMAGE_URL}${logo}` : DEFAULT_LOGO,
          bannerPreviewUrl:
            shopBanners.length > 0
              ? `${IMAGE_URL}${shopBanners[0].bannerPath}`
              : DEFAULT_BANNER,
        });
      })
      .catch((err) => {});
    clientService
      .productsByShopId("65b3b2a1-4eb6-4df0-9894-0613b5b3e9af")
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          products: response.data.data,
        });
      });
  }

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
      { menuItem: "Rating", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={12}>
              <Tab panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
