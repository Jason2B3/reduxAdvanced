// Enable Redux dispatching
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  // Purchasable item details given via props from Product.js
  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    // dispatch Redux's addItemToCart method, and provide item details via payload
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
