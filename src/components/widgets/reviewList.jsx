import React, { Component } from "react";
import { Button, Comment, Form, Header, Rating } from "semantic-ui-react";
import Moment from "react-moment";

import {
  DEFAULT_USER,
  DEFAULT_BANNER,
  DEFAULT_LOGO,
  LOGIN_URL,
} from "../../utility/global";
import { Link } from "react-router-dom";

export default class ReviewList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: true,
    replyContent: "",
    reply: this.props.data.ratingResponses,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCollapse = (e) => {
    const initialColapseState = !this.state.collapsed;
    this.setState({ collapsed: initialColapseState });
  };
  componentWillReceiveProps(nextProps) {
    //this updates the view when a reply is made
    const replyResultForUpdate = nextProps.replyResult;
    if (replyResultForUpdate) {
      this.state.reply.unshift(replyResultForUpdate);
      this.setState({
        replyContent: "",
      });
    }
  }
  render() {
    const { collapsed, replyContent, reply } = this.state;
    const {
      title,
      User,
      content,
      createdAt,
      rating,
      shopId,
      userId,
      id,
    } = this.props.data;
    
    const poster = this.props.poster
    return (
      <div>
        <Comment.Group>
          {/* <Header as="h3" dividing>
            Comments
          </Header> */}

          <Comment>
            <Comment.Avatar
              src={User.photo ? `${User.photo}` : DEFAULT_USER}
            />

            <Comment.Content>
              <Comment.Metadata>
                {/* <div>Today at 5:42PM</div> */}
                <Rating
                  icon="star"
                  defaultRating={rating}
                  maxRating={5}
                  disabled
                />
              </Comment.Metadata>
              <Comment.Author as="a">{title}</Comment.Author>
              <Comment.Text>{User.firstName}</Comment.Text>
              <Comment.Metadata>
                <div>
                  <Moment fromNow>{createdAt}</Moment>
                </div>
              </Comment.Metadata>
              <Comment.Text>{content}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={this.handleCollapse}>
                  Reply review
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Comment.Group>
              {reply.map((comment) => {
                const Shop = comment.VirtualShop;
                const User = comment.User;
                let name, photo;
                if (Shop) {
                  name = Shop.shopName;
                  photo = Shop.logo;
                } else if (User) {
                  name = User.firstName;
                  photo = User.photo;
                }

                return (
                  <Comment>
                    <Comment.Avatar
                      src={photo ? `${photo}` : DEFAULT_USER}
                    />
                    <Comment.Content>
                      <Comment.Author as="a">{name}</Comment.Author>
                      <Comment.Metadata>
                        <div>
                          <Moment fromNow>{comment.createdAt}</Moment>
                        </div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.content}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                );
              })}
            </Comment.Group>
            <Comment.Group collapsed={collapsed}>
              <Form reply>
                {poster? <h5>Posting publicly as: {poster}</h5>:""}
                <Form.TextArea disabled={!poster}
                  name="replyContent"
                  onChange={this.onChange}
                  value={replyContent}
                  style={{ height: 80 }}
                  placeholder="Respond to this review. Reply must adhere to our Terms and Conditions Guidelines."
                />
                {poster?<Button
                  disabled={!replyContent}
                  onClick={() =>
                    this.props.handleReply({
                      shopId,
                      userId,
                      ratingId: id,
                      content: replyContent,
                    })
                  }
                  size="mini"
                  color="red"
                >
                  Post a reply
                </Button>:<Link to={LOGIN_URL}><Button>Sign in to comment</Button></Link>}
              </Form>
            </Comment.Group>
          </Comment>
        </Comment.Group>
        <hr></hr>
      </div>
    );
  }
}
