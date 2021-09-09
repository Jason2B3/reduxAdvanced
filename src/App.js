import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef } from "react";
import { uiActions } from "./store/ui-slice"; //
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
let isInitial = true;

function App() {
  const dispatch = useDispatch();

  // A helper function to help us a call one of ui-slice.js reducer functions
  // Will be used to render content when request is pending, successful, or a failure
  function uiSlice_showNotification(status, title, message) {
    // prettier-ignore
    dispatch(uiActions.showNotification({
        status: status,
        title: title,
        message: message,
    }))
  }
  // Access Redux store variables (check the slice files)
  const showCart = useSelector((state) => state.ui.cartIsVisible); // ui-slice.js
  const cart = useSelector((state) => state.cart); // cart-slice.js
  const notification = useSelector((state) => state.ui.notification); // ui-slice.js

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    console.log("useEffect ran!");

    const sendCartData = async function () {
      // showNotification: Pending state
      uiSlice_showNotification("pending", "sending", "Sending cart data!");

      //% Update Firebase data
      // prettier-ignore
      const response= await fetch("https://reduxadv-c13f7-default-rtdb.firebaseio.com/data.json", {
        method: "PUT", // replace data in our database
        body: JSON.stringify(cart),
      });
      if (!response.ok) throw new Error("Sending cart data failed");

      // showNotification: Success state
      uiSlice_showNotification("success", "Success", "Data sent successfully!");
    }; // END OF ASYNC FUNCTION

    // Invoke your async function within useEffect, then catch any errors (alt try/catch)
    sendCartData().catch((error) => {
      uiSlice_showNotification("error", "Error", "Sending data failed");
      console.log("oopsie");
    });
    // ----- end of useEffect ------------
  }, [cart]);
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
