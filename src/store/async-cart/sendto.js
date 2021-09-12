import { uiActions } from "../ui-slice"; //% import from a sibling slice file

// Define a function that returns an async function
export const sendCartData = (cart) => {
  // cart will be cart-slice.js' items KVP in the state object
  return async function (dispatch) {
    // This helper FN dispatches one of ui-slice's reducer functions
    function uiSlice_showNotif(status, title, message) {
      dispatch(
        uiActions.showNotification({
          status: status,
          title: title,
          message: message,
        })
      );
    }

    // This nested function expression should take care of any async operations
    const fetchRequest = async () => {
      const response = await fetch(
        "https://reduxadv-c13f7-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) throw new Error("Sending cart data failed.");
    };

    try {
      uiSlice_showNotif("pending", "Sending...", "Sending cart data");
      await fetchRequest(); // make the fetch request
      uiSlice_showNotif("success", "Success!", "Sent cart data successfully!");
    } catch (errorObj) {
      uiSlice_showNotif("error", "Error!!", "Could not send cart data!");
    }
  };
};
