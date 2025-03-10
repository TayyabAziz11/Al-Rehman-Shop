import { Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const colors = {
  primary: "#1E1E1E", // Charcoal Black
  secondary: "#F5F5F5", // Light Gray
  accent: "#D4A373", // Warm Beige/Gold
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Haseeb ur Rehman",
      role: "Founder & CEO",
      image: "/haseeburrehman.jpg",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Aneeb ur Rehman",
      role: "Creative Director",
      image: "/aneeburrehman.jpg",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
  ];

  const testimonials = [
    {
      quote: "Al Rehman's attention to detail and quality fabrics have made them my go-to for both casual and formal wear.",
      author: "Saad Ahmed",
      position: "Marketing Executive",
    },
    {
      quote: "I've been shopping at Al Rehman for over a decade. Their commitment to quality has never wavered.",
      author: "Amina Khalid",
      position: "University Professor",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-200 text-gray-800">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold" style={{ fontFamily: "Playfair Display, serif", color: colors.accent }}>
            About Us
          </h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto text-gray-800 font-semibold">
            Founded in 2015, Al Rehman Cloth House began as a small family-owned shop in Pind Dadan Khan. We are dedicated to crafting high-quality, ethically-produced clothing that merges tradition with modern elegance.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold" style={{ color: colors.primary, fontFamily: "Playfair Display, serif" }}>
            Our <span style={{ color: colors.accent }}>Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={1600}
                  height={1600}
                  className="w-46 h-65 object-cover rounded-full mx-auto"
                />
                <h3 className="text-2xl font-semibold mt-4" style={{ color: colors.primary }}>{member.name}</h3>
                <p className="text-lg mt-1" style={{ color: colors.accent }}>{member.role}</p>
                <div className="flex justify-center mt-3 space-x-4">
                  <a href={member.social.linkedin} className="text-gray-500 hover:text-accent"><Linkedin size={20} /></a>
                  <a href={member.social.twitter} className="text-gray-500 hover:text-accent"><Twitter size={20} /></a>
                  <a href={member.social.instagram} className="text-gray-500 hover:text-accent"><Instagram size={20} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold" style={{ color: colors.primary, fontFamily: "Playfair Display, serif" }}>
            Customer <span style={{ color: colors.accent }}>Reviews</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg italic" style={{ color: colors.primary }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <h4 className="text-lg font-semibold mt-4" style={{ color: colors.primary }}>{testimonial.author}</h4>
                <p className="text-sm" style={{ color: colors.accent }}>{testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-[#D4A373]">
        <h2 className="text-3xl font-bold" style={{ color: colors.primary }}>Visit Our Store</h2>
        <p className="text-lg mt-3" style={{ color: colors.primary }}>
          Discover our latest collections and experience our commitment to quality firsthand.
        </p>
        <a href="/Shop" className="mt-6 inline-block px-6 py-3 bg-white text-lg font-medium rounded-lg shadow-md transition hover:bg-gray-100" style={{ color: colors.primary }}>
          Shop Now
        </a>
      </section>
    </div>
  );
}
