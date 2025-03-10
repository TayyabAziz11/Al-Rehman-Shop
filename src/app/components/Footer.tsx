"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ChevronUp,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f2f0f0] text-gray-800 font-['Roboto', sans-serif]">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#D4A373]">
              Al <span className="text-[#D4A373]">Rehman</span>
            </h2>
            <p className="text-gray-600">
              Your premier destination for modern fashion and timeless style since 2016.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-[#c70039] transition"><Facebook size={22} /></a>
              <a href="#" className="hover:text-[#c70039] transition"><Instagram size={22} /></a>
              <a href="#" className="hover:text-[#c70039] transition"><Twitter size={22} /></a>
              <a href="#" className="hover:text-[#c70039] transition"><Youtube size={22} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#D4A373]">Quick Links</h3>
            <ul className="space-y-2 text-lg">
              <li><Link href="/" className="text-gray-600 hover:text-[#D4A373]">Home</Link></li>
              <li><Link href="/Shop" className="text-gray-600 hover:text-[#D4A373]">Shop</Link></li>
              <li><Link href="/About" className="text-gray-600 hover:text-[#D4A373]">About Us</Link></li>
              <li><Link href="/Contact" className="text-gray-600 hover:text-[#D4A373]">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#D4A373]">Contact Us</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-[#D4A373]" />
                <span className="text-gray-600">Main Sarafa Bazar, Near Main Gate, Pind Dadan Khan, Pakistan</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-[#D4A373]" />
                <a href="tel:+923001234567" className="text-gray-600 hover:text-[#D4A373]">
                +92 3490530230  <br />
                +92 3472708509  <br />
                +92 3415407032
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-[#D4A373]" />
                <a href="mailto:info@alrehman.com" className="text-gray-600 hover:text-[#D4A373]">
                   Rajaaneeburrehman42@gmail.com
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <h4 className="text-lg font-medium text-[#D4A373] mb-2">Business Hours</h4>
              <p className="text-gray-600">Monday - Sunday : 09:00 AM - 8:00 PM</p>
              <p className="text-gray-600">Friday : 09:00 PM - 1:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-lg mb-4 md:mb-0">
            © {new Date().getFullYear()} Al Rehman Cloth House. All rights reserved.
          </div>
          <div className="text-gray-600 text-lg">Made by <span className="text-[#D4A373] font-semibold">Tayyab Aziz</span></div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-[#ff5733] text-white rounded-full shadow-lg hover:bg-[#c70039] transition"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
}
