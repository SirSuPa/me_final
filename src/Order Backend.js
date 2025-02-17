const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api/orders', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Verify the token
    const userId = decoded.userId; // Assuming the userId is stored in the token payload

    // Fetch orders from the database for the current user
    Order.find({ userId }) // Assuming you have a model like Order that stores userId
      .then((orders) => res.json(orders))
      .catch((err) => res.status(500).json({ message: "Error fetching orders", error: err }));
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});
