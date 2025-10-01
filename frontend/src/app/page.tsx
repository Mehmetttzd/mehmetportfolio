"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBrain, FaServer, FaCloud, FaUsers } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
          <div className="inline-block rounded-full p-1 bg-gradient-to-r from-emerald-500 to-teal-400">
            <Image
              src="/profile.jpg"
              alt="Mehmet Yazdkhasti"
              width={140}
              height={140}
              className="rounded-full shadow-lg"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold">
            Mehmet Yazdkhasti
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Software Developer • AI &amp; ML Engineer
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4">
            <Link
              href="/projects"
              className="inline-flex justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white text-lg font-semibold shadow hover:bg-emerald-700 transition"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center px-6 py-3 rounded-lg border-2 border-emerald-400 text-emerald-400 text-lg font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT CARDS */}
      <section className="mx-auto max-w-6xl px-6 md:px-12 py-16 grid sm:grid-cols-2 lg:grid-cols-2 gap-10">
        {[
          {
            title: "AI & Machine Learning",
            text: "Experienced with LLMs, embeddings, RAG pipelines, and evaluation loops to build intelligent and production-ready systems.",
            icon: <FaBrain className="text-4xl text-emerald-600" />,
          },
          {
            title: "Backend Engineering",
            text: "Strong background in Python (FastAPI), Node.js, REST APIs, GraphQL, and testing frameworks for reliable services.",
            icon: <FaServer className="text-4xl text-emerald-600" />,
          },
          {
            title: "Cloud & DevOps",
            text: "Hands-on with AWS, Docker, Kubernetes, and CI/CD. Skilled in deploying cost-efficient and scalable applications.",
            icon: <FaCloud className="text-4xl text-emerald-600" />,
          },
          {
            title: "Collaboration & Impact",
            text: "Proven ability to lead projects, mentor peers, and deliver solutions that combine technical strength with business value.",
            icon: <FaUsers className="text-4xl text-emerald-600" />,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900">
              {card.title}
            </h3>
            <p className="mt-2 text-gray-700">{card.text}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
