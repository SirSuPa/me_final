import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    Price: "",
  });
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cart, setCart] = useState([]); // State for the cart
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/products", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(`Error fetching products: ${err.message}`);
      });
  }, [token, navigate]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ProductName, Price } = newProduct;

    if (!ProductName || !Price) {
      setMessage("Please fill in all fields.");
      return;
    }

    const productData = {
      ProductName,
      Price: parseFloat(Price),
    };

    axios
      .post("http://localhost:5000/api/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessage("Product added successfully!");
        setNewProduct({ ProductName: "", Price: "" });
        setProducts((prevProducts) => [...prevProducts, res.data.product]);
      })
      .catch((err) => {
        setMessage(`Error adding product: ${err.message}`);
      });
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setMessage("Product deleted successfully!");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.ProductID !== productId)
          );
        })
        .catch((err) => {
          setMessage(`Error deleting product: ${err.message}`);
        });
    }
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.ProductID === product.ProductID);
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.ProductID === product.ProductID
            ? { ...item, Quantity: item.Quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { CartID: Date.now(), ProductID: product.ProductID, CustomerID: 1, Quantity: 1 },
      ]);
    }
    setMessage(`${product.ProductName} added to cart!`);
  };

  const filteredProducts = products.filter((product) =>
    product.ProductID.toString().includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Products</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product ID"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="mb-4 text-center">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <h3>Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="ProductName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="ProductName"
                name="ProductName"
                value={newProduct.ProductName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="Price"
                name="Price"
                value={newProduct.Price}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </form>
        </div>
      )}

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div className="col-md-4 mb-4" key={p.ProductID}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{p.ProductName}</h5>
                  <p className="card-text">Price: ${p.Price}</p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(p.ProductID)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mt-2 ms-2"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center">No products found</div>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/cart" className="btn btn-primary">
          Go to Cart ({cart.length})
        </Link>
      </div>
    </div>
  );
}

export default Products;
