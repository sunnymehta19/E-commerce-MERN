import React from "react";
import { Instagram, Facebook, Twitter, HousePlug } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-gray-400 ">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Contact */}
        <div className="flex flex-col gap-9">
          <div className="flex gap-2 items-center">
            <HousePlug className='h-8 w-8' />
            <span className="font-bold text-lg">UniDrobe</span>
          </div>
          <div className="">
            <h3 className="text-white font-semibold mb-4">CONTACT</h3>
            <p>+91 93xxx xxx36</p>
            <p>sunnymehta.here@gmail.com</p>
            <p>Mon – Sat | 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4">PRODUCT CATEGORIES</h3>
          <ul className="flex flex-col">
            <li className=" hover:text-white">Men’s Clothing</li>
            <li className=" hover:text-white">Women’s Clothing</li>
            <li className=" hover:text-white">Kids’ Wear</li>
            <li className=" hover:text-white">Footwear</li>
            <li className=" hover:text-white">Accessories</li>
            <li className=" hover:text-white">Best Sellers</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">COMPANY</h3>
          <ul className="flex flex-col">
            <Link to="/about" className="hover:text-white cursor-pointer">About Us</Link>
            <Link to="/contact" className=" hover:text-white cursor-pointer">Contact Us</Link>
            <Link to="/privacy-policy" className="hover:text-white cursor-pointer">Privacy Policy</Link>
            <Link to="/shipping-policy" className="hover:text-white cursor-pointer">Shipping Policy</Link>
            <Link to="/cancellatin-and-returns-policy" className="hover:text-white cursor-pointer">Cancellation & Return Policy</Link>
            <Link to="/refund-policy" className="hover:text-white cursor-pointer">Refund Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white cursor-pointer">Terms & Conditions</Link>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">100% SECURE PAYMENT</h3>

          <ul className="list-disc list-inside">
            <li>UPI (Google Pay, PhonePe, Paytm)</li>
            <li>Debit / Credit Cards</li>
            <li>Net Banking</li>
            <li>Wallets</li>
            <li>EMI & Pay Later</li>
          </ul>
          <p className="mt-2">Payments secured by Razorpay with SSL encryption.</p>
        </div>

      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} UniDrobe. All rights reserved.</p>

        <div className="flex gap-4 text-gray-400">
          <Instagram className="cursor-pointer hover:text-white" />
          <Facebook className="cursor-pointer hover:text-white" />
          <Twitter className="cursor-pointer hover:text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
