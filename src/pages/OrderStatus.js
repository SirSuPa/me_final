import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    const amount = localStorage.getItem("paymentAmount");
    setTotalAmount(amount);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">สถานะคำสั่งซื้อ</h2>

      {totalAmount && (
        <div className="alert alert-info text-center">
          💰 ยอดชำระ: <strong>{parseFloat(totalAmount).toFixed(2)} บาท</strong>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="alert alert-warning text-center">ยังไม่มีคำสั่งซื้อ</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-4 mb-3" key={order.id}>
              <div className={`card shadow-sm ${order.status === "จัดส่งสำเร็จ" ? "border-success" : "border-info"}`}>
                <div className="card-body">
                  <h5 className="card-title">คำสั่งซื้อ #{order.id}</h5>
                  <p className="card-text">{order.message}</p>
                  <span className={`badge ${order.status === "จัดส่งสำเร็จ" ? "bg-success" : "bg-primary"}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          กลับไปหน้าหลัก
        </button>
      </div>
    </div>
  );
}

export default OrderStatus;
