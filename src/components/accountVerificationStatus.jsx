import React, { Component } from "react";
import NavBar from "./NavBar";
import ErrorPage from "./errorPage";
import { Grid, Image, Message, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LOGIN_URL, ERROR_MSG } from "../utility/global";
import clientService from "../services/clientService";
export default class AccountVerificationStatus extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    message: "",
    isSuccess: false,
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount = async () => {
    const code = this.props.match.params.code;
    try {
      const response = await clientService.storeVerification(code);

      if (response.data.error) {
        this.setState({
          message: response.data.message,
        });
      } else {
        this.setState({
          message: response.data.message,
          isSuccess: true,
        });
      }
    } catch (err) {
      this.setState({
        message: ERROR_MSG,
      });
    }
  };

  render() {
    const { isSuccess, message } = this.state;

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
                <Message.Header>
                  {isSuccess ? "Congratulations!" : "Invalid Activation"}
                </Message.Header>
                <Message.Content>
                  {this.state.message}
                  <br />
                  <br />

                  {isSuccess ? (
                    <Link to={LOGIN_URL}>
                      {" "}
                      <Button color="red" size="large">
                        Login
                      </Button>
                    </Link>
                  ) : (
                    ""
                  )}
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
