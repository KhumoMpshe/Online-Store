import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
        <div className="footer-top">
            <div className="footer-column">
                <h3>SHOP</h3>
                <a href="/shop/home">Home</a>
                <a href="/shop/accessories">Accessories</a>
                <a href="/shop/hoodies">Hoodies</a>
                <a href="/shop/t-shirts">T-Shirts</a>
                <a href="/shop/sneakers">Sneakers</a>
                <a href="/cart">Cart</a>
            </div>

            <div className="footer-column">
                <h3>COMPANY INFO</h3>
                <a href="/about">About Us</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms and Conditions</a>
                <a href="/store-locator">Store Locator</a>
                <a href="/careers">Careers</a>
            </div>

            <div className="footer-column">
                <h3>NEED SOME HELP?</h3>
                <a href="/whatsapp">WhatsApp</a>
                <a href="/contact">Contact Us</a>
                <a href="/faq">FAQ's</a>
                <a href="/delivery">How to Get Free Delivery</a>
                <a href="/returns">Deliveries and Returns</a>
                <a href="/fit">Find Your Fit</a>
                <a href="/safety">Is It Safe To Shop Online</a>
            </div>

            <div className="footer-column footer-subscribe">
                <h3>SIGN UP FOR THE LATEST FASHION AND OFFERS!</h3>
                <div className="subscribe-form">
                    <input type="email" placeholder="Email address" />
                    <button type="button">SUBSCRIBE</button>
                </div>
                <div className="social-links">
                    <a href="https://facebook.com" aria-label="Facebook"><i class="bi bi-facebook m-2"></i></a>
                    <a href="https://instagram.com" aria-label="Instagram"><i class="bi bi-instagram m-2"></i></a>
                    <a href="https://youtube.com" aria-label="YouTube"><i class="bi bi-youtube m-2"></i></a>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Urban Threads. All rights reserved.</span>
            <div className="footer-links">
                <a href="/shop">Shop</a>
                <a href="/privacy">Privacy</a>  
                <a href="/terms">Terms</a>
            </div>
        </div>
    </footer>
  );
}
