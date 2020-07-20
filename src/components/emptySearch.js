import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LISTING_URL } from "../utility/global";
import { Button, Segment } from "semantic-ui-react";

function emptySearch(props) {
  return (
    <div>
      <Segment raised textAlign={"center"} style={{ padding: 20 }} raised>
        <h2>No result found, try removing some filters</h2>
        <br />
        <a href={LISTING_URL}>
          {" "}
          <Button color="red">Return to main listing</Button>
        </a>
      </Segment>
    </div>
  );
}

emptySearch.propTypes = {};

export default emptySearch;
