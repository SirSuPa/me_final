import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("Orders data:", res.data); // Debugging output
        setOrders(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Unauthorized or failed to fetch orders.");
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="text-center mt-5">Loading orders...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
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
    </div>
  );
}

export default Orders;
