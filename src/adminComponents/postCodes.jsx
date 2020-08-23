import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  toastOptions,
  titleCase,
} from "../utility/global";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Message,
  Input,
  Icon,
  Popup,
  Label,
  Table,
  Grid,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import AfterNav from "./common/afterNav";
import { toast } from "react-toastify";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
let count = 0;
class PostCode extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    postCode: "",
    postCodes: [],
    shopId: "",
    disabled: false,
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      const shopId = user.shopId;
      if (user) {
        ClientService.findPostCodesByShop({ shopId })
          .then((response) => {
            const postCodes = response.data.data;
            this.setState({
              postCodes,
              shopId,
            });
          })
          .catch((err) => {
            //console.log(err);
          });
      }
    }
  };

  componentDidMount = async () => {
    this.props.fetchUser();
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  removePostCode = async (id) => {
    const error = await clientService.deletePostCode(id);
    if (!error) {
      this.setState({
        postCodes: [...this.state.postCodes.filter((item) => item.id !== id)],
      });
    }
  };
  addPostCode = async () => {
    const { postCode, postCodes, shopId } = this.state;
    const create = await clientService.createPostCode({
      shopId,
      code: postCode,
    });

    const error = create.data.error;
    const data = create.data.data;
    if (!error) {
      postCodes.push({
        id: data.id,
        code: data.code,
      });

      this.setState({
        postCodes: [...postCodes],
        postCode: "",
      });
    }
  };
  onSubmit = async (e) => {
    e.preventDefault();

    const { postCodes, postCode, shopId } = this.state;

    const create = await clientService.createPostCode({ shopId, postCodes });
    // .then((response) => {
    //   toast.success(response.data.message, toastOptions(false));
    // })
    // .catch((err) => {
    //   toast.success(err.response.data.message, toastOptions(true));
    // });
  };

  render() {
    const { postCode, postCodes, disabled } = this.state;

    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Post Codes"} />
        <hr></hr>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
            <Message attached header="Post Codes" />
            <Form
              className="attached fluid segment"
              style={{
                width: "100%",
                margin: "auto",
                height: "auto",
                padding: 13,
              }}
              onSubmit={this.onSubmit}
            >
              <p class="h4 mb-4">Post Codes</p>
              <Grid fluid stackable columns={2} padded>
                <Grid.Row>
                  <Grid.Column>
                    <Input
                      fluid
                      type="text"
                      name="postCode"
                      value={postCode}
                      onChange={this.onChange}
                      placeholder="Enter post codes"
                      action
                    >
                      <input />
                      <Button
                        onClick={this.addPostCode}
                        color="green"
                        disabled={!postCode}
                        type="button"
                      >
                        Add
                      </Button>
                    </Input>
                  </Grid.Column>
                  <Grid.Column></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    {postCodes.length > 0 ? (
                      <Table fluid color="green">
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Post Code</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {postCodes.map((item) => {
                            return (
                              <Table.Row key={item.id}>
                                <Table.Cell>
                                  {" "}
                                  <h4>{item.code}</h4>
                                </Table.Cell>
                                <Table.Cell textAlign="right">
                                  <Link
                                    title={`Remove ${item.code}`}
                                    onClick={() => this.removePostCode(item.id)}
                                  >
                                    <Icon
                                      color="red"
                                      size="large"
                                      name="minus circle"
                                    />
                                  </Link>{" "}
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
                    ) : (
                      ""
                    )}
                  </Grid.Column>

                  <Grid.Column></Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}
PostCode.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});
export default connect(mapStateToProps, { fetchUser })(PostCode);
