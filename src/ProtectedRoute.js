import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../src/utility/global";
import {getUserProfile} from './utility/global'

export default function ProtectedRoute(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const data = getUserProfile();
     
      if (data) {
        axios
          .post(
            SERVER_URL + "/user/isLogin",
            { id: data.id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data ? data.token : ""}`,
              },
            }
          )
          .then((response) => {
            //if(!response.data.error){

            if (!response.data.error) this.setState({ loading: false });
            //}
          })
          .catch((err) => {
            this.setState({ loading: false, redirect: true });
          });
      }else{
        this.setState({ loading: false, redirect: true });
      }
    }

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
