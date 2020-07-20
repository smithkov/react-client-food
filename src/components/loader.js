import React from "react";
import PropTypes from "prop-types";
import {
    Input,
    Label,
    Menu,
    Icon,
    Segment,
    Dimmer,
    Loader,
    Image,
  } from "semantic-ui-react";

function loader(props) {
  return (
    <div style={{ padding: 20 }}>
      <Loader active inline="centered" />
    </div>
  );
}

loader.propTypes = {};

export default loader;
