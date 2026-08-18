"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";

type SeoIssue = {
  type: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
};

type SeoResult = {
  url: string;
  score: number;
  issues: number;
  recommendations: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  details: {
    title: string | null;
    hasMetaDescription: boolean;
    h1Count: number;
    imageCount: number;
    imagesWithoutAlt: number;
    hasViewport: boolean;
    hasCanonical: boolean;
  };
  issueDetails: SeoIssue[];
};

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SeoResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [aiAdvice, setAiAdvice] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setAiError("");
    setAiAdvice("");
    setResult(null);

    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "SEO analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze the website."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAiAdvice = async () => {
    if (!result) {
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiAdvice("");

    try {
      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report: result,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate AI recommendations."
        );
      }

      setAiAdvice(data.advice);
    } catch (err) {
      setAiError(
        err instanceof Error
          ? err.message
          : "Unable to generate AI recommendations."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-slate-900">
            Analyze Website
          </h1>

          <p className="mt-2 text-slate-600">
            Analyze a website and get AI-powered SEO recommendations.
          </p>
        </section>

        {/* Website URL */}
        <section className="rounded-xl bg-white p-6 shadow-md">
          <form
            onSubmit={handleAnalyze}
            className="flex flex-col gap-4 md:flex-row"
          >
            <label htmlFor="website-url" className="sr-only">
              Website URL
            </label>

            <input
              id="website-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              disabled={loading}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Website"}
            </button>
          </form>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            >
              {error}
            </div>
          )}
        </section>

        {/* Loading */}
        {loading && (
          <section
            aria-live="polite"
            className="rounded-xl bg-white p-6 text-center shadow-md"
          >
            <p className="font-medium text-slate-900">
              Analyzing website...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Checking title, headings, metadata, images, and other SEO
              elements.
            </p>
          </section>
        )}

        {/* SEO Results */}
        {result && (
          <>
            <section>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  SEO Overview
                </h2>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {result.url}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                  label="SEO Score"
                  value={result.score.toString()}
                  valueClassName="text-green-600"
                />

                <StatCard
                  label="Issues"
                  value={result.issues.toString()}
                  valueClassName="text-red-600"
                />

                <StatCard
                  label="Recommendations"
                  value={result.recommendations.toString()}
                  valueClassName="text-blue-600"
                />
              </div>
            </section>

            {/* SEO Details */}
            <section className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-slate-900">
                SEO Details
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  label="Page Title"
                  value={result.details.title || "Missing"}
                />

                <DetailItem
                  label="Meta Description"
                  value={
                    result.details.hasMetaDescription
                      ? "Present"
                      : "Missing"
                  }
                />

                <DetailItem
                  label="H1 Headings"
                  value={result.details.h1Count.toString()}
                />

                <DetailItem
                  label="Images"
                  value={result.details.imageCount.toString()}
                />

                <DetailItem
                  label="Images Without Alt"
                  value={result.details.imagesWithoutAlt.toString()}
                />

                <DetailItem
                  label="Viewport"
                  value={
                    result.details.hasViewport
                      ? "Present"
                      : "Missing"
                  }
                />

                <DetailItem
                  label="Canonical URL"
                  value={
                    result.details.hasCanonical
                      ? "Present"
                      : "Missing"
                  }
                />
              </div>
            </section>

            {/* Issues */}
            <section className="rounded-xl bg-white p-6 shadow-md">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-slate-900">
                  Issues Found
                </h2>

                <div className="flex flex-wrap gap-2 text-sm">
                  <SeverityBadge label={`Critical: ${result.critical}`} />
                  <SeverityBadge label={`High: ${result.high}`} />
                  <SeverityBadge label={`Medium: ${result.medium}`} />
                  <SeverityBadge label={`Low: ${result.low}`} />
                </div>
              </div>

              {result.issueDetails.length === 0 ? (
                <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-700">
                  No SEO issues were detected.
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {result.issueDetails.map((issue, index) => (
                    <div
                      key={`${issue.title}-${index}`}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-semibold text-slate-900">
                          {issue.title}
                        </h3>

                        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-600">
                          {issue.type}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        {issue.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* AI Advisor */}
            <section className="rounded-xl border border-blue-100 bg-white p-6 shadow-md">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  AI SEO Advisor
                </h2>

                <p className="mt-2 text-slate-600">
                  Get AI-powered recommendations based on this actual SEO
                  report.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAiAdvice}
                disabled={aiLoading}
                className="mt-6 rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {aiLoading
                  ? "Generating recommendations..."
                  : "Get AI Recommendations"}
              </button>

              {aiError && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
                >
                  {aiError}
                </div>
              )}

              {aiAdvice && (
                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">
                    AI Analysis
                  </h3>

                  <div className="prose prose-slate mt-4 max-w-none text-sm leading-7">
                  <ReactMarkdown>{aiAdvice}</ReactMarkdown>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}

function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className={`mt-2 text-4xl font-bold ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 break-words font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function SeverityBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
      {label}
    </span>
  );
}