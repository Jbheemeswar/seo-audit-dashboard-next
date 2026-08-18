"use client";

import { useState } from "react";
import Modal from "../../playground/components/Modal";
import Tabs from "../../playground/components/Tabs";
import Disclosure from "@/playground/components/Disclosure";

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Accessibility Playground
        </h1>

        <p className="mb-6 text-slate-600">
          Testing accessible React components.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Open Modal
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Tabs Component
        </h2>

        <Tabs />
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
  <h2 className="mb-4 text-2xl font-bold text-slate-900">
    Disclosure Component
  </h2>

  <Disclosure />
</div>
    </main>
  );
}