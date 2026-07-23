"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Users,
  BookOpen,
  Calendar,
  Briefcase,
  Star,
  Mail,
  BarChart3,
} from "lucide-react";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-purple-700">
              <span className="text-gray-800">SMS</span>Hub
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-700">Features</a>
              <a href="#about" className="text-gray-600 hover:text-purple-700">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-700">Testimonials</a>
              <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800">
                Get Started
              </button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-purple-700">Features</a>
                <a href="#about" className="text-gray-600 hover:text-purple-700">About</a>
                <a href="#testimonials" className="text-gray-600 hover:text-purple-700">Testimonials</a>
                <button className="bg-purple-700 text-white px-6 py-2 rounded-full">Get Started</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                🎓 Student Management Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Streamline Your{" "}
                <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                  Academic Journey
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                A centralized hub for students, teachers, and admins to manage attendance, 
                grades, courses, and community engagement seamlessly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 shadow-lg flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 fill-gray-700" /> Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <span>✅ 5,000+ students</span>
                <span>✅ 100+ communities</span>
                <span>✅ 50+ events</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-12 text-center">
              <div className="text-8xl mb-4">👨‍🎓</div>
              <h3 className="text-2xl font-bold text-gray-800">CampusConnect</h3>
              <p className="text-gray-600">Build your academic network</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">SMS Hub?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A complete ecosystem designed to enhance the student experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Everything You Need in One Place</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">✅ Real-time attendance tracking</li>
                <li className="flex items-center gap-3 text-gray-700">✅ Comprehensive grade management</li>
                <li className="flex items-center gap-3 text-gray-700">✅ Community & event discovery</li>
                <li className="flex items-center gap-3 text-gray-700">✅ Career opportunity board</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Active Users", value: "5,000+" },
                { icon: BookOpen, label: "Courses", value: "200+" },
                { icon: Calendar, label: "Events", value: "50+" },
                { icon: Briefcase, label: "Internships", value: "100+" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <stat.icon className="w-8 h-8 text-purple-700 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Powerful Features for <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">Modern Education</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Community Discovery", desc: "Find and join student communities." },
              { icon: Calendar, title: "Event Management", desc: "Discover and manage campus events." },
              { icon: BookOpen, title: "Academic Hub", desc: "Track attendance, view grades." },
              { icon: BarChart3, title: "Analytics & Insights", desc: "Get insights into performance." },
              { icon: Mail, title: "Collaboration Tools", desc: "Connect with peers and share resources." },
              { icon: Briefcase, title: "Career Opportunities", desc: "Explore internships and jobs." },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-4xl md:text-5xl font-bold">5,000+</p><p className="text-purple-200 mt-2">Students</p></div>
            <div><p className="text-4xl md:text-5xl font-bold">100+</p><p className="text-purple-200 mt-2">Communities</p></div>
            <div><p className="text-4xl md:text-5xl font-bold">50+</p><p className="text-purple-200 mt-2">Events</p></div>
            <div><p className="text-4xl md:text-5xl font-bold">30+</p><p className="text-purple-200 mt-2">Countries</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Johnson", role: "CS Student", content: "SMS Hub transformed how I manage my studies.", avatar: "👩‍💻" },
              { name: "Prof. David Chen", role: "Instructor", content: "An exceptional platform for course management.", avatar: "👨‍🏫" },
              { name: "Emily Rodriguez", role: "Organizer", content: "The best way to discover events and connect.", avatar: "👩‍🎓" },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{t.avatar}</div>
                  <div><p className="font-semibold text-gray-900">{t.name}</p><p className="text-sm text-gray-600">{t.role}</p></div>
                </div>
                <div className="flex text-yellow-400 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}</div>
                <p className="text-gray-700">{t.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Transform Your Academic Journey?</h2>
          <p className="mt-4 text-lg text-purple-200">Join thousands of students already using SMS Hub.</p>
          <button className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-gray-100 shadow-lg flex items-center gap-2 mx-auto">
            Get Started for Free <ArrowRight className="w-5 h-5" />
          </button>
          <p className="mt-4 text-sm text-purple-300">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4"><span className="text-purple-400">SMS</span>Hub</h3>
              <p className="text-sm">A modern student management platform.</p>
              <div className="flex space-x-4 mt-4">
                <FaFacebook className="w-5 h-5 hover:text-white cursor-pointer" />
                <FaTwitter className="w-5 h-5 hover:text-white cursor-pointer" />
                <FaInstagram className="w-5 h-5 hover:text-white cursor-pointer" />
                <FaLinkedin className="w-5 h-5 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div><h4 className="text-white font-semibold mb-4">Product</h4><ul className="space-y-2 text-sm"><li>Features</li><li>Pricing</li><li>Integrations</li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">Company</h4><ul className="space-y-2 text-sm"><li>About</li><li>Blog</li><li>Careers</li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">Newsletter</h4><div className="flex"><input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full" /><button className="bg-purple-600 px-4 py-2 rounded-r-lg"><Mail className="w-5 h-5" /></button></div></div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} SMS Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}