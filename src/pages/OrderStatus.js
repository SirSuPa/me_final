import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderStatus() {
  const [orders, setOrders] = useState([]); // เก็บรายการคำสั่งซื้อ
  const navigate = useNavigate();

  useEffect(() => {
    // จำลองการโหลดสถานะจาก localStorage หรือ API
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (storedOrders.length === 0) {
      // ถ้าไม่มีข้อมูล ให้สร้างตัวอย่างคำสั่งซื้อ
      const exampleOrders = [
        { id: 1, status: "รอดำเนินการ", message: "คำสั่งซื้อได้รับการยืนยันแล้ว" },
        { id: 2, status: "กำลังจัดส่ง", message: "สินค้าของคุณอยู่ระหว่างการจัดส่ง" },
        { id: 3, status: "จัดส่งสำเร็จ", message: "สินค้าส่งถึงปลายทางแล้ว!" },
      ];
      localStorage.setItem("orders", JSON.stringify(exampleOrders));
      setOrders(exampleOrders);
    } else {
      setOrders(storedOrders);
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">สถานะคำสั่งซื้อ</h2>

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
