import React, { Component } from "react";

class Carousel extends Component {
  render() {
    return (
      <div>
        <div class="view">
          <img
            src="/images/header.jpg"
            class="img-fluid"
            alt="Image of ballons flying over canyons with mask pattern one."
          />
          <div class="mask pattern-2 flex-center">
            <div className="home-search-box">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Post code" />
                <div class="input-group-append">
                <div style={{backgroundColor:"red"}} class="input-group-text" id="btnGroupAddon">Search</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
