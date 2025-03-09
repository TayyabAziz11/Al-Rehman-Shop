import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white font-serif">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-200 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 text-[#D4A373]">Contact Us</h1>
          <p className="text-lg text-gray-800">
            We&apos;d love to hear from you. Reach out with any questions or visit one of our stores.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-bold text-[#D4A373] mb-6">Get In Touch</h2>
          <div className="space-y-6 text-lg">
            {[
              { icon: MapPin, title: "Our Location", text: "Main Sarafa Bazar, Near Main Gate, Pind Dadan Khan, Pakistan" },
              { icon: Phone, title: "Phone", text: "+92 3490530230 \n+92 3472708509 \n+92 3415407032" },
              { icon: Mail, title: "Email", text: "info@alrehman.com" },
              { icon: Clock, title: "Business Hours", text: "Monday - Saturday: 10:00 AM - 8:00 PM\nSunday: 12:00 PM - 6:00 PM" },
            ].map(({ icon: Icon, title, text }, index) => (
              <div key={index} className="flex items-start">
                <Icon className="text-gold mt-1 mr-4" size={24} />
                <div>
                  <h3 className="font-medium text-black text-xl">{title}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-[#D4A373] mb-6">Send Us a Message</h2>
          <form className="space-y-6 text-lg">
            {[
              { id: "name", label: "Your Name", type: "text" },
              { id: "email", label: "Your Email", type: "email" },
              { id: "subject", label: "Subject", type: "text" },
            ].map(({ id, label, type }) => (
              <div key={id}>
                <label htmlFor={id} className="block font-medium mb-1">{label}</label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                  required
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-white px-6 py-3 rounded-md text-lg font-bold hover:bg-opacity-80 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
