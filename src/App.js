
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

function App() {
  return (
    <div >
      <Header></Header>
      <Router>
        <Switch>
          <Route path ="/shop">
            <Shop></Shop>
          </Route>
          <Route path = "/review">
            <Review></Review>
          </Route>
          <Router path = "/inventory">
            <Inventory></Inventory>
          </Router>
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
    </div>
  );
}

export default App;
