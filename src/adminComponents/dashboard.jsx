import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import { Card, Button, Icon, Image, Grid } from "semantic-ui-react";
import { Col, Container, Row } from "reactstrap";
import AfterNav from "./common/afterNav";
import {
  SHOP_SETTING_URL,
  MEAL_LIST,
  USER_ORDER_URL,
  SHOP_CREATE,
  MY_ACCOUNT,
  AVAILABILITY_URL,
  SHOP_REVIEW
} from "../utility/global";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Dashboard"} />
        <hr></hr>

        <Row style={{ paddingTop: "10px", height: 600 }}>
          <Col lg="2" sm="12" xs="12">
            <SideMenu />
          </Col>
          <Col lg="10">
            <Grid padded stackable>
              {" "}
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Link to={USER_ORDER_URL}>
                    <Card color="blue" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/order.png"
                        />
                        <Card.Header>Orders</Card.Header>
                        <Card.Meta>Manage and print orders</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={MEAL_LIST}>
                    <Card color="green" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/meal.png"
                        />
                        <Card.Header>Food</Card.Header>
                        <Card.Meta>Add, update and remove food</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={SHOP_SETTING_URL}>
                    <Card color="red" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/setup.jpg"
                        />
                        <Card.Header>Settings</Card.Header>
                        <Card.Meta>
                          Setup delivery time and cost, discount and minimum
                          order{" "}
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={SHOP_CREATE}>
                    <Card color="yellow" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/store.png"
                        />
                        <Card.Header>Store</Card.Header>
                        <Card.Meta>Manage your store information</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Link to={AVAILABILITY_URL}>
                    <Card color="blue" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/time.png"
                        />
                        <Card.Header>Availabilty</Card.Header>
                        <Card.Meta>Manage days and time of opening</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={MY_ACCOUNT}>
                    <Card color="green" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/user_info.png"
                        />
                        <Card.Header>Account Info</Card.Header>
                        <Card.Meta>Manage your personal account</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to={SHOP_REVIEW}>
                    <Card color="red" fluid>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="tiny"
                          src="/images/ratings.png"
                        />
                        <Card.Header>Reviews</Card.Header>
                        <Card.Meta>View your shop reviews</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Card color="yellow" fluid>
                    <Card.Content>
                      <Image
                        floated="right"
                        size="tiny"
                        src="/images/chart.png"
                      />
                      <Card.Header>Sales Chart</Card.Header>
                      <Card.Meta>Manage your store information</Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Col lg="12">
              <Card.Group itemsPerRow={4}>
                <Card>
                  <Image 
                    src="/images/purchase.png"
                    wrapped
                    ui={false}
                  />
                 
                  <Card.Content extra>
                  <Card.Header>Fulfiled Orders</Card.Header>
                  </Card.Content>
                </Card>

                <Card style={{backgroundColor:'white'}}>
                  <Image
                    src="/images/cart.png" style={{height:'auto', backgroundColor:'white'}}
                  />
                  
                  <Card.Content extra>
                  <Card.Header>Orders</Card.Header>
                   
                  </Card.Content>
                </Card>

                <Card>
                  <Image
                    src="/images/app.png" style={{height:'auto', backgroundColor:'white'}}
                  />
                  
                  <Card.Content extra>
                  <Card.Header>Products</Card.Header>
                  </Card.Content>
                </Card>

                
              </Card.Group>
            </Col>
          </Col> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
