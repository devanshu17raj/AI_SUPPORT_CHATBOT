"use client";

import React from 'react';
import { useState } from "react";
import Link from 'next/link';
import { motion } from 'framer-motion'; 
import { DANGEROUSLY_runPendingImmediatesAfterCurrentTask } from 'next/dist/server/node-environment-extensions/fast-set-immediate.external';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Made email optional (email?: string) to prevent TypeScript errors when logged out
function HomeClient({ email }: { email?: string }) {
  const router = useRouter();
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const firstletter = email ? email[0].toUpperCase() : "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const handleLogout=async()=>{ 
  //    window.location.href = "/api/auth/logout";   
  //}
  // 3. NEW LOGOUT FUNCTION
  const handleLogout = async () => {
    window.location.href = "/api/auth/logout";
  }    

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* --- NAVBAR --- */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="text-xl font-semibold tracking-tight">
          SupportAI
        </div>
        
        {/* Profile Dropdown / Login Button Section */}
        {email ? (
          <div className="relative">
            {/* Circular Profile Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
            >
              {firstletter}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 flex flex-col z-50">
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
                  onClick={() => setIsMenuOpen(false)} // Closes menu when clicked
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login Button shown if guest */
          <button 
            onClick={handleLogin} 
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
        
        {/* Left Side: Text and Buttons (ANIMATED) */}
        <motion.div 
          className="flex-1 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}       // Starts invisible and slightly lower
          animate={{ opacity: 1, y: 0 }}        // Moves to visible and original position
          transition={{ duration: 0.6 }}        // Takes 0.6 seconds
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-6">
            AI Customer Support <br />
            Built for Modern <br />
            Websites
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
            Add a powerful AI chatbot to your website in minutes. Let your 
            customers get instant answers using your own business knowledge.
          </p>
          
          <div className="flex items-center gap-4">
            {email ?(
              <Link href="/dashboard">
                <button className="bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md">
                  Get Started
                </button>
              </Link>

            ) :(

              <button 
                onClick={handleLogin}
                className="bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md"
              >
                Get Started
              </button>

            )}
            

            {/*<Link href="/dashboard">
              <button className="bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md">
                Get Started
              </button>
            </Link>*/}
            <Link href="#feature">
              <button className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Chat Widget Graphic (ANIMATED) */}
        <motion.div 
          className="flex-1 relative w-full flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}   // Starts invisible and slightly smaller
          animate={{ opacity: 1, scale: 1 }}     // Pops into full size
          transition={{ duration: 0.6, delay: 0.2 }} // Waits 0.2s before starting so it flows nicely!
        >
          <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-6 w-full max-w-md relative z-10">
            <p className="text-xs text-gray-400 font-medium mb-6">Live Chat Preview</p>
            
            {/* User Message */}
            <div className="flex justify-start mb-4">
              <div className="bg-gray-50 border border-gray-100 text-gray-800 px-5 py-3 rounded-2xl rounded-bl-sm text-sm font-medium shadow-sm">
                Do you offer cash on delivery?
              </div>
            </div>

            {/* AI Reply */}
            <div className="flex justify-end relative">
              <div className="bg-black text-white px-5 py-3 rounded-2xl rounded-br-sm text-sm shadow-md">
                Yes, Cash on Delivery is available.
              </div>
              
              
          
              {/* Overlapping Black Circle Widget (ANIMATED FLOATING EFFECT) */}
              <motion.div 
                className="absolute -bottom-8 -right-8 w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-xl border-4 border-white cursor-pointer z-20"
                animate={{ 
                  y: [0, -6, 0], // Moves smoothly up 6 pixels and back down
                }} 
                transition={{
                  duration: 1,        // Takes 2.5 seconds per cycle (gentle & slow)
                  repeat: Infinity,     // Loops forever
                  ease: "easeInOut"     // Perfectly smooth deceleration at peaks
                }}
                whileHover={{ scale: 1.1 }} // Pops out beautifully when hovered
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </motion.div>
            </div> 
          </div>   
          
          {/* Subtle background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-50 to-white -z-10 rounded-full blur-3xl opacity-50"></div>
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="feature" className="bg-white py-24 border-t border-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-16">
            Why Businesses Choose SupportAI
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Plug & Play</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Embed the widget on any website using a simple script tag. No complex coding required to get started.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Controlled</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Train the AI exactly on your business documents and FAQs so it responds perfectly every time.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Online</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Provide 24/7 instant customer support. Never miss a lead or leave a customer waiting again.</p>
            </div>
          </div>
        </div>
      </section>
      {/* --- STICKY FOOTER --- */}
      <footer className="w-full border-t border-gray-100 bg-gray-50/50 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
          <div>
            &copy; {new Date().getFullYear()} SupportAI Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/footer" className="hover:text-gray-600 transition">Terms of Service and Privacy Policy</a>
            
          </div>
        </div>
      </footer>

    </div>
  );
}

export default HomeClient;