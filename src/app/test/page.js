"use client";

export default function TestPage() {
  return (
    <div className="p-10">
      <h1>{process.env.NEXT_PUBLIC_GEMINI_API_KEY ? "API KEY FOUND ✅" : "API KEY MISSING ❌"}</h1>
    </div>
  );
}