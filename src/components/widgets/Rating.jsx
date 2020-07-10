import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";

class Rating extends Component {
  constructor() {
    super();

    this.state = {
      rating: 4,
    };
  }
  onStarClick(nextValue, prevValue, name) {
     
    this.setState({ rating: nextValue });
  }
  render() {
    const { rating } = this.state;
    return (
      <div>
       
        <StarRatingComponent
          name={this.props.rating.id.toString()}
          starCount={5}
          id={this.props.rating.id.toString()}
          value={this.props.rating.value}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
export default Rating;
