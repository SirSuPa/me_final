import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [amount, setAmount] = useState(""); // ช่องกรอกจำนวนเงิน
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentDetails || !amount) {
      setMessage("กรุณากรอกรายละเอียดและจำนวนเงิน");
      return;
    }

    setMessage("กำลังดำเนินการชำระเงิน...");

    // บันทึกจำนวนเงินลง localStorage
    localStorage.setItem("paymentAmount", amount);

    setTimeout(() => {
      setMessage("การชำระเงินสำเร็จ! กำลังไปยังหน้าติดตามคำสั่งซื้อ...");
      setTimeout(() => {
        navigate("/OrderStatus");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">ชำระเงิน</h2>

              {message && <div className="alert alert-info text-center">{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">วิธีการชำระเงิน</label>
                  <select className="form-control" value={paymentMethod} onChange={handlePaymentChange}>
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

                <div className="mb-3">
                  <label className="form-label">จำนวนเงิน</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">ยืนยันการชำระเงิน</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
