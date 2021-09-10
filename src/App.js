import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { sendCartData } from "./store/async-cart/sendto";
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

  //% When the "cart" is updated in Redux, send the new cart to Firebase
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    console.log("useEffect ran!");
    dispatch(sendCartData(cart));
    // use our thunk to dispatch async code along with ui-slice's showNotification reducer function
  }, [cart, dispatch]);
  // this re-executes when Redux store's item KVP gets updated via a dispatched action
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

export default App;
