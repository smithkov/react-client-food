import React, { Component } from "react";
import SectionCarousel from './SectionCarousel'
import Carousel from './Carousel'

import Rating from './widgets/Rating'


class Landing extends Component {

  state= {
    items: [
      {id:1,name:"Mama Iyabo", img:'./images/food3.jpg', value:3},
      {id:2, name:"Papa Joe", img:'./images/food2.jpg', value:2},
      {id:3, name:"Rosy Cake", img:'./images/food1.jpg', value:5},
      {id:4, name:"Mike Vine", img:'./images/food4.jpg', value:1},
      {id:5, name:"Ninolayo Ade", img:'./images/food1.jpg', value:3},
      {id:5, name:"Grace Meal", img:'./images/food4.jpg', value:4},
    ]
   }

  render() {
    return (
      <div style={{padding:20}}>
        <Carousel/>
        <SectionCarousel items = {this.state.items} >
        <h2>Popular Cousines</h2>
        <p class="font-weight-lighter">Browse popular take out cuisines from restaurants in your area and order delivery online.</p>
        </SectionCarousel>

        <SectionCarousel items = {this.state.items} >
        <h2>Popular Pastries</h2>
        <p class="font-weight-lighter">Browse popular take out cuisines from restaurants in your area and order delivery online.</p>
        </SectionCarousel>
      </div>
    );
  }
}

export default Landing
