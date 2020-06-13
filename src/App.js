import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";

import Footer from "./components/Footer";
import Login from "./components/login";
import Register from "./components/register";
import ShopPage from "./components/shopPage";
import FoodListing from "./components/FoodListing";
import Dashboard from "../src/adminComponents/dashboard";
import ShopForm from "../src/adminComponents/shopForm";
import ProductList from "../src/adminComponents/productList";
import ProductForm from "../src/adminComponents/productForm";
import Account from "../src/adminComponents/account";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./ProtectedRoute";

class App extends React.Component {
  state = {
    isAuthenticated: false,
  };
 

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/listing" component={FoodListing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/seller_reg" component={ShopForm} />
            <Route exact path="/product_reg" component={ProductForm} />
            <Route exact path="/product_list" component={ProductList} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/myAccount" component={Account} />
            <Route path="/dashboard" component={ProtectedRoute(Dashboard)} />

            {/* <Route path="/add" component={AddUser} />
        <Route path="/edit/:id" component={EditUser} /> */}
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
