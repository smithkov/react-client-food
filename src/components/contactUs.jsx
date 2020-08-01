import React, { Component } from "react";
import NavBar from "./NavBar";
import ErrorPage from "./errorPage";
import Footer from "./Footer";

import {
  Grid,
  Image,
  Message,
  Container,
  Dropdown,
  TextArea,
  Icon,
  Button,
  Form,
  Header,
  Segment,
} from "semantic-ui-react";

import { Link, withRouter } from "react-router-dom";
import { LOGIN_URL } from "../utility/global";
import clientService from "../services/clientService";
import { Input } from "@material-ui/core";
class ContactUs extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    redirect: false,
    code: "",
    reason: "",
    name: "",
    message: "",
    email: "",
    alertMessage: "",
    showAlert: false,
  };
  onChangeDropdown = (e, data) => {
    this.setState({
      [data.name]: data.value,
    });
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
  contactUs = async () => {
    const { message, email, name, reason } = this.state;
    if(reason == "")
    {
      this.setState({
        showAlert: true,
        alertMessage: "Please select 'Reason' for enquiry.",
      });
    }else{
      const contact = await clientService.contactUs({
        message,
        email,
        name,
        reason,
      });
      if (contact.data.error) {
        this.setState({
          showAlert: true,
          alertMessage: "Your enquiry was unsuccessful, please try again later.",
        });
      } else {
        this.setState({
          showAlert: true,
          message: "",
          email: "",
          name: "",
          reason: "",
          alertMessage:
            "Your enquiry has been sent, we will get back to you in 2 working days.",
        });
      }
    }
   
  };

  render() {
    const { email, reason, alertMessage, showAlert, message, name } = this.state;
    const options = [
      { key: 1, text: "Order", value: "Order" },
      { key: 2, text: "Partnership", value: "Partnership" },
      { key: 3, text: "General enquiry", value: "General enquiry" },
    ];
    return (
      <React.Fragment>
        <NavBar />
        <div style={{ marginTop: 70 }}>
          <Header color="red" textAlign="center" as="h2">
            Contact us
          </Header>
          <hr></hr>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <Message icon>
                  <Icon name="marker" />
                  <Message.Content>
                    <Message.Header>Head Office</Message.Header>
                    219 Colinton Rd, Edinburgh EH14 1DJ
                  </Message.Content>
                </Message>
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>

              <Grid.Column width={12}>
                <Grid stackable divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.811522262545!2d-3.2417434844876083!3d55.917968380597834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c6e73c9031d5%3A0x819b1c05ad811b7a!2s219%20Colinton%20Rd%2C%20Edinburgh%20EH14%201DJ!5e0!3m2!1sen!2suk!4v1595542193579!5m2!1sen!2suk"
                        width="100%"
                        height="450"
                        frameborder="0"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        aria-hidden="false"
                        tabindex="0"
                      ></iframe>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment>
                        <Form>
                          {showAlert ? (
                            <Message positive>
                              <p>{alertMessage}</p>
                            </Message>
                          ) : (
                            ""
                          )}
                          <Form.Field required>
                            <label>Full name</label>
                            <input
                              onChange={this.onChange}
                              name="name"
                              value={name}
                              type="text"
                            />
                          </Form.Field>
                          <Form.Field required>
                            <label>Email address</label>
                            <input
                              onChange={this.onChange}
                              name="email"
                              required
                              value={email}
                              type="email"
                            />
                          </Form.Field>
                          <Form.Field required>
                            <label>Reason for contact</label>
                            <Dropdown
                              name="reason"
                              required
                              fluid
                              onChange={this.onChangeDropdown}
                              options={options}
                              selection
                              value={reason}
                            />
                          </Form.Field>
                          <Form.Field required>
                            <label>How can we help?</label>
                            <TextArea value={message} onChange={this.onChange} name="message" />
                          </Form.Field>
                          <hr></hr>
                          <Button
                            onClick={this.contactUs}
                            color="red"
                            type="submit"
                          >
                            Send email
                          </Button>
                        </Form>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }
}
export default withRouter(ContactUs);
