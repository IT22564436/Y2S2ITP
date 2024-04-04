import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './style.css';

function OTPVerification() {
  const [otp, setOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
        let parent = this.parentNode;
        parent.classList.add("focus");
    }

    function blurFunc() {
        let parent = this.parentNode;
        if (this.value === "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            input.removeEventListener("focus", focusFunc);
            input.removeEventListener("blur", blurFunc);
        };
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userEmail = Cookies.get('userEmail'); // Retrieve userEmail from cookies
      const response = await axios.post(
        'http://localhost:8175/user/verify-otp',
        { otp, userEmail } // Include userEmail in the request body
      );
  
      if (response.status === 200) {
        if (response.data.status === "Success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "OTP verified successfully!",
            showConfirmButton: false,
            timer: 1500
            
          });
          navigate('/reset-password');
        } else if (response.data.status === "Incorrect OTP") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect OTP. Please try again",
          });
        } else {
          setVerificationStatus("An error occurred. Please try again later.");
        }
      } else {
        setVerificationStatus("Unexpected response status: " + response.status);
      }
    } catch (error) {
      setVerificationStatus('Error verifying OTP: ' + error.message);
    }
  };

  return (
    <div className="container">
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="form">
        {/* Contact Info Section */}
        <div className="contact-info">
          <h3 className="title">Let's get in touch</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>
          {/* Information */}
          <div className="info">
            <div className="information d-flex align-items-center">
              <i className="bi bi-geo-alt-fill fs-5 me-3"></i>
              <p className="mb-0">92 Cherry Drive Uniondale, NY 11553</p>
            </div>
            <div className="information">
              <i className="bi bi-envelope-fill fs-5 me-3"></i>
              <p className="mb-0">lorem@ipsum.com</p>
            </div>
            <div className="information">
              <i className="bi bi-telephone-fill fs-5 me-3"></i>
              <p className="mb-0">123-456-789</p>
            </div>
          </div>
          {/* Social Media Links */}
          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons d-flex justify-content-center">
              <button onClick={() => {}} className="me-3">
                <i className="bi bi-facebook fs-5"></i>
              </button>
              <button onClick={() => {}}>
                <i className="bi bi-whatsapp fs-5"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Contact Form Section */}
        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>
          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="title">Forgot Password</h3>
            <div className="input-container">
              <input type="text" name="otp" className="input" value={otp} onChange={(e) => setOTP(e.target.value)} />
              <label htmlFor="">Enter OTP</label>
              <span>Enter OTP</span>
            </div>
            <button type="submit" className="btn">Send</button>
            {verificationStatus && <p className="mt-3">{verificationStatus}</p>}

          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;