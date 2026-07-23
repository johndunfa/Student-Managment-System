"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Calendar, Briefcase } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Users", value: "5,000+" },
  { icon: BookOpen, label: "Courses", value: "200+" },
  { icon: Calendar, label: "Events", value: "50+" },
  { icon: Briefcase, label: "Internships", value: "100+" },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
              SMS Hub?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600"
          >
            A complete ecosystem designed to enhance the student experience from
            enrollment to graduation and beyond.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Everything You Need in One Place
            </h3>
            <p className="text-gray-600 mb-6">
              SMS Hub bridges the gap between students, educators, and
              administrators. Our platform simplifies academic management while
              fostering a vibrant community for collaboration and growth.
            </p>
            <ul className="space-y-3">
              {[
                "Real-time attendance tracking",
                "Comprehensive grade management",
                "Community & event discovery",
                "Career opportunity board",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className="w-8 h-8 text-purple-700 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}