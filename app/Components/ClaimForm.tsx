"use client";

import { useState } from "react";

export default function ClaimForm() {
  const [form, setForm] = useState({
    name: "",
    policyNumber: "",
    hospital: "",
    amount: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name || !form.policyNumber || !form.hospital || !form.amount) {
      setError("Please fill in all fields.");
      return;
    }
    if (Number(form.amount) <= 0) {
      setError("Claim amount must be greater than 0.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="h-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-green-600">Claim Submitted</h2>
          <p className="mt-2 text-slate-600">
            Thank you, {form.name}. Your claim of ₹
            {Number(form.amount).toLocaleString("en-IN")} for policy{" "}
            {form.policyNumber} has been received.
          </p>
          <button
            onClick={() => {
              setForm({ name: "", policyNumber: "", hospital: "", amount: "" });
              setSubmitted(false);
            }}
            className="mt-4 bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800"
          >
            Submit another claim
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full">
      <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
        <h2 className="text-2xl font-bold text-blue-700">File a Claim</h2>
        <p className="text-sm text-slate-500 mt-1">Fill in the details to submit your claim</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Policy number</label>
            <input name="policyNumber" value={form.policyNumber} onChange={handleChange}
              className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hospital name</label>
            <input name="hospital" value={form.hospital} onChange={handleChange}
              className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Claim amount (₹)</label>
            <input name="amount" type="number" value={form.amount} onChange={handleChange}
              className="w-full border rounded-lg p-2" />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-700 text-white rounded-lg py-2 hover:bg-blue-800"
        >
          Submit Claim
        </button>
      </div>
    </section>
  );
}