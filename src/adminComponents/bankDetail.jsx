import React, { Component } from "react";
import Nav from "./common/nav";
import SideMenu from "./common/sideMenu";
import ClientService from "../services/clientService";
import { Col, Container, Row } from "reactstrap";
import clientService from "../services/clientService";
import {
  toastOptions,
} from "../utility/global";
import { Button, Form, Message, Icon } from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { toast } from "react-toastify";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class BankDetail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    sortCode: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    shopId: "",
  };

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const user = nextProps.user;
      if (user) {
        ClientService.findShopByUser(user.id)
          .then((response) => {
            const data = response.data.data;
            
            this.setState({
              shopId: data.id
            })
            const { id,bankDetail } = data;
          
            this.setState({
              shopId: id,
              sortCode: bankDetail.sortCode,
              accountNumber: bankDetail.accountNumber,
              bankName: bankDetail.bankName,
              accountName: bankDetail.accountName,
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

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      sortCode,
      bankName,
      accountName,
      accountNumber,
      shopId,
    } = this.state;
    const bankDetail = {
      sortCode,
      bankName,
      accountName,
      accountNumber,
    };
    console.log(shopId)
    clientService
      .bankDetail(shopId, {bankDetail})
      .then((response) => {
        toast.success(response.data.message, toastOptions(false));
      })
      .catch((err) => {
        toast.success(err.response.data.message, toastOptions(true));
      });
  };

  render() {
    const { accountName, accountNumber, sortCode, bankName } = this.state;

    return (
      <Container fluid={true}>
        <Nav />
        <AfterNav form={"Bank Details"} />
        <hr></hr>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg="2">
            <SideMenu />
          </Col>
          <Col lg="1"></Col>
          <Col className="dashboard-panel" lg="6">
            <Message attached header="Bank Details" />
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
              <Form.Field required>
                <label>Account name</label>

                <Form.Input
                  type="text"
                  required
                  value={accountName}
                  name="accountName"
                  onChange={this.onChange}
                  placeholder="Account name"
                  width={10}
                />
              </Form.Field>
              <Form.Field required>
                <label>Sort code</label>
                <Form.Input
                  type="text"
                  required
                  value={sortCode}
                  name="sortCode"
                  maxLength="8"
                  onChange={this.onChange}
                  placeholder="00-00-00"
                  width={6}
                />
              </Form.Field>
              <Form.Field required>
                <label>Account number</label>
                <Form.Input
                  type="text"
                  value={accountNumber}
                  name="accountNumber"
                  onChange={this.onChange}
                  placeholder="Account number"
                  width={10}
                />
              </Form.Field>
              <Form.Field required>
                <label>Bank name</label>
                <Form.Input
                  type="text"
                  required
                  value={bankName}
                  name="bankName"
                  onChange={this.onChange}
                  placeholder="Bank name"
                  width={10}
                />
              </Form.Field>

              <Button color="red" type="submit">
                Save <Icon name="save" />
              </Button>
            </Form>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}
BankDetail.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});
export default connect(mapStateToProps, { fetchUser })(BankDetail);
