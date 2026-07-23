"use client";

import { Mail } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: [
    "Documentation",
    "Help Center",
    "Privacy Policy",
    "Terms of Service",
  ],
};

const socialIcons = [
  { icon: FaFacebook, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaLinkedin, href: "#" },
  { icon: FaYoutube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-purple-400">SMS</span>Hub
            </h3>

            <p className="text-sm mb-6 max-w-md">
              A modern student management platform designed to connect,
              engage, and empower students, educators, and administrators.
            </p>

            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>

              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-semibold mb-4">
              Newsletter
            </h4>

            <p className="text-sm mb-3">
              Get the latest updates and news.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button className="rounded-r-lg bg-purple-600 px-4 py-2 hover:bg-purple-700 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} SMS Hub. All rights reserved.
          </p>

          <div className="mt-4 flex gap-6 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy
            </a>

            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms
            </a>

            <a href="#" className="hover:text-gray-300 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}