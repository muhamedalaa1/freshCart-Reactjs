import React from 'react'
import paypal from "../../images/footer/paypal.svg"
import americanExpress from "../../images/footer/american-express.svg"
import mastercard from "../../images/footer/mastercard.svg"
import amazonPay from "../../images/footer/amazon.svg"

export default function Footer() {
  return <footer className="fc-footer">
    <div className="container">
      <div className="fc-footer-top">
        <div><span className="section-eyebrow">FreshCart, every day</span><h2>A fresher way to fill your basket.</h2><p>Good food, thoughtful picks, and the little things that make everyday better.</p></div>
        <div className="fc-footer-app"><div className="fc-app-icon"><i className="fa-solid fa-basket-shopping" /></div><div><strong>FreshCart in your pocket</strong><span>Shop your favourites wherever you are.</span></div></div>
      </div>
      <div className="fc-footer-bottom">
        <div><strong>Payment partners</strong><div className="fc-payment-logos"><img src={amazonPay} alt="Amazon Pay" /><img src={americanExpress} alt="American Express" /><img src={mastercard} alt="Mastercard" /><img src={paypal} alt="PayPal" /></div></div>
        <div className="fc-footer-social"><span>Follow the fresh</span><a href="https://www.facebook.com/" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a><a href="https://www.instagram.com/" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a><a href="https://www.whatsapp.com/" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /></a></div>
      </div>
      <div className="fc-copyright">© {new Date().getFullYear()} FreshCart. Made for fresher everyday living.</div>
    </div>
  </footer>
}
