"use client";

import { useRef, useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: string;
};

const tabs: Tab[] = [
  {
    id: "overview",
    label: "Overview",
    content: "This is the overview section of the SEO report.",
  },
  {
    id: "seo",
    label: "SEO",
    content: "This section contains SEO performance information.",
  },
  {
    id: "recommendations",
    label: "Recommendations",
    content: "This section contains recommendations for improvement.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div
        role="tablist"
        aria-label="SEO report sections"
        className="flex gap-2 border-b border-slate-200"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`px-4 py-3 font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          className="pt-5 text-slate-700"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
