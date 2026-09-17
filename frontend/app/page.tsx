"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeText() {
    try {
      setLoading(true);
      setResult("");

      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      const data = await response.json();

      setResult(data.analysis);
    } catch (error) {
      console.error(error);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">

      <h1 className="text-4xl font-bold">
        McKinsey AI Hackathon
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter something to analyze..."
        className="w-full max-w-xl h-40 p-4 text-black bg-white rounded-lg"
      />

      <button
        onClick={analyzeText}
        className="px-6 py-3 bg-white text-black rounded-lg"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="w-full max-w-xl p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-3">
            Result
          </h2>

          <p>{result}</p>
        </div>
      )}

    </main>
  );
}