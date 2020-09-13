import React, { Component } from "react";
import ClientService from "../services/clientService";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {
  Grid,
  Image,
  Icon,
  Header,
  Button,
  Form,
  Segment,
  Message,
} from "semantic-ui-react";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  DEFAULT_LOGO,
  totalRating,
  displayRating,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tempId: "",
    shopId: "",
  };
  componentDidMount = async () => {};
  handleOnClick = (url) => {
    this.setState({
      defaultImage: url,
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Grid style={{ margin: 70 }} stackable>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            
            <Segment textAlign="center" placeholder>
              <Header icon>
                <Icon color="red" name="meh outline" />
                That page does not exist, sorry
              </Header>
              
            </Segment>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}
