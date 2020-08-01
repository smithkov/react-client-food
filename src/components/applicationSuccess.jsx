import React, { Component } from "react";
import NavBar from "./NavBar";
import ErrorPage from "./errorPage";
import {
  Grid,
  Image,
  Message,
  Container,
  Button,
  Form,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { LOGIN_URL } from "../utility/global";
import clientService from "../services/clientService";
import { Input } from "@material-ui/core";
class ApplicationSuccess extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    redirect: false,
    code: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
  verify=()=> {
    this.props.history.push(`/account_verification/${this.state.code}`);
  }
  render() {
    const { redirect, code } = this.state;
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
                    Your application was submitted successfully, we have
                    forwarded acknowledgement and verification emails to the
                    email entered.{" "}
                    <strong>
                      Alternatively, to activate your account, enter a
                      verification code sent to your email in the input box
                      below.{" "}
                    </strong>
                  </Message.Content>
                </Message>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid>
            <Grid columns={3} divided>
              <Grid.Row>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                  <Form>
                    <Form.Input
                      name="code"
                      onChange={this.onChange}
                      label="Activation Code"
                      placeholder="Enter a 6-digit activation code"
                    />
                  </Form>
                  <hr></hr>

                  <Button
                    onClick={this.verify}
                    disabled={!(code.length == 6)}
                    fluid
                    color="red"
                  >
                    Activate
                  </Button>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </React.Fragment>
      );
    }
  }
}
export default withRouter(ApplicationSuccess);