import React, { Component } from "react";
import ErrorPage from "../../components/errorPage";
import NavBar from "../../components/NavBar";
import { Grid, Image, Message, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LISTING_URL } from "../../utility/global";

export default class SaveSuccess extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
  componentDidMount = async () => {};

  render() {
    const {
      message,
      btnText1,
      btnText2,
      url1,
      url2,
      changePage,
    } = this.props.data;
    return (
      <React.Fragment>
        <Container>
          <Grid style={{ marginTop: 30 }} columns="equal">
            <Grid.Column></Grid.Column>
            <Grid.Column width={8}>
              <Image
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "20%",
                }}
                src="/images/success.jpg"
              />
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
          <Grid columns="equal">
            <Grid.Column></Grid.Column>
            <Grid.Column width={12}>
              <Message info style={{ textAlign: "center" }}>
                <Message.Header>{message}</Message.Header>
                <hr />

                <a href={url1}>
                  <Button color="green">{btnText1}</Button>
                </a>

                <Link to={url2}>
                  <Button color="green">{btnText2}</Button>
                </Link>
              </Message>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
