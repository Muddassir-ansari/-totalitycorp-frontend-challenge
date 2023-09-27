import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCheckoutDetails } from "../../redux/AppSlice";
const CheckoutForm = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const state = useSelector((state) => state.eCommerceApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Cart") !== null)) {
      setItemDetails(JSON.parse(localStorage.getItem("Cart")));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formValues.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formValues.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formValues.country) {
      errors.country = "Country is required";
    }
    if (!formValues.state) {
      errors.state = "State is required";
    }
    if (!formValues.zip.trim()) {
      errors.zip = "ZIP code is required";
    }
    if (!formValues.ccName.trim()) {
      errors.ccName = "Name on card is required";
    }
    if (!formValues.ccNumber.trim()) {
      errors.ccNumber = "Credit card number is required";
    }
    if (!formValues.ccExpiration.trim()) {
      errors.ccExpiration = "Expiration date is required";
    }
    if (!formValues.ccCvv.trim()) {
      errors.ccCvv = "CVV is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Your form submission logic here
      setIsLoading(true); // Show loader
      dispatch(handleCheckoutDetails({ formValues }));
      sessionStorage.setItem("CheckoutDetails", JSON.stringify(formValues));
      setTimeout(() => {
        setIsLoading(false); // Hide loader
        // Navigate to the next page using React Router
        navigate("/Bill");
      }, 2000);
    }
  };
  return (
    <div style={{ padding: "2rem" }}>
      <div className="text-left">
        <h2>Checkout form</h2>
        <hr></hr>
      </div>

      <div className="row g-4">
        <div className="col-md-5 col-lg-4 order-md-last p-4 card shadow">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {itemDetails.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {itemDetails.map((ele, index) => (
              <li
                className="list-group-item d-flex justify-content-between lh-sm"
                key={index}
              >
                <div>
                  <h6 className="my-0">{ele.title}</h6>
                  <small className="text-muted">{ele.category}</small>
                </div>
                <span className="text-muted">${ele.price}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (Rupee)</span>
              <strong>${state.checkoutDetails.price}</strong>
            </li>
          </ul>
          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <button type="submit" className="btn redeem-btn">
                Redeem
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-7 col-lg-8 p-4 card shadow">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  name="firstName"
                  placeholder=""
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.firstName}</div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  name="lastName"
                  placeholder=""
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.lastName}</div>
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">{formErrors.email}</div>
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.address ? "is-invalid" : ""
                  }`}
                  id="address"
                  name="address"
                  placeholder="Plaza street"
                  value={formValues.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.address}</div>
              </div>
              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  placeholder="Apartment or suite"
                  value={formValues.address2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className={`form-select ${
                    formErrors.country ? "is-invalid" : ""
                  }`}
                  id="country"
                  name="country"
                  value={formValues.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
                <div className="invalid-feedback">{formErrors.country}</div>
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  className={`form-select ${
                    formErrors.state ? "is-invalid" : ""
                  }`}
                  id="state"
                  name="state"
                  value={formValues.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Delhi</option>
                </select>
                <div className="invalid-feedback">{formErrors.state}</div>
              </div>
              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.zip ? "is-invalid" : ""
                  }`}
                  id="zip"
                  name="zip"
                  placeholder=""
                  value={formValues.zip}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.zip}</div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="same-address"
              />
              <label className="form-check-label" for="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="save-info"
              />
              <label className="form-check-label" for="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="my-4" />
            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
              <div className="form-check">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  checked
                  required
                />
                <label className="form-check-label" for="credit">
                  Credit card
                </label>
              </div>
              <div className="form-check">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  required
                />
                <label className="form-check-label" for="debit">
                  Debit card
                </label>
              </div>
            </div>

            <div className="row gy-3">
              <div className="col-md-6">
                <label for="cc-name" className="form-label">
                  Name on card
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.ccName ? "is-invalid" : ""
                  }`}
                  id="cc-name"
                  name="ccName"
                  placeholder=""
                  value={formValues.ccName}
                  onChange={handleInputChange}
                  required
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">{formErrors.ccName}</div>
              </div>
              <div className="col-md-6">
                <label for="cc-number" className="form-label">
                  Credit card number
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.ccNumber ? "is-invalid" : ""
                  }`}
                  id="cc-number"
                  name="ccNumber"
                  placeholder=""
                  value={formValues.ccNumber}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.ccNumber}</div>
              </div>
              <div className="col-md-3">
                <label for="cc-expiration" className="form-label">
                  Expiration
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.ccExpiration ? "is-invalid" : ""
                  }`}
                  id="cc-expiration"
                  name="ccExpiration"
                  placeholder=""
                  value={formValues.ccExpiration}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  {formErrors.ccExpiration}
                </div>
              </div>

              <div className="col-md-3">
                <label for="cc-cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.ccCvv ? "is-invalid" : ""
                  }`}
                  id="cc-cvv"
                  name="ccCvv"
                  placeholder=""
                  value={formValues.ccCvv}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">{formErrors.ccCvv}</div>
              </div>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-lg checkout-btn" type="submit">
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </>
              ) : (
                "Continue to checkout"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
