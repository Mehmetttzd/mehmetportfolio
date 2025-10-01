"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  FolderKanban,
  Briefcase,
  Code2,
  Mail,
  Github,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Skills", href: "/skills", icon: Code2 },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false);
      else setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-screen flex flex-col justify-between shadow-xl z-50
        ${darkMode ? "bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100" : "bg-white text-gray-900 border-r"}
      `}
    >
      {/* Top Section */}
      <div className="p-4">
        {/* Profile (only visible when open) */}
        {isOpen && (
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full shadow-md mb-2"
            />
            <p className="font-bold text-lg">Mehmet Yazdkhasti</p>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              AI & ML Engineer
            </p>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`mb-6 flex items-center justify-center w-full p-2 rounded-lg transition
            ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}
          `}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>

        {/* Nav Links with Tooltips */}
        <nav className="space-y-2 relative">
          {navItems.map(({ name, href, icon: Icon }) => (
            <div key={name} className="relative group">
              <Link
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-md font-medium transition
                  ${darkMode
                    ? "hover:bg-emerald-600 hover:text-white"
                    : "hover:bg-emerald-100 hover:text-emerald-700"}
                `}
              >
                <Icon size={22} className="group-hover:scale-110 transition" />
                {isOpen && <span>{name}</span>}
              </Link>

              {/* Tooltip (visible only when sidebar collapsed) */}
              {!isOpen && (
                <span
                  className={`absolute left-14 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg z-50
                    ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}
                  `}
                >
                  {name}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 flex flex-col items-center space-y-4">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg transition 
            ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}
          `}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Socials */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/Mehmetttzd"
            target="_blank"
            className={`transition ${
              darkMode ? "hover:text-emerald-400" : "hover:text-emerald-600"
            }`}
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/mehmetttzd"
            target="_blank"
            className={`transition ${
              darkMode ? "hover:text-emerald-400" : "hover:text-emerald-600"
            }`}
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </motion.aside>
  );
}
