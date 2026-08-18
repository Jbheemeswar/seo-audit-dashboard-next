"use client";

import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl bg-white shadow-md">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="seo-disclosure-content"
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900"
      >
        <span>SEO Recommendations</span>

        <span aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id="seo-disclosure-content"
        hidden={!isOpen}
        className="border-t border-slate-200 p-5 text-slate-600"
      >
        <ul className="list-disc space-y-2 pl-5">
          <li>Add meaningful meta descriptions.</li>
          <li>Improve image alt text.</li>
          <li>Fix broken links.</li>
        </ul>
      </div>
    </div>
  );
}