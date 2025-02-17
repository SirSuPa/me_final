import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Decode the token to get the userId (assuming JWT)
    const userId = JSON.parse(atob(token.split('.')[1])).userId;

    // Fetch orders for the specific user using the userId
    axios
      .get(`http://localhost:5000/api/orders/${userId}`, {  // Include userId in the URL
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Your Orders</h2>
      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Order Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={order.OrderID || index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order.OrderID}</td>
                    <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                    <td>{`$${order.TotalPrice.toFixed(2)}`}</td>
                    <td>{order.Status}</td>
                    <td>{new Date(order.CreatedAt).toLocaleDateString()}</td>
                    <td>{new Date(order.UpdatedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        data-bs-toggle="collapse"
                        data-bs-target={`#orderDetails${order.OrderID}`}
                        aria-expanded="false"
                        aria-controls={`orderDetails${order.OrderID}`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                  <tr id={`orderDetails${order.OrderID}`} className="collapse">
                    <td colSpan="8">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead className="table-secondary">
                            <tr>
                              <th>#</th>
                              <th>Product ID</th>
                              <th>Quantity</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.OrderDetails.map((detail, idx) => (
                              <tr key={detail.OrderDetailID || idx}>
                                <td>{idx + 1}</td>
                                <td>{detail.ProductID}</td>
                                <td>{detail.Quantity}</td>
                                <td>{`$${detail.Subtotal.toFixed(2)}`}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">No orders available</div>
      )}
    </div>
  );
}

export default Orders;
