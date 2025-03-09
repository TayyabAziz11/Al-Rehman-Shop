"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// Define the color scheme
const colors = {
  primary: "#1E1E1E", // Deep black
  secondary: "#FFFFFF", // Bright white for contrast
  accent: "#D4A373", // Warm gold highlight
  overlay: "rgba(30, 30, 30, 0.5)", // Subtle dark overlay (not too strong)
};

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center text-center">
      {/* Background image with subtle overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(${colors.overlay}, ${colors.overlay}), url('/bg-image2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(95%)", // Keeps image bright but slightly muted
        }}
      ></div>

      {/* Text & Buttons (NO Glass Effect) */}
      <div className="relative z-10 px-6 sm:px-8 py-10">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Shop name */}
          <h1
            className="font-bold text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight"
            style={{
              color: colors.secondary,
              fontFamily: "Playfair Display, serif",
              textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            Al <span style={{ color: colors.accent }}>Rehman</span>
            <br />
            Cloth House
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 transition-all duration-1000 ease-in delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              color: colors.secondary,
              fontFamily: "Lora, serif",
              textShadow: "1px 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            Experience the finest blend of modern fashion and timeless elegance.
          </p>

          {/* Call to action buttons */}
          <div
            className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 ease-in-out delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href="/Shop"
              className="inline-flex items-center px-10 py-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              }}
            >
              Shop Collection
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a
              href="/About"
              className="inline-flex items-center px-10 py-4 border rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: "transparent",
                color: colors.secondary,
                borderColor: colors.secondary,
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                boxShadow: "0 2px 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Decorative underline */}
        <div
          className={`mx-auto w-24 h-1 rounded-full mt-8 transition-all duration-1000 ease-in-out delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ backgroundColor: colors.accent }}
        ></div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-in-out delay-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-10 h-14 border-2 rounded-full flex justify-center p-2 border-gray-300">
          <div className="w-1.5 h-4 rounded-full bg-gray-300 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
