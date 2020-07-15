import React, { Component } from "react";
import SideMenu from "./common/sideMenu";
import { Col, Container, Row } from "reactstrap";
import Nav from "./common/nav";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { MISSING_USER_MSG, ERROR_MSG, MEAL_CREATE } from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";

export default class ShopForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      hasData: false,
    };
  }

  componentDidMount = async () => {
    const result = await clientService.hasAuth();
    const user = result.data.data;
    if (user) {
      clientService
        .productsByUser({ userId: user.id })
        .then((response) => {
          //const data = response.data;
          const data = response.data.data;

          this.setState({
            products: data,
            hasData: data.length > 0 ? true : false,
          });
          // this.setState({
          //   sellers: response.data.data,
          // });
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Food List"} />
        <hr></hr>
        <Row className="dash-layout">
          <Col lg="2">
            <SideMenu />
          </Col>

          <Col lg="1"></Col>

          <Col className="dashboard-panel" lg="6">
            {this.state.hasData ? (
              <Table celled compact>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Discount Price</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.products.map((product) => {
                    // const rating = { id: 2, value: seller.rating}
                    return (
                      <Table.Row>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>
                          {product.Category ? product.Category.name : ""}
                        </Table.Cell>
                        <Table.Cell>
                          £{parseInt(product.price).toFixed(2)}
                        </Table.Cell>
                        <Table.Cell>
                          £{parseInt(product.discountPrice).toFixed(2)}
                        </Table.Cell>
                        <Table.Cell title="Click to edit meal">
                          <Link to={`/meal/update/${product.id}`}>
                            <Icon color="blue" name="edit" /> Edit
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>

                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan="4">
                      <Link to={MEAL_CREATE}>
                        <Button
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                        >
                          <Icon name="add circle" /> Add food
                        </Button>
                      </Link>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            ) : (
              <Link to={MEAL_CREATE}>
                <Button type="submit" color="teal" fluid size="large">
                  Create new food
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
