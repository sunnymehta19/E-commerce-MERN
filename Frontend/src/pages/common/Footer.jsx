import React from "react";


import { Instagram, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p>+91 98765 43210</p>
          <p>support@ecommerce.com</p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Footwear</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">
            Be the first to hear about our latest offers
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Your email address"
              className="bg-transparent border-gray-600"
            />
            <Button variant="secondary">→</Button>
          </div>
        </div>

      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Ecommerce. All rights reserved.</p>

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
