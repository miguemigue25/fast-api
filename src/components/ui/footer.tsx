import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">FAQ</h3>
          <ul className="list-none">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                How to get started?
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Is there a free trial?
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                What are the payment options?
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
