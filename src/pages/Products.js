import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to login if token is not found
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/products", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data); // Check the data structure
        setProducts(res.data.products || []); // If the data is inside "products", access it properly
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(`Error fetching products: ${err.message}`);
      });
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); // Show loading spinner
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Products</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>} {/* Show error message if any */}

      <div className="row">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p.ProductID}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{p.ProductName}</h5>
                  <p className="card-text">Price: ${p.Price}</p>
                  <a href="#" className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center">No products available</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
