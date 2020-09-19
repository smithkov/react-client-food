import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Rating,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Input,
} from "semantic-ui-react";
import {
  totalRating,
  displayRating,
  formatPrice,
  LISTING_URL,
  REGISTER_URL,
  LOGIN_URL,
} from "../utility/global";
import { withRouter } from "react-router-dom";
export class HomepageHeading extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(LISTING_URL);
  };
  render() {
    return (
      <Container style={{marginTop:120, backgroundColor: "white", paddingBottom: 30 }} text>
        <Image centered  src="/images/logo.png" size="medium" />
        <Header
          as="h2"
          content="Get your African/Caribbean food delivered to your doorstep"
          inverted
          style={{
            fontSize: this.props.mobile ? "1.5em" : "1.7em",
            fontWeight: "normal",
            color: "#660000",
            marginTop: this.props.mobile ? "0.5em" : "1.5em",
          }}
        />
        <Input fluid type="text" placeholder="Enter your postcode" action>
          <input />
          <Button onClick={this.handleSubmit} color="red" type="button">
            Find Food
          </Button>
        </Input>
      </Container>
    );
  }
}
export default withRouter(HomepageHeading);
