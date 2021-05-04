
import './App.css';
import Header from './component/Header/Header';
// import Product from './component/Product/Product';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import ProductDetail from './component/ProductDetail/ProductDetail';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] =  useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]} >
      <h3>email: {loggedInUser.email}</h3>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path ="/shop">
            <Shop></Shop>
          </Route>
          <Route path = "/review">
            <Review></Review>
          </Route>
          <PrivateRoute path = "/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path = "/login">
            <Login></Login>
          </Route>
          <PrivateRoute path = "/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Router exact path = "/">
            <Shop></Shop>
          </Router>
          <Route path= "/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Router  path = "*">
            <NotFound></NotFound>
          </Router>
        </Switch>
      </Router>
      
      
      {/* <Product></Product> */}
    </UserContext.Provider>
  );
}

export default App;
