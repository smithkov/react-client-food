import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../src/utility/global";
import clientService from "./services/clientService";

export default function ProtectedRoute(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount = async () => {
      try {
        const result = await clientService.hasAuth();
        const error = result.data.error;

        if (!error) {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, redirect: true });
        }
      } catch (err) {
        this.setState({ loading: false, redirect: true });
      }
    };

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
