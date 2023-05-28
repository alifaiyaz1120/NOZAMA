import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
    return (
      <footer className='footer bg-bisque'>
        <div className = "container py-4 text-center">
          <div className='flex align-center justify-center text-black fw-3 fs-16'>
            <a href = "/privacy">Privacy Policy</a>
            <div className='vert-line'></div>
            <a href = "/terms">Terms of Use</a>
            <div className='vert-line'></div>
            <a href = "/contact">Contact Us</a>
          </div>
          <span className='text-black copyright-text text-manrope fs-16 fw-3'>&copy; 2022 Nozama. All Rights Reserved.</span>
        </div>
      </footer>
    )
  }
  
  export default Footer