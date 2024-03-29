import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import Wrapper from "./wrapper";
import {
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  DEFAULT_LOGO,
} from "../utility/global";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Message,
  Input,
  Divider,
  Header,
  Segment,
  Label,
  Icon,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
//import "date-fns";
//import MomentUtils from "@date-io/moment";

const durations = [];

export default class Social extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    facebook: "",
    twitter: "",
    instagram: "",
    showAlert: false,
    message: "",
    id: "",
    userId: "",
  };

  componentDidMount = async () => {
    const result = await ClientService.hasAuth();
    const user = result.data.data;
    if (user) {
      ClientService.findSocialById(user.id)
        .then((response) => {
          console.log(response);
          const data = response.data.data;

          const { id, facebook, twitter, instagram } = data;

          this.setState({
            id,
            facebook,
            twitter,
            instagram,
            userId: user.id,
          });
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { id, facebook, twitter, instagram, userId } = this.state;
    const result = await ClientService.hasAuth();
    const user = result.data.data;
    if (user) {
      if (facebook != "" || instagram != "" || twitter != "") {
        clientService
          .social({
            id,
            userId,
            facebook,
            twitter,
            instagram,
          })
          .then((response) => {
            this.setState({
              showAlert: true,
              message: response.data.message,
            });
          })
          .catch((err) => {
            const message = err.response.data.message;
            this.setState({ showAlert: true, message: message });
          });
      }
    } else {
      this.setState({ showAlert: true, message: MISSING_USER_MSG });
    }
  };

  render() {
    const { id, facebook, twitter, instagram, showAlert, message } = this.state;

    const alert = showAlert ? (
      <div className="ui info message">
        <p>{message}</p>
      </div>
    ) : (
      ""
    );

    return (
      <Container fluid={true}>
        <Wrapper>
          <Message attached header="Social Setup" />
          <Form
            className="attached fluid segment"
            onSubmit={this.onSubmit}
            size="tiny"
          >
            {alert}
            <Form.Field width={16}>
              <label>Facebook</label>
              <Input
                value={facebook}
                labelPosition="left"
                onChange={this.onChange}
                name="facebook"
                type="text"
                placeholder="Facebook Url"
              ></Input>
            </Form.Field>
            <Form.Field width={16}>
              <label>Twitter</label>
              <Input
                value={twitter}
                labelPosition="left"
                onChange={this.onChange}
                name="twitter"
                type="text"
                placeholder="Twitter Url"
              ></Input>
            </Form.Field>
            <Form.Field width={16}>
              <label>Instagram</label>
              <Input
                value={instagram}
                labelPosition="left"
                onChange={this.onChange}
                name="instagram"
                type="text"
                placeholder="Instagram Url"
              ></Input>
            </Form.Field>
            <br />
            <Button color="red" size="mini" type="submit">
              Save <Icon name="save" />
            </Button>
          </Form>
        </Wrapper>
      </Container>
    );
  }
}
