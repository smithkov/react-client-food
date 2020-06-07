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
            <Header inverted as="h4" content="Top cuisines" />
            <List link inverted>
              <List.Item as="a">Nigerian</List.Item>
              <List.Item as="a">Kenyan</List.Item>
              <List.Item as="a">Ghana</List.Item>
              <List.Item as="a">Cameroun</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Grocery categories" />
            <List link inverted>
              <List.Item as="a">Vegetables</List.Item>
              <List.Item as="a">Canned</List.Item>
              <List.Item as="a">Drinks</List.Item>
              <List.Item as="a">Cosmetics</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Meal Categories" />
            <List link inverted>
              <List.Item as="a">Soup</List.Item>
              <List.Item as="a">Snacks</List.Item>
              <List.Item as="a">African Salad</List.Item>
              <List.Item as="a">Jollof Rice</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as="h4" content="Get Hold of Us" />
            <p>
              Contact us should need more enquiries regarding our service, we are on 24/7 to answer all your possible queries regarding all our services.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size="mini" src="/images/logo.png" />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

export default Footer;
