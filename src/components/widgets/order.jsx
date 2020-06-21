import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Grid, Button, Header, List } from "semantic-ui-react";
import {
  IMAGE_URL,
  DEFAULT_LOGO,
  displayRating,
  totalRating,
} from "../../utility/global";
import { Link } from "react-router-dom";

export default class Order extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, quantity, id } = this.props.item;
    return (
      <React.Fragment>
        
          <List.Item>
            <List.Icon
              name="minus square"
              onClick={() => this.props.handleRemove(id)}
            />

            <List.Content>{`${quantity}x ${name}`}</List.Content>
          </List.Item>
        
      </React.Fragment>
    );
  }
}
