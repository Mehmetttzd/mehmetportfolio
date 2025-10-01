"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        form.reset();
      } else {
        setStatus("❌ Something went wrong.");
      }
    } catch (err) {
      setStatus("❌ Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-gray-900 mb-12 tracking-tight"
      >
        Contact <span className="text-emerald-600">Me</span>
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-3">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">
            I’m open to opportunities, collaborations, and discussions. You can
            reach me directly via:
          </p>

          <div className="space-y-5">
            <a
              href="tel:+15149928144"
              className="flex items-center gap-3 text-gray-800 hover:text-emerald-500 transition"
            >
              <Phone /> <span className="text-lg">+1 (514) 992-8144</span>
            </a>
            <a
              href="mailto:mehmet.z.d80@gmail.com"
              className="flex items-center gap-3 text-gray-800 hover:text-emerald-500 transition"
            >
              <Mail /> <span className="text-lg">mehmet.z.d80@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/mehmetttzd"
              target="_blank"
              className="flex items-center gap-3 text-gray-800 hover:text-emerald-500 transition"
            >
              <Linkedin />{" "}
              <span className="text-lg">linkedin.com/in/mehmetttzd</span>
            </a>
            <a
              href="https://github.com/Mehmetttzd"
              target="_blank"
              className="flex items-center gap-3 text-gray-800 hover:text-emerald-500 transition"
            >
              <Github /> <span className="text-lg">github.com/Mehmetttzd</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-6">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border rounded-lg p-3 mt-1 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border rounded-lg p-3 mt-1 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full border rounded-lg p-3 mt-1 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center font-medium text-gray-700">
              {status}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
