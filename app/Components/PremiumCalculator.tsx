"use client";

import { useState } from "react";

const covers = [3, 5, 10, 25]; // in Lakh

function getRatePerLakh(age: number) {
  if (age < 30) return 700;
  if (age < 45) return 1000;
  if (age < 60) return 1600;
  return 2500;
}

export default function PremiumCalculator({ cover, onCoverChange }: { cover: number; onCoverChange: (c: number) => void }) {
  const [age, setAge] = useState(30);
  const [members, setMembers] = useState(1);

  const base = getRatePerLakh(age) * cover * (1 + 0.6 * (members - 1));
  const gst = base * 0.18;
  const total = Math.round(base + gst);

  return (
    <section className="h-full">
      <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-blue-700">Premium Calculator</h2>
        <p className="text-sm text-slate-500 mt-1">Get an estimated yearly premium</p>

        <div className="mt-6 space-y-5 flex-1">
          <div>
            <label className="block text-sm font-medium mb-1">
              Age of eldest member: {age}
            </label>
            <input
              type="range"
              min={18}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Family members</label>
            <select
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover amount</label>
            <select
              value={cover}
              onChange={(e) => onCoverChange(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              {covers.map((c) => (
                <option key={c} value={c}>₹{c} Lakh</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-500">Estimated yearly premium (incl. 18% GST)</p>
          <p className="text-3xl font-bold text-blue-700">₹{total.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </section>
  );
}