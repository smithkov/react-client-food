import React, { Component } from "react";
import NavBar from "./NavBar";
import ErrorPage from "./errorPage";
import { Grid, Image, Message, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "../utility/global";
import clientService from "../services/clientService";
export default class ApplicationSuccess extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    redirect: false,
  };
  componentDidMount = async () => {
    const id = this.props.match.params.id;
    try {
      const response = await clientService.hasExpiredLinkForSellerReg(id);

      if (response.data.hasExpired) {
        this.setState({
          redirect: true,
        });
      }
    } catch (err) {
      this.setState({
        redirect: true,
      });
    }
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <ErrorPage />;
    } else {
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
                    width: 200,
                    height: 50,
                  }}
                  src="/images/logo2.png"
                />
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
            <Grid columns="equal">
              <Grid.Column></Grid.Column>
              <Grid.Column width={12}>
                <Message info style={{ textAlign: "center" }}>
                  <Message.Header>Successful Submission.</Message.Header>
                  <Message.Content>
                    Your application was submitted successfully, we will get
                    back to you in 24 hours.<hr/>
                  </Message.Content>
                </Message>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
          </Container>
        </React.Fragment>
      );
    }
  }
}
