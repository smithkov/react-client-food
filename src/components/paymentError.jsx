import React, { Component } from "react";
import ErrorPage from "./errorPage";
import NavBar from "./NavBar";
import { Grid, Image, Message, Container, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LISTING_URL, PAYMENT_URL } from "../utility/global";

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tempId:"",
    shopId:""
  };
  componentDidMount = async () => {
    const shopId = this.props.match.params.sel;
    const tempId = this.props.match.params.by;

    this.setState({
      tempId,
      shopId
    })
  };

  render() {
    const {tempId, shopId} = this.state;
    return (
      <React.Fragment>
        <Container>
          <Grid style={{ marginTop: 70 }} columns="equal">
            <Grid.Column></Grid.Column>
            <Grid.Column width={2}>
              <Image
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  heigth: "100",
                  width: "100",
                }}
                src="/images/error.png"
              />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
          <Grid columns="equal">
            <Grid.Column></Grid.Column>
            <Grid.Column width={12}>
              <Message error style={{ textAlign: "center" }}>
                <Message.Header>
                  {" "}
                  We're sorry your payment didn't go through.
                </Message.Header>
                <Message.Content>
                  You may alternatively try a different payment method by
                  clicking the link below.
                </Message.Content>
                <Link style={{ color: "red" }} to={`/payment/${tempId}/${shopId}`}>
                  Back to payment page{" "}
                </Link>
              </Message>

              {/* <Message negative style={{ textAlign: "center" }}>
                <Icon name="warning sign" />
                <Message.Header>
                  We're sorry your payment could not be processed
                </Message.Header>
                <Message.Content>
                  You may alternatively try a different payment method by
                  clicking the link below.
                </Message.Content>
                <p>
                  <Link style={{ color: "red" }} to={`${PAYMENT_URL}`}>
                    Back to payment page{" "}
                  </Link>
                </p>
              </Message> */}
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
