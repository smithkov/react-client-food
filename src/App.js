import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";

import Login from "./components/login";
import Register from "./components/register";
import ShopPage from "./components/ShopPage";
import ErrorPage from "./components/errorPage";
import Payment from "./components/payment";
import FoodListing from "./components/FoodListing";
import Dashboard from "./adminComponents/dashboard";
import ShopForm from "./adminComponents/shopForm";
import ProductList from "./adminComponents/productList";
import ProductForm from "./adminComponents/productForm";
import ProductUpdate from "./adminComponents/productUpdate";
import ShopSetting from "./adminComponents/shopSetting";
import ShopSocial from "./adminComponents/social";
import Account from "./adminComponents/account";
import ProductDetail from "./components/productDetail";
import PaymentSuccess from "./components/paymentSuccess";
import ApplicationSuccess from "./components/applicationSuccess";
import DeliveryDetail from "./components/deliveryDetail";
import ShopCreate from "./components/shopCreate";
import UserOrder from "../src/adminComponents/userOrder";
import OrderDetail from "./adminComponents/orderDetail";
import StoreReview from "./adminComponents/storeReview";
import AvailableTime from "./adminComponents/availableTime";
import Privacy from "./components/static/privacy";
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
  SHOP_REVIEW,
  REGISTER_URL,
  AVAILABILITY_URL,
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
  SHOP_SIGNUP,
  VENDOR_APPLY_SUCCESS,
  ORDER_DETAIL_URL,
  PRIVACY_URL
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
            <Route exact path={SHOP_SIGNUP} component={ShopCreate} />
            <Route exact path={SHOP_CREATE} component={ShopForm} />
            <Route exact path={PRIVACY_URL} component={Privacy} />
            <Route exact path={PRODUCT_DETAIL_URL} component={ProductDetail} />
            <Route
              exact
              path={VENDOR_APPLY_SUCCESS}
              component={ApplicationSuccess}
            />
            <Route
              exact
              path={MEAL_CREATE}
              component={ProtectedRoute(ProductForm)}
            />
             <Route
              exact
              path={ORDER_DETAIL_URL}
              component={ProtectedRoute(OrderDetail)}
            />
            <Route
              exact
              path={AVAILABILITY_URL}
              component={ProtectedRoute(AvailableTime)}
            />
            <Route
              exact
              path={SHOP_REVIEW}
              component={ProtectedRoute(StoreReview)}
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
            <Route component={ErrorPage} />
            
            <Route exact path={PAY_STATUS_URL} component={PaymentSuccess} />
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    );
  }
}

export default App;
