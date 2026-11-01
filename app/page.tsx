"use client";

import { useState } from "react";
import Link from "next/link";
import PremiumCalculator from "./Components/PremiumCalculator";
import ClaimForm from "./Components/ClaimForm";

const plans = [
  { name: "Basic Care", cover: "₹3 Lakh", coverValue: 3, premium: "₹4,500/yr", perks: ["Hospitalization", "Day-care procedures", "Cashless at 3000+ hospitals"], popular: false },
  { name: "Family Shield", cover: "₹10 Lakh", coverValue: 10, premium: "₹12,000/yr", perks: ["Family floater", "Maternity cover", "No-claim bonus"], popular: true },
  { name: "Premium Plus", cover: "₹25 Lakh", coverValue: 25, premium: "₹22,000/yr", perks: ["Zero co-pay", "International cover", "Annual health checkup"], popular: false },
];

const features = [
  { icon: "🏥", title: "Cashless Hospitals", text: "3000+ network hospitals" },
  { icon: "⚡", title: "Quick Claims", text: "Simple online claim process" },
  { icon: "🛡️", title: "Family Cover", text: "One plan for everyone" },
  { icon: "💬", title: "24x7 Support", text: "Help whenever you need it" },
];

export default function Home() {
    const [cover, setCover] = useState(5);
  return (
    <main className="min-h-screen bg-white bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:24px_24px] text-slate-900">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-700 text-white py-20 px-6 text-center">
                <Link
          href="/Login"
          className="absolute top-6 right-6 z-10 bg-white/15 hover:bg-white/25 text-white font-medium rounded-full px-5 py-2 backdrop-blur"
        >
          Login / Sign Up
        </Link>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-5xl font-extrabold tracking-tight">HealthShield</h1>
          <p className="mt-4 text-lg text-blue-100">
            Comprehensive health coverage for you and your family
          </p>
          <a
            href="#plans"
            className="inline-block mt-8 bg-white text-blue-700 font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-blue-50"
          >
            Explore Plans
          </a>
        </div>
      </header>

      {/* Features strip */}
      <section className="max-w-5xl mx-auto -mt-10 px-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map((f) => (
            <div key={f.title}>
              <div className="text-3xl">{f.icon}</div>
              <p className="mt-2 font-semibold text-sm">{f.title}</p>
              <p className="text-xs text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="max-w-5xl mx-auto pt-16 pb-12 px-6">
        <h2 className="text-3xl font-bold text-center">Choose Your Plan</h2>
        <p className="text-center text-slate-500 mt-2">Simple, transparent plans for every need</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative bg-white rounded-2xl p-6 flex flex-col transition hover:-translate-y-1 hover:shadow-xl ${
                p.popular ? "border-2 border-blue-600 shadow-xl" : "border border-slate-200 shadow"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-3xl font-bold text-blue-700 mt-2">{p.cover}</p>
              <p className="text-sm text-slate-500">Premium: {p.premium}</p>
              <ul className="mt-4 space-y-2 text-sm flex-1">
                {p.perks.map((perk) => (
                  <li key={perk}>✓ {perk}</li>
                ))}
              </ul>
              <button
  onClick={() => {
    setCover(p.coverValue);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }}
  className="mt-6 bg-blue-700 text-white rounded-lg py-2 hover:bg-blue-800"
>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { step: "1", title: "Choose a plan", text: "Compare plans and pick the cover that fits your family." },
            { step: "2", title: "Get your quote", text: "Use the calculator to see your estimated premium." },
            { step: "3", title: "Stay covered", text: "Enjoy cashless treatment and easy online claims." },
          ].map((s) => (
            <div key={s.step} className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center shadow">
              <div className="mx-auto w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center">
                {s.step}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-12 px-6 my-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "50,000+", l: "Happy customers" },
            { n: "3,000+", l: "Network hospitals" },
            { n: "98%", l: "Claims settled" },
            { n: "24x7", l: "Support" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl font-bold">{s.n}</p>
              <p className="text-sm text-blue-100">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Calculator + Claim side by side */}
      <section id="calculator" className="max-w-5xl mx-auto px-6 pb-8 grid gap-6 md:grid-cols-2 items-start">
        <PremiumCalculator cover={cover} onCoverChange={setCover} />
        <ClaimForm />
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center text-sm py-8 mt-8">
        © 2026 HealthShield. All rights reserved.
      </footer>
    </main>
  );
}
  