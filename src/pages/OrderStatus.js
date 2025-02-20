import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderStatus() {
  const [orderStatus, setOrderStatus] = useState(null); // สถานะการสั่งซื้อ
  const navigate = useNavigate();

  useEffect(() => {
    // สมมุติว่าเราจะดึงข้อมูลสถานะจาก API
    const orderID = 12345; // ตัวอย่าง OrderID ที่ได้จากการยืนยันคำสั่งซื้อ
    // อาจจะทำการดึงข้อมูลสถานะจาก API ที่ server
    setOrderStatus("กำลังดำเนินการ");

    // หรือถ้าต้องการให้คนไม่สามารถเข้าหน้านี้โดยตรงถ้าไม่ได้ทำการสั่งซื้อ
    // สามารถใช้ `navigate("/login")` เพื่อให้ไปที่หน้า login หากไม่มีข้อมูลการสั่งซื้อ
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Status</h2>

      {orderStatus ? (
        <div className="alert alert-info text-center">
          สถานะการสั่งซื้อของคุณคือ: {orderStatus}
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
