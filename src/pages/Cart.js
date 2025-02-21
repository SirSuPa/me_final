import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    updateCart(updatedCart);
  };

  const handleRemoveAll = () => {
    updateCart([]);
    localStorage.removeItem("cart");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Number(item.Price) * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold">🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">Your cart is empty.</div>
      ) : (
        <ul className="list-group shadow-sm rounded">
          {cart.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center p-3 border-0 shadow-sm mb-2 rounded"
            >
              <div className="d-flex flex-column">
                <span className="fw-bold text-success">{item.ProductName}</span>
                <span className="text-muted">💲 Price: ${Number(item.Price).toFixed(2)}</span>
                <div className="d-flex align-items-center mt-2">
                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  >
                    ➖
                  </button>
                  <span className="fw-bold px-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-success ms-2"
                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  >
                    ➕
                  </button>
                </div>
                <span className="mt-2 text-dark fw-bold">Total: ${(Number(item.Price) * item.quantity).toFixed(2)}</span>
              </div>
              <button className="btn btn-outline-danger" onClick={() => handleRemoveFromCart(index)}>
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h4 className="fw-bold text-dark">Total Price: ${calculateTotal()}</h4>
          <button
            className="btn btn-outline-warning me-2 fw-bold"
            onClick={() => navigate("/products")}
          >
            ⬅️ Continue Shopping
          </button>
          <button
            className="btn btn-outline-success me-2 fw-bold"
            onClick={() => navigate("/payment")}
          >
            ✅ Proceed to Payment
          </button>
          <button
            className="btn btn-outline-danger fw-bold"
            onClick={handleRemoveAll}
          >
            🗑 Remove All
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
