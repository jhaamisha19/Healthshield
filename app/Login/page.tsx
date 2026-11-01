"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  // Resend countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  function sendOtp() {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    // DEMO ONLY: real app me OTP server se email pe jayega
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtp("");
    setError("");
    setTimer(30);
    setStep("otp");
  }

  function verifyOtp() {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    if (otp !== generatedOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    setError("");
    setStep("done");
  }

  const wrapper =
    "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6";
  const card = "bg-white rounded-2xl shadow-lg p-8 max-w-md w-full";

  if (step === "done") {
    return (
      <main className={wrapper}>
        <div className={`${card} text-center`}>
          <h1 className="text-2xl font-bold text-green-600">Login successful!</h1>
          <p className="mt-2 text-slate-500">Welcome to HealthShield, {email}</p>
          <Link
            href="/"
            className="inline-block mt-6 bg-blue-700 text-white rounded-lg px-6 py-2 hover:bg-blue-800"
          >
            Go to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={wrapper}>
      <div className={card}>
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          ← Back to home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-blue-700">HealthShield</h1>
        <p className="text-slate-500 mt-1">
          {step === "email" ? "Login or sign up with your email" : `Enter the OTP sent to ${email}`}
        </p>

        {step === "email" && (
          <>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border rounded-lg p-2"
              />
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <button
              onClick={sendOtp}
              className="mt-6 w-full bg-blue-700 text-white rounded-lg py-2 hover:bg-blue-800"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            {/* Demo box: real app me ye hata dena */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              Demo mode: your OTP is <span className="font-bold tracking-widest">{generatedOtp}</span>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">6-digit OTP</label>
              <input
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border rounded-lg p-2 text-center text-2xl tracking-[0.5em]"
              />
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <button
              onClick={verifyOtp}
              className="mt-6 w-full bg-blue-700 text-white rounded-lg py-2 hover:bg-blue-800"
            >
              Verify & Login
            </button>

            <div className="mt-4 flex justify-between text-sm">
              <button
                onClick={() => { setStep("email"); setError(""); }}
                className="text-slate-500 hover:underline"
              >
                Change email
              </button>
              {timer > 0 ? (
                <span className="text-slate-400">Resend OTP in {timer}s</span>
              ) : (
                <button onClick={sendOtp} className="text-blue-700 font-medium hover:underline">
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}