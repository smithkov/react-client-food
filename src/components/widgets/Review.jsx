import React, { Component } from "react";
import { Button, Rating, Form, Message, Header } from "semantic-ui-react";
import ClientService from "../../services/clientService";
import {
  getUserProfile,
  MISSING_USER_MSG,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
} from "../../utility/global";

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
    const user = getUserProfile();
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
              <label>Add a headline</label>
              <input
                name="title"
                onChange={this.onChange}
                placeholder="What's most important to know?"
              />
            </Form.Field>
            <Form.TextArea
              onChange={this.onChange}
              name="content"
              label="Write your review"
              placeholder="What did you like or dislike?"
            />

            <Button type="submit">Submit</Button>
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
