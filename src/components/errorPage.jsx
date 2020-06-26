import React, { Component } from "react";
import ClientService from "../services/clientService";
import NavBar from "./NavBar";
import {
  Grid,
  Image,
  Icon,
  Header,
  Button,
  Form,
  Message,
} from "semantic-ui-react";
import Review from "./widgets/Review";
import ReviewList from "./widgets/reviewList";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
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
            <Header as="h2" icon textAlign="center">
              <Icon color="red" name="exclamation triangle" circular />
              <Header.Content>PAGE NOT FOUND</Header.Content>
            </Header>
            <Image
              centered
              size="large"
              src="https://react.semantic-ui.com/images/wireframe/centered-paragraph.png"
            />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
