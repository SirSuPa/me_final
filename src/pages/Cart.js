import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  const handleRemoveFromCart = (CartID) => {
    const updatedCart = cart.filter((item) => item.CartID !== CartID);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (CartID, quantity) => {
    const updatedCart = cart.map((item) =>
      item.CartID === CartID ? { ...item, Quantity: quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">Your cart is empty.</div>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div className="col-md-4 mb-4" key={item.CartID}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Product ID: {item.ProductID}</h5>
                  <p className="card-text">Quantity: 
                    <input
                      type="number"
                      min="1"
                      value={item.Quantity}
                      onChange={(e) => handleQuantityChange(item.CartID, e.target.value)}
                      className="form-control w-25"
                    />
                  </p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleRemoveFromCart(item.CartID)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
