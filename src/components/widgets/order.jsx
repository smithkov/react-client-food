import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Grid, Button, Header, List, Table } from "semantic-ui-react";
import {
  DEFAULT_LOGO,
  displayRating,
  totalRating,
  formatPrice,
} from "../../utility/global";
import { Link } from "react-router-dom";

export default class Order extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, quantity, id, price } = this.props.item;
    return (
      <React.Fragment>
        <Table.Row>
          <Table.Cell><List.Icon
              name="minus square"
              onClick={() => this.props.handleRemove(id)}
            />  {`${quantity}x ${name} `}</Table.Cell>
          <Table.Cell textAlign='right'> {`${formatPrice(quantity * price)}`}</Table.Cell>
        </Table.Row>
      </React.Fragment>
    );
  }
}
