import React, { Component } from "react";
import Listing from "./widgets/Listing";
import SideMenu from "./widgets/SideMenu";
import ClientService from "../services/clientService";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

class FoodListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   ClientService.products()
  //     .then((response) => {
  //       //const data = response.data;
  //       console.log(response.data.data[0]);
  //       this.setState({
  //         sellers: response.data.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <br />
        <Listing>
          <SideMenu />{" "}
        </Listing>
        <Footer />
      </div>
    );
  }
}

export default FoodListing;
