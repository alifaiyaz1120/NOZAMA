import React from "react";
import "../styles/CheckoutPage.css";

function CheckoutPage() {
  let subtotal = 0;
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price;
  }
  function checkInfo() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const postalCode = document.getElementById("postalCode").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const cardName = document.getElementById("cardName").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    //default all fields to black
    document.getElementById("name").style.borderColor = "black";
    document.getElementById("email").style.borderColor = "black";
    document.getElementById("address").style.borderColor = "black";
    document.getElementById("city").style.borderColor = "black";
    document.getElementById("postalCode").style.borderColor = "black";
    document.getElementById("cardNumber").style.borderColor = "black";
    document.getElementById("cardName").style.borderColor = "black";
    document.getElementById("expiryDate").style.borderColor = "black";
    document.getElementById("cvv").style.borderColor = "black";
    if (
      name === "" ||
      email === "" ||
      address === "" ||
      city === "" ||
      postalCode === "" ||
      cardNumber === "" ||
      cardName === "" ||
      expiryDate === "" ||
      cvv === ""
    ) {
      alert("Please fill in all fields");
    } else if (!name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
      alert("Please enter valid information");
      document.getElementById("name").style.borderColor = "red";
    } else if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
      alert("Please enter valid information");
      document.getElementById("email").style.borderColor = "red";
    }
    // else if (!address.match(/^[a-zA-Z0-9]+$/)) {
    //   alert("Please enter valid information");
    //   document.getElementById("address").style.borderColor = "red";
    //}
    else if (!city.match(/^[a-zA-Z]+$/)) {
      alert("Please enter valid information");
      document.getElementById("city").style.borderColor = "red";
    } else if (!postalCode.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
      alert("Please enter valid information");
      document.getElementById("postalCode").style.borderColor = "red";
    } else if (!cardNumber.match(/^[0-9]{16}$/)) {
      alert("Please enter valid information");
      document.getElementById("cardNumber").style.borderColor = "red";
    } else if (!cardName.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
      alert("Please enter valid information");
      document.getElementById("cardName").style.borderColor = "red";
    } else if (!expiryDate.match(/^[0-9]{2}\/[0-9]{2}$/)) {
      alert("Please enter valid information");
      document.getElementById("expiryDate").style.borderColor = "red";
    } else if (!cvv.match(/^[0-9]{3}$/)) {
      alert("Please enter valid information");
      document.getElementById("cvv").style.borderColor = "red";
    } else {
      alert("Thank you for your purchase!");
      localStorage.removeItem("cart");
      window.location.href = "/";
    }
  }
  return (
    <div className="checkout-page">
      <div className="address-payment-wrapper">
        <h1 className="checkout-page-title">CheckOut</h1>
        <div className="Address">
          <h1 class="address-title">Shipping Address</h1>
          <form className="address-form">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" />
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="Enter address" />
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Enter city" />
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" placeholder="Enter postal code" />
          </form>
        </div>
        <div className="Payment">
          <h1 className="payment-title">Payment Method</h1>
          <form className="payment-form">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" placeholder="Enter card number" />
            <label htmlFor="cardName">Name on Card</label>
            <input type="text" id="cardName" placeholder="Enter name on card" />
            <label htmlFor="expiryDate">Expiration Date</label>
            <input
              type="text"
              id="expiryDate"
              placeholder="Enter expiration date"
            />
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="Enter CVV" />
          </form>
        </div>
      </div>
      <div className="sidebar-wrapper">
        <div className="subtotal">
          <p className="subtotal-title">Order Total: ${subtotal}.00</p>
        </div>
        <input type="button" className="submit-btn" onClick={checkInfo} value="Submit"/>
      </div>
    </div>
  );
}

export default CheckoutPage;
