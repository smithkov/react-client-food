import React, { Component } from "react";
import { Button, Rating, Form, Message, Header } from "semantic-ui-react";
import ClientService from "../../services/clientService";
import {
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
  LOGIN_URL,
} from "../../utility/global";
import { Link } from "react-router-dom";

export default class Review extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    rating: "5",
    title: "",
    content: "",
    message: "",
    isShowForm: true,
    showAlert: false,
  };

  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating });
  };

  onSubmit = async () => {
    const result = await ClientService.hasAuth();
    const user = result.data.data;
    if (user) {
      const { rating, title, content } = this.state;
      const shopId = this.props.shopId;
      const userId = user.id;

      const isForShop = this.props.isForShop;
      const productId = this.props.productId;

      const payload = { rating, title, content, shopId, userId, productId };
      const response = isForShop
        ? await ClientService.createReview(payload)
        : await ClientService.createProductReview(payload);

      if (response) {
        this.setState({
          showAlert: true,
          message: response.data.message,
          isShowForm: false,
        });
      }
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const poster = this.props.poster;
    const alert = this.state.showAlert ? (
      <Message
        info
        header="Review submitted - Thank you!"
        content={this.state.message}
      />
    ) : (
      ""
    );
    if (this.state.isShowForm) {
      return (
        <div>
          <Form onSubmit={this.onSubmit}>
            {alert}
            <Message floating>
              <Header as="h3">Create Review</Header>
            </Message>

            <Rating
              maxRating={5}
              onRate={this.handleRate}
              defaultRating={5}
              icon="star"
              size="massive"
            />
            <hr></hr>
            <Form.Field>
              {poster ? <h5>Posting publicly as: {poster}</h5> : ""}
              <input
                disabled={!poster}
                name="title"
                onChange={this.onChange}
                placeholder="What's most important to know?"
              />
            </Form.Field>
            <Form.TextArea
              disabled={!poster}
              onChange={this.onChange}
              name="content"
              label="Write your review"
              placeholder="What did you like or dislike?"
            />

            {poster ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Link to={LOGIN_URL}>
                <Button>Sign in to review</Button>
              </Link>
            )}
          </Form>
        </div>
      );
    } else {
      return (
        <Message
          info
          header="Review submitted - Thank you!"
          content={this.state.message}
        />
      );
    }
  }
}
