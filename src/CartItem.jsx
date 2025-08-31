import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // remove "$"
    return price * item.quantity;
  };

  // ✅ Calculate total for all items
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      return total + calculateTotalCost(item);
    }, 0);
  };

  // ✅ Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // if quantity would go to 0, remove
    }
  };

  // ✅ Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // ✅ Checkout placeholder
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className="cart-card">
              <img src={item.image} alt={item.name} width="100" />
              <div>
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
                <button onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}

          <h3>Total: ${calculateTotalAmount()}</h3>

          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartItem;
