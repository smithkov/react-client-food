import React from "react";
import PropTypes from "prop-types";
import { Image, Segment, Dimmer, Loader } from "semantic-ui-react";

function bigLoader(props) {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Segment>
  );
}

bigLoader.propTypes = {};

export default bigLoader;
