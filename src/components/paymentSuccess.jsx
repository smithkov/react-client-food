import React, { Component } from "react";
import ErrorPage from "./errorPage";
import NavBar from "./NavBar";
import { Grid, Image, Message, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LISTING_URL, TEMP_ID } from "../utility/global";

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
  componentDidMount = async () => {
    localStorage.removeItem(TEMP_ID);
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Grid style={{ marginTop: 70 }} columns="equal">
            <Grid.Column></Grid.Column>
            <Grid.Column width={8}>
              <Image
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
                src="/images/payment.png"
              />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
          <Grid columns="equal">
            <Grid.Column></Grid.Column>
            <Grid.Column width={12}>
              <Message info style={{ textAlign: "center" }}>
                <Message.Header>Your payment was successful.</Message.Header>
                <Message.Content>
                  Thank you for your payment, an automated payment receipt will
                  be sent to your email.
                </Message.Content>
                <p>
                  <Link style={{ color: "red" }} to={`${LISTING_URL}`}>
                    Back to Listing{" "}
                  </Link>
                </p>
              </Message>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
