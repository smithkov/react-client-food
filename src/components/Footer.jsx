import React, { Component } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  REGISTER_URL,
  LOGIN_URL,
  SHOP_SIGNUP,
  TERMS_AND_CONDITION,
  PRIVACY_URL,
  DISCLAIMER,
  LISTING_URL,
  CONTACT_US,
} from "../utility/global";
import clientService from "../services/clientService";

class Footer extends Component {
  state = {
    category: [],
    origin: [],
    hasLogin: false,
  };
  componentDidMount = async () => {
    const loginToken = localStorage.getItem("tk");
    if (loginToken) {
      this.setState({
        hasLogin: true,
      });
    }

    const category = await clientService.category();
    const origin = await clientService.origins();

    this.setState({
      category: category.data.data,
      origin: origin.data.data,
    });
  };
  handleAndroid = ()=>{
   alert("Coming soon")
  }

  handleIOS = ()=>{
    alert("Coming soon")
  }
  render() {
    const { category, origin, hasLogin } = this.state;
    return (
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      >
        <Container style={{textAlign:"center"}}>
          <Grid textAlign="left" divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Customer service" />
              <List link inverted>
                <List.Item as="a">Contact us</List.Item>

                {hasLogin ? (
                  ""
                ) : (
                  <List.Item>
                    <Link to={LOGIN_URL}>Log in</Link>
                  </List.Item>
                )}
                {hasLogin ? (
                  ""
                ) : (
                  <List.Item>
                    <Link to={REGISTER_URL}>Sign up</Link>
                  </List.Item>
                )}

                {hasLogin ? (
                  ""
                ) : (
                  <List.Item>
                    <Link to={SHOP_SIGNUP}>Vendor sign up</Link>
                  </List.Item>
                )}
              </List>
              <hr/>
              <Image onClick={this.handleIOS}  src='/images/ios.png' size='small' />
              <Image onClick={this.handleAndroid} style={{paddingTop:10}} src='/images/android.png' size='small' />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header inverted as="h4" content="Office Address" />
              <p>219 Colinton Road <br/>
                EH14 1DJ <br/>
                Edinburgh<br/>
                United Kingdom
                </p>
            </Grid.Column>

            <Grid.Column width={7}>
              <Header inverted as="h4" content="Get Hold of Us" />
              <p>
                Contact us at info@foodengo.co.uk should you need more enquiries
                regarding our services, we are available 24/7 to answer all your
                possible queries.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <Image centered size="small" src="/images/foodengo_logo.png" />
          <List   horizontal inverted divided link size="small">
            <List.Item as="a" href={DISCLAIMER}>
              Disclaimer
            </List.Item>
            <List.Item as="a" href={CONTACT_US}>
              Contact Us
            </List.Item>
            <List.Item as="a" href={TERMS_AND_CONDITION}>
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href={PRIVACY_URL}>
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
