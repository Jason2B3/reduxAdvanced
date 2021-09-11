import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { sendCartData } from "./store/async-cart/sendto";
import { pullFrom } from "./store/async-cart/pullFrom";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
let isInitial = true;

function App() {
  const dispatch = useDispatch();

  // Access Redux store variables (check the slice files)
  const showCart = useSelector((state) => state.ui.cartIsVisible); // ui-slice.js
  const cart = useSelector((state) => state.cart); // cart-slice.js
  const notification = useSelector((state) => state.ui.notification); // ui-slice.js
  //% On startup, fetch items saved in Firebase
  useEffect(() => {
    dispatch(pullFrom()); // changes a Redux store value
    console.log("on mount ran!");
  }, []);
  //% When the "cart" is updated in Redux, send the new cart to Firebase
  useEffect(() => {
    //! comment out to eliminate navbar glow altogether
    if (isInitial) {
      isInitial = false;
      console.log("cart update ran but failed!");
      return;
    }
    console.log("cart update ran successfully!");
    dispatch(sendCartData(cart));
    // use our thunk to dispatch async code along with ui-slice's showNotification reducer function
  }, [cart]);
  // this re-executes when Redux store's item KVP gets updated via a dispatched action
  console.log("this being my first render is", isInitial);
  if (isInitial) {
    console.log("JSX WITHOUT navbar glow");
    return (
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    );
  } else {
    console.log("JSX WITH navbar glow");
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
