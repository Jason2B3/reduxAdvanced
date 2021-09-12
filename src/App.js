import React, { useEffect } from "react";
// Redux-related imports
import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./store/async-cart/sendto";
import { pullFrom } from "./store/async-cart/pullFrom";
// Context API imports
import { useCustomHook } from "./context";
// Component Imports
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const { navGlow } = useCustomHook(); // see explanation for this variable at the bottom
  const dispatch = useDispatch();

  // Access Redux store variables (check the slice files)
  const showCart = useSelector((state) => state.ui.cartIsVisible); // ui-slice.js
  const cart = useSelector((state) => state.cart); // cart-slice.js
  const notification = useSelector((state) => state.ui.notification); // ui-slice.js
  //% On startup, fetch items saved in Firebase
  useEffect(() => {
    dispatch(pullFrom()); // changes a Redux store value
  }, []);
  //% When the "cart" is updated in Redux, send the new cart to Firebase
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart)); 
    // use our thunk to dispatch async code along with ui-slice's showNotification reducer function
  }, [cart]);
  // this re-executes when Redux store's item KVP gets updated via a dispatched action
  if (navGlow === false) {
    return (
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    );
  }
  if (navGlow === true) {
    return (
      <>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        <Layout>
          {showCart && <Cart />}
          <Products />
        </Layout>
      </>
    );
  }
}

export default App;

//# EXPLANATIONS
/*
Nav glow is a context API variable that starts off as false on startup
Gets set to true after we add/subtract cart items via the Add to Cart button on ProfductItem.js
Gets set to true by pressing the + - buttons in cartItem.js as well

Navglow= true   means we should render success/failure/pending on the navbar
navGlow= false  means we shouldn't

We don't want the navbar to have a "Successfully sent data" message rendered on startup when we fetch our cart items
*/
