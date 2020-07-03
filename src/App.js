import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Login from "./components/login";
import Register from "./components/register";
import ShopPage from "./components/ShopPage";
import Payment from "./components/payment";
import FoodListing from "./components/FoodListing";
import Dashboard from "../src/adminComponents/dashboard";
import ShopForm from "../src/adminComponents/shopForm";
import ProductList from "../src/adminComponents/productList";
import ProductForm from "../src/adminComponents/productForm";
import ProductUpdate from "../src/adminComponents/productUpdate";
import ShopSetting from "../src/adminComponents/shopSetting";
import ShopSocial from "../src/adminComponents/social";
import Account from "../src/adminComponents/account";
import ProductDetail from "./components/productDetail";
import PaymentSuccess from "./components/paymentSuccess";
import DeliveryDetail from "./components/deliveryDetail";
import UserOrder from "../src/adminComponents/userOrder";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  MEAL_CREATE,
  MEAL_LIST,
  MEAL_UPDATE,
  SHOP_CREATE,
  LOGIN_URL,
  REGISTER_URL,
  MY_ACCOUNT,
  DASHBOARD_URL,
  PAYMENT_URL,
  PAY_STATUS_URL,
  DELIVERY_DETAIL_URL,
  USER_ORDER_URL,
  LISTING_URL,
  SHOP_SETTING_URL,
  SHOP_SOCIAL_URL,
  SHOP_PAGE_URL,
  PRODUCT_DETAIL_URL,
} from "./utility/global";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path={LISTING_URL} component={FoodListing} />
            <Route exact path={LOGIN_URL} component={Login} />
            <Route exact path={REGISTER_URL} component={Register} />
            <Route
              exact
              path={SHOP_CREATE}
              component={ProtectedRoute(ShopForm)}
            />
            <Route
              exact
              path={MEAL_CREATE}
              component={ProtectedRoute(ProductForm)}
            />
            <Route
              exact
              path={MEAL_LIST}
              component={ProtectedRoute(ProductList)}
            />
            <Route
              exact
              path={MEAL_UPDATE}
              component={ProtectedRoute(ProductUpdate)}
            />
            <Route
              exact
              path={MY_ACCOUNT}
              component={ProtectedRoute(Account)}
            />
            <Route
              exact
              path={DASHBOARD_URL}
              component={ProtectedRoute(Dashboard)}
            />
            <Route exact path={SHOP_PAGE_URL} component={ShopPage} />
            <Route exact path={SHOP_SETTING_URL} component={ShopSetting} />
            <Route exact path={SHOP_SOCIAL_URL} component={ShopSocial} />
            <Route
              exact
              path={USER_ORDER_URL}
              component={ProtectedRoute(UserOrder)}
            />
            <Route
              exact
              path={DELIVERY_DETAIL_URL}
              component={ProtectedRoute(DeliveryDetail)}
            />
            <Route
              exact
              path={PAYMENT_URL}
              component={ProtectedRoute(Payment)}
            />
            <Route exact path={PRODUCT_DETAIL_URL} component={ProductDetail} />
            <Route exact path={PAY_STATUS_URL} component={PaymentSuccess} />
          </Switch>
          <Footer />
        </Router>
        <ToastContainer />
      </Provider>
    );
  }
}

export default App;
