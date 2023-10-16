import React from 'react'
import './style.scss'

export const Footer = () => {
  return (
    <>
      <div className="content"></div>
      <div className="footer">
        <div className="footer-group">
          <a className="footer-group-link" href="#">
            About Us
          </a>
          <a className="footer-group-link" href="#">
            Career
          </a>
          <a className="footer-group-link" href="#">
            Privacy Policy
          </a>
          <a className="footer-group-link" href="#">
            Partners
          </a>
        </div>
        <div className="footer-group">
          <a
            className="social__link phone"
            href="tel:88000999999"
            target="_blank"
          >
            8 (800) 999 99 99
          </a>
          <a
            className="social__link email"
            href="mailto:info@sneaker.com"
            target="_blank"
          >
            info@sneaker.com
          </a>
          <a
            className="social__link vk"
            href="https://vk.com/sneaker"
            target="_blank"
            title="Перейти в ВК"
          ></a>
          <a
            className="social__link tg"
            href="https://t.me/sneaker"
            target="_blank"
            title="Перейти в Телеграм"
          ></a>
        </div>
      </div>
    </>
  );
}
