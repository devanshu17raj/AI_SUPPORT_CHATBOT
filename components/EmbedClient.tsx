"use client";

import React, { useState } from "react";
import Link from "next/link";

interface EmbedClientProps {
  ownerId?: string;
}

export default function EmbedClient({ ownerId }: EmbedClientProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const embedCode = `<script 
  src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js" 
  data-owner-id="${ownerId}"
  defer>
</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy script code: ", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      
      {/* --- DASHBOARD NAVBAR / HEADER --- */}
      <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
          <div className="text-xl font-semibold tracking-tight">
            SupportAI <span className="text-gray-400 font-normal">/ Embed Setup</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="text-sm font-medium text-gray-600 hover:text-black transition">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- MAIN MAIN WRAPPER CONTENT --- */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Embed Your Chatbot
          </h1>
          <p className="text-base text-gray-500">
            Copy the script snippet below and paste it into the <code>&lt;body&gt;</code> element workspace of your external HTML pages to go live instantly.
          </p>
        </div>

        {/* Snippet Card */}
        <div className="bg-[#1e1e2e] rounded-xl border border-[#313244] overflow-hidden shadow-lg">
          <div className="flex justify-between items-center padding px-5 py-3 bg-[#181825] border-b border-[#313244]">
            <span className="text-xs font-mono text-[#a6adc8]">HTML Snippet Container</span>
            <button
              onClick={handleCopy}
              className={`text-xs font-medium px-4 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
                copied ? "bg-emerald-600 text-white" : "bg-[#313244] text-white hover:bg-[#45475a]"
              }`}
            >
              {copied ? "✓ Snippet Copied" : "Copy Snippet"}
            </button>
          </div>
          
          <pre className="p-5 overflow-x-auto m-0">
            <code className="font-mono text-sm text-[#cdd6f4] leading-relaxed block whitespace-pre">
              {embedCode}
            </code>
          </pre>
        </div>

        {/* Simple Steps Guide */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Integration Guide:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500">
            <li>Click the copy button above to snap up the widget injection script tag snippet.</li>
            <li>Open up your core platform theme template layout index settings or native raw code workspace.</li>
            <li>Drop this layout script anywhere inside the safe bounds right before your ending HTML <code>&lt;/body&gt;</code> block structure.</li>
          </ul>
        </div>
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
}