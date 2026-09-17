"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Not checked yet");
  const [loading, setLoading] = useState(false);

  async function checkBackend() {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/health");
      const data = await response.json();

      setStatus(data.status);
    } catch (error) {
      console.error(error);
      setStatus("Backend connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        McKinsey AI Hackathon
      </h1>

      <p className="text-xl">
        Backend status: {status}
      </p>

      <button
        onClick={checkBackend}
        className="px-6 py-3 bg-white text-black rounded-lg"
      >
        {loading ? "Checking..." : "Check Backend"}
      </button>
    </main>
  );
}