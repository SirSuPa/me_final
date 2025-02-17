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

    axios
      .get("http://localhost:5000/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data); // Check the structure of the response
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError(`Error fetching orders: ${err.message}`);
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Your Orders</h2>
      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, index) => (
                <tr key={o.OrderID}>
                  <td>{index + 1}</td>
                  <td>{o.OrderDate}</td>
                  <td>{o.FullName}</td>
                  <td>{o.ProductName}</td>
                  <td className="fw-bold">{o.Quantity}</td>
                </tr>
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
