"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

interface DashboardClientProps {
  ownerId: string;
}

const DashboardClient = ({ ownerId }: DashboardClientProps) => {
  // Form State
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");

  // UI State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Fetch existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ownerId }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data) {
            setBusinessName(data.businessName || "");
            setSupportEmail(data.supportEmail || "");
            setKnowledge(data.knowledge || "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (ownerId) {
      fetchSettings();
    }
  }, [ownerId]);

  // Handle Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId,
          businessName,
          supportEmail,
          knowledge,
        }),
      });

      if (res.ok) {
        setMessage({ text: "Settings saved successfully!", type: "success" });
      } else {
        setMessage({ text: "Failed to save settings.", type: "error" });
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage({ text: "An error occurred while saving.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading State with minimal styling
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* --- DASHBOARD NAVBAR --- */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full border-b border-gray-50">
        <div className="text-xl font-semibold tracking-tight">
          SupportAI <span className="text-gray-400 font-normal">/ Dashboard</span>
        </div>
        {/* Button Container */}
        {/* Button Container */}
        <div className="flex items-center gap-4">
          
          <Link href="/embed">
            <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
              Embed Chatbot
            </button>
          </Link>
          
          <Link href="/">
            <button className="bg-white text-gray-900 border border-gray-200 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      </header>        


        

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-3xl mx-auto px-8 py-16 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Bot Configuration
          </h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            Train your AI by providing your business details and knowledge base. 
            The more detailed the knowledge, the better it answers.
          </p>

          <form onSubmit={handleSave} className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 sm:p-10">
            
            {/* Status Message */}
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-8 p-4 rounded-xl text-sm font-medium border ${
                message.type === "success" 
                  ? "bg-green-50 text-green-800 border-green-200" 
                  : "bg-red-50 text-red-800 border-red-200"
              }`}>
                {message.text}
              </motion.div>
            )}

            <div className="space-y-8">
              
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                  placeholder="e.g. Acme Corporation"
                />
              </div>

              {/* Support Email */}
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                  placeholder="support@acmecorp.com"
                />
              </div>

              {/* Knowledge Base */}
              <div>
                <label htmlFor="knowledge" className="block text-sm font-semibold text-gray-900 mb-2">
                  AI Knowledge Base
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Paste FAQs, return policies, operating hours, and general business info here.
                </p>
                <textarea
                  id="knowledge"
                  rows={8}
                  value={knowledge}
                  onChange={(e) => setKnowledge(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400 resize-y"
                  placeholder="Return policy: 30 days. Operating hours: Monday-Friday 9AM - 5PM..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md disabled:opacity-60 disabled:hover:bg-black w-full sm:w-auto flex justify-center items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
            
          </form>
        </motion.div>
      </main>

      
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
};

export default DashboardClient;