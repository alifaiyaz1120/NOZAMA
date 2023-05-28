import React from "react";
import { Link } from "react-router-dom";
import "../styles/ContactUsPage.css";


function ContactUsPage() {
    return (
        <div className="contact-us">
            <div className="contact-us-header">
                <h1>Contact Us</h1>
                <p>Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
            <form>
                <div className="contact-us-name">
                    <label for="name">Name</label>
                    <br />
                    <input type="contact-us-name-text" id="name" name="name" />
                </div>
                <br />
                <div className="contact-us-email">
                    <label for="email">Email</label>
                    <br />
                    <input type="contact-us-email-text" id="email" name="email" />
                </div>
                <br />
                <div className="contact-us-message">
                    <label for="message">Message</label>
                    <br />
                    <textarea id="message" name="message" rows="5" cols="40"></textarea>
                </div>
                <br />
                <div className = "contact-us-submit">
                    <Link to="/"><button className="contact-us-submit-btn">Submit</button></Link>
                </div>
            </form>
        </div>
    )
}

export default ContactUsPage;

