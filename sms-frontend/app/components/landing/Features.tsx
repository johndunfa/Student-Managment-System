"use client";

import { motion } from "framer-motion";
import {
  Users,
  CalendarCheck,
  GraduationCap,
  BarChart,
  MessageSquare,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community Discovery",
    description:
      "Find and join student communities, interest groups, and campus organizations.",
  },
  {
    icon: CalendarCheck,
    title: "Event Management",
    description:
      "Discover, register for, and manage campus events and meetups.",
  },
  {
    icon: GraduationCap,
    title: "Academic Hub",
    description:
      "Track attendance, view grades, and monitor your academic progress.",
  },
  {
    icon: BarChart,
    title: "Analytics & Insights",
    description:
      "Get detailed insights into your academic performance and engagement.",
  },
  {
    icon: MessageSquare,
    title: "Collaboration Tools",
    description:
      "Connect with peers, share resources, and collaborate on projects.",
  },
  {
    icon: Award,
    title: "Career Opportunities",
    description:
      "Explore internships, job postings, and networking opportunities.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
              Modern Education
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600"
          >
            Everything you need to manage, engage, and succeed in your academic
            journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <feature.icon className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}