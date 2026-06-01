"use client";

import React from "react";
import Link from "next/link";

export default function LegalPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      
      {/* --- BRAND NAVBAR --- */}
      <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
          <div className="text-xl font-semibold tracking-tight">
            SupportAI <span className="text-gray-400 font-normal">/ Legal Documentation</span>
          </div>
          <Link href="/dashboard">
            <button className="text-sm font-medium text-gray-600 hover:text-black transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* --- CORE CONTENT LAYOUT --- */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Left Sticky Navigation Anchor Panel */}
        <aside className="md:w-64 flex-shrink-0 md:sticky md:top-24 h-fit space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Terms of Service</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              <li><button onClick={() => scrollToSection("tos-1")} className="hover:text-black transition text-left">1. Acceptance of Terms</button></li>
              <li><button onClick={() => scrollToSection("tos-2")} className="hover:text-black transition text-left">2. Account & Embed Usage</button></li>
              <li><button onClick={() => scrollToSection("tos-3")} className="hover:text-black transition text-left">3. AI Behavior Disclaimer</button></li>
            </ul>
          </div>
          
          <hr className="border-gray-100" />
          
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Privacy Policy</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              <li><button onClick={() => scrollToSection("priv-1")} className="hover:text-black transition text-left">1. Information We Collect</button></li>
              <li><button onClick={() => scrollToSection("priv-2")} className="hover:text-black transition text-left">2. Data Sub-Processors</button></li>
              <li><button onClick={() => scrollToSection("priv-3")} className="hover:text-black transition text-left">3. End-User Compliance</button></li>
            </ul>
          </div>
        </aside>

        {/* Right Legal Text Documentation Area */}
        <main className="flex-1 max-w-3xl space-y-16 dense-text">
          
          {/* ========================================================= */}
          {/* TERMS OF SERVICE SECTION */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
              <p className="text-xs text-gray-400 font-medium">Last Updated: June 1, 2026</p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Welcome to SupportAI. By activating, installing, or embedding our software widget script layout services onto any website domain property, you explicitly agree to fulfill and operate cleanly within the legal guidelines defined below.
            </p>

            <div id="tos-1" className="scroll-mt-24 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                SupportAI delivers an automated, context-aware chatbot platform driven by Large Language Models. These services are provided "as-is." By building an account database entry with our systems, you represent that you possess the organizational authority to commit your storefront to these guidelines.
              </p>
            </div>

            <div id="tos-2" className="scroll-mt-24 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">2. Account Security & Embed Script Usage</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Subscribers are allocated a unique workspace tracking parameter identification tag. You maintain total legal accountability over the distribution and external implementation environments of your copy-paste frontend embedding client chunk. Reverse engineering, malicious programmatic overloading, or structural framework manipulation of our global scripts is explicitly prohibited.
              </p>
            </div>

            <div id="tos-3" className="scroll-mt-24 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">3. AI Behavior & Hallucination Disclaimer</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                SupportAI processes dynamic generation intents utilizing cloud-hosted model inferences based on the raw facts provided within your custom context profile string. SupportAI accepts no commercial responsibility, statutory liability, or financial damages resulting from incorrect contextual outputs, unexpected automated recommendations, or generative factual misstatements rendered by the client runtime framework to end-consumers.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* ========================================================= */}
          {/* PRIVACY POLICY SECTION */}
          {/* ========================================================= */}
          <section className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
              <p className="text-xs text-gray-400 font-medium">Last Updated: June 1, 2026</p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              This Privacy Policy details how data parameters, conversational content transcripts, and structural business settings profiles are safely managed, isolated, and processed within our storage cloud cluster networks.
            </p>

            <div id="priv-1" className="scroll-mt-24 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">1. Information We Collect</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We handle data parameters on behalf of your business, focusing on three foundational layers:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                <li><strong>Profile Metadata:</strong> Core identifiers, structural business labels, and routing support contact details.</li>
                <li><strong>Knowledge Baselines:</strong> Custom contextual documents explicitly saved into our document cloud nodes.</li>
                <li><strong>Conversation Arrays:</strong> Live historical string logs generated through active support conversations.</li>
              </ul>
            </div>

            <div id="priv-2" className="scroll-mt-24 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">2. Third-Party Data Sub-Processors</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                To fulfill runtime analytical operations, conversation textual packages are safely transferred down securely via TLS stream connections to cloud endpoints managed by our designated artificial intelligence core model infrastructure providers (including Google Gemini API). Content is channeled purely for contextual synthesis and is protected against training reuse pipelines.
              </p>
            </div>

            <div id="priv-3" className="scroll-mt-24 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">3. Subscriber End-User Compliance Requirements</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Platform account holders dropping our script on storefront targets accept full regulatory accountability under local data acts (such as GDPR or CCPA). You must ensure your consumers are explicitly informed that automated text agents are recording chat responses, order details, and support inquiries during runtime active sessions.
              </p>
            </div>
          </section>
          
        </main>
      </div>

      {/* --- COMPACT FOOTER --- */}
      <footer className="w-full border-t border-gray-100 bg-gray-50/50 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-medium">
          <div>&copy; 2026 SupportAI Inc. Security and Legal compliance certified.</div>
          
        </div>
      </footer>

    </div>
  );
}