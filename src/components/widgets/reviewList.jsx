import React, { Component } from "react";
import { Button, Comment, Form, Header, Rating } from "semantic-ui-react";
import Moment from "react-moment";

import {
  getUserProfile,
  DEFAULT_USER,
  DEFAULT_BANNER,
  IMAGE_URL,
  DEFAULT_LOGO,
} from "../../utility/global";

export default class ReviewList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, User, content, createdAt, rating } = this.props.data;
    return (
      <div>
        <Comment.Group>
          {/* <Header as="h3" dividing>
            Comments
          </Header> */}

          <Comment>
            <Comment.Avatar
              src={User.photo ? `${IMAGE_URL}${User.photo}` : DEFAULT_USER}
            />

            <Comment.Content>
              <Comment.Metadata>
                {/* <div>Today at 5:42PM</div> */}
                <Rating icon="star" defaultRating={rating} maxRating={5} disabled />
              </Comment.Metadata>
              <Comment.Author as="a">{title}</Comment.Author>
              <Comment.Text>{User.firstName}</Comment.Text>
              <Comment.Metadata>
                <div><Moment fromNow>{createdAt}</Moment></div>
              </Comment.Metadata>
              <Comment.Text>{content}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
        <hr></hr>
      </div>
    );
  }
}
