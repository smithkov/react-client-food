import React, { Component } from "react";
import SideMenu from "./common/sideMenu";
import { Col, Container, Row } from "reactstrap";
import Nav from "./common/nav";
import { Button, Checkbox, Icon, Table, Segment } from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import { MISSING_USER_MSG, ERROR_MSG, MEAL_CREATE } from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import ReviewList from "../components/widgets/reviewList";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Wrapper from "./wrapper";

class StoreReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewList: [],
      shopName: "",
      replyResult: "",
    };
  }

  componentDidMount = async () => {};
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const shopId = nextProps.user.shopId;

      const result = await clientService.findProductReviewByShop({ shopId });
      const shopResult = await clientService.findShopById(shopId);
      const shop = shopResult.data.data;

      this.setState({
        reviewList: result.data.data,
        shopName: shop.shopName,
      });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
  };
  handleReply = async (data) => {
    const { content, shopId, ratingId } = data;
    const result = await clientService.createProductRatingResponse({
      content,
      shopId,
      ratingId,
    });
    this.setState({ replyResult: result.data.data });
  };
  render() {
    const { replyResult, shopName } = this.state;
    return (
      <Container fluid={true}>
        <Wrapper>
          <Segment padded>
            {this.state.reviewList.map((review) => {
              return (
                <ReviewList
                  replyResult={replyResult}
                  poster={shopName}
                  handleReply={this.handleReply}
                  data={review}
                />
              );
            })}
          </Segment>
          <br />
          <br />
        </Wrapper>
      </Container>
    );
  }
}
StoreReview.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(StoreReview);
