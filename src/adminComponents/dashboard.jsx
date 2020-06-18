import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import { Card, Icon, Image } from "semantic-ui-react";
import { Col, Container, Row } from "reactstrap";
import AfterNav from './common/afterNav'
export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form ={"Dashboard"}/><hr></hr>
        
        <Row style={{ paddingTop: "10px", height: 600 }}>
          <Col lg="2" sm="12" xs="12">
            <SideMenu />
          </Col>
          <Col lg="10">
            <Col lg="12">
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
          </Col>
        </Row>
      </Container>
    );
  }
}
