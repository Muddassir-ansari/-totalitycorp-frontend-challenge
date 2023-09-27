import React, { useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { deleteSearch, handleSearch } from "../../redux/AppSlice";

export const Navbar = () => {
  const state = useSelector((state) => state.eCommerceApp); //useSelector hook to get the searched array
  const [searchedInput, setSearchedInput] = useState(""); //state to get the search input
  const [currentUser,setCurrentUser] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
if(sessionStorage.getItem("CurrentUser")!==null){
  setCurrentUser(sessionStorage.getItem("CurrentUser"))
}
  },[])
  // method to get the search input
  const handleSearchInput = (e) => {
    setSearchedInput(e.target.value);
  };
  // function to search the products
  const handleSearchProducts = (e) => {
    e.preventDefault();
    let startsWithAlphabet = searchedInput.toUpperCase();
    if (state.searchedArray !== undefined) {
      dispatch(deleteSearch());
      for (var i = 0; i < state.products.products.length; i++) {
        if (
          state.products.products[i].title
            .toUpperCase()
            .includes(startsWithAlphabet)
        ) {
          dispatch(handleSearch(state.products.products[i]));
          setSearchedInput("");
        }
      }
    }
  };
  // function to logout form the product page
  const handleLogout = () => {
    localStorage.removeItem("Cart");
    dispatch(deleteSearch());
    navigate("/");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-sm"
        style={{ background: "#efe4ee" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#0">
            <img
              src={logo}
              alt="..."
              style={{ height: "85px", width: "150px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span
              className="navbar-toggler-icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to open navbar"
              style={{ background: "#5c355b" }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" href="#0">
                  Contacts
                </a>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Cart"
              >
                <Link className="nav-link fs-5" to="/Cart" type="button">
                  Cart<i class="fa fa-shopping-cart"></i>
                  {JSON.parse(localStorage.getItem("Cart")) !== null
                    ? JSON.parse(localStorage.getItem("Cart")).length
                    : 0}
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                style={{ borderColor: "#5c355b" }}
                type="text"
                placeholder="Search products by name..."
                value={searchedInput}
                onChange={handleSearchInput}
              />
              {state.searchedArray.length === 0 ? (
                <button
                  className="btn text-white"
                  style={{ background: "#5c355b" }}
                  type="button"
                  onClick={handleSearchProducts}
                >
                  Search
                </button>
              ) : (
                <button
                  className="btn text-white"
                  style={{ background: "#5c355b" }}
                  type="button"
                  onClick={() => dispatch(deleteSearch())}
                >
                  <i class="fa fa-paint-brush"></i>
                </button>
              )}
              {/* Logout Button */}
              <div class="dropdown ms-2">
                <button
                  class="btn btn-secondary dropdown-toggle logout-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "#ba87b9", color: "white" }}
                >
                  <i class="fa fa-user-circle-o"></i>&nbsp;Hi!&nbsp;{currentUser}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button
                      className="btn dropdown-item"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      type="button"
                      onClick={handleLogout}
                    >
                     <i class="fa fa-sign-out"></i>{" "}Logout
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <hr></hr>
    </>
  );
};
