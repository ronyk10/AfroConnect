import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-list">
          <li>
            <a href="#" className="footer-link">
              Terms of uses
            </a>
          </li>

          <li>
            <a href="#" className="footer-link">
              Privacy & Policy
            </a>
          </li>
        </ul>

        <p className="copyright">
          Copyright 2024{" "}
          <a href="#" className="copyright-link">
            AfroConnect
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export { Footer };
