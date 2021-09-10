import { cartActions } from "../cart-slice";

export const pullFrom = () => {
  return async function (dispatch) {
    // Pending state: No need for one
    const fetchRequest = async () => {
      const response = await fetch(
        "https://reduxadv-c13f7-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) throw new Error("Sending cart data failed.");
      return response.json();
    };

    try {
      let results = await fetchRequest();
      console.log(results)
      // Success state: Replace the cart with what's fetched, then render
      dispatch(cartActions.replaceCart(results));
    } catch (errorObj) {
      // Failure state: Render everything as is
      return;
    }
  };
};
