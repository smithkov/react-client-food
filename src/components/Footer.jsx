import React from "react";
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

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Customer service" />
            <List link inverted>
              <List.Item as="a">Contact us</List.Item>
              <List.Item>
                <Link to={LOGIN_URL}>Log in</Link>
              </List.Item>
              <List.Item>
                <Link to={REGISTER_URL}>Sign up</Link>
              </List.Item>
              <List.Item>
                <Link to={REGISTER_URL}>My account</Link>
              </List.Item>
              <List.Item>
                <Link to={SHOP_SIGNUP}>Vendor sign up</Link>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Top cuisines" />
            <List link inverted>
              <List.Item>
                <Link to={LISTING_URL}>Nigerian</Link>
              </List.Item>
              <List.Item>
                <Link to={LISTING_URL}>Ghanian</Link>
              </List.Item>
              <List.Item>
                <Link to={LISTING_URL}>South-African</Link>
              </List.Item>
              <List.Item>
                <Link to={LISTING_URL}>Zimbabwean</Link>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Meal Categories" />
            <List link inverted>
              <List.Item>
                <Link to={LISTING_URL}>Soup</Link>
              </List.Item>
              <List.Item>
                <Link to={LISTING_URL}>Snacks</Link>
              </List.Item>
              <List.Item>
                <Link to={LISTING_URL}>African Salad</Link>
              </List.Item>
              <List.Item>
                <Link to={LISTING_URL}>Jollof Rice</Link>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as="h4" content="Get Hold of Us" />
            <p>
              Contact us should need more enquiries regarding our service, we
              are on 24/7 to answer all your possible queries regarding all our
              services.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size="small" src="/images/foodengo_logo.png" />
        <List horizontal inverted divided link size="small">
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
};

export default Footer;
