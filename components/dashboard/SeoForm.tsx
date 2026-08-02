"use client";

import { useState } from "react";

type SeoFormProps = {
  onAnalyze: () => void;
};

export default function SeoForm({ onAnalyze }: SeoFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!url) {
      alert("Please enter a website URL");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onAnalyze();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Analyze Website</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}