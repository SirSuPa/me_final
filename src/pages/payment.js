import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // เก็บวิธีการชำระเงิน
  const [paymentDetails, setPaymentDetails] = useState(""); // เก็บรายละเอียดการชำระเงิน
  const [message, setMessage] = useState(""); // ข้อความแจ้งเตือน
  const navigate = useNavigate(); // ใช้สำหรับการเปลี่ยนหน้า

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value); // เปลี่ยนวิธีการชำระเงิน
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentDetails) {
      setMessage("กรุณากรอกรายละเอียดการชำระเงิน");
      return;
    }

    // สมมุติการชำระเงินสำเร็จ:
    setMessage("การชำระเงินสำเร็จ!");

    // เมื่อการชำระเงินสำเร็จ เปลี่ยนไปหน้า OrderStatus
    setTimeout(() => {
      navigate("/orderstatus"); // ไปยังหน้า OrderStatus
    }, 2000); // รอ 2 วินาที ก่อนเปลี่ยนหน้า
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">ชำระเงิน</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">วิธีการชำระเงิน</label>
          <select
            className="form-control"
            value={paymentMethod}
            onChange={handlePaymentChange}
          >
            <option value="creditCard">บัตรเครดิต</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">โอนเงินผ่านธนาคาร</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">รายละเอียดการชำระเงิน</label>
          <input
            type="text"
            className="form-control"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          ยืนยันการชำระเงิน
        </button>
      </form>
    </div>
  );
}

export default Payment;
