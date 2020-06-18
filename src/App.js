import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";

import Footer from "./components/Footer";
import Login from "./components/login";
import Register from "./components/register";
import ShopPage from "./components/ShopPage";
import FoodListing from "./components/FoodListing";
import Dashboard from "../src/adminComponents/dashboard";
import ShopForm from "../src/adminComponents/shopForm";
import ProductList from "../src/adminComponents/productList";
import ProductForm from "../src/adminComponents/productForm";
import ShopSetting from "../src/adminComponents/shopSetting";
import Account from "../src/adminComponents/account";
import ProductDetail from "./components/productDetail";
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
           
            <Route exact path="/myAccount" component={Account} />
            <Route exact path="/dashboard" component={ProtectedRoute(Dashboard)} />
            <Route exact  path="/:shopUrl" component={ShopPage} />
            <Route exact  path="/shop/settings" component={ShopSetting} />
            <Route exact  path="/item_meal_detail/product/:id" component={ProductDetail} />

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
