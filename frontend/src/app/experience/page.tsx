"use client";
import { useEffect, useState } from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  years: string;
  summary: string[];
  impact: string;
  tools: string[];
};

const skillsData = [
  { category: "Backend", value: 90 },
  { category: "Cloud", value: 70 },
  { category: "AI/ML", value: 80 },
  { category: "Frontend", value: 60 },
  { category: "Data", value: 75 },
];

export default function ExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/experience");
        const data = await res.json();
        setItems(data.experience || []);
      } catch (e) {
        setErr("Could not load experience.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading experience…</p>;
  if (err) return <p className="mt-10 text-center text-red-600">{err}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10">Experience</h1>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-200 pl-8">
        {items.map((job, idx) => (
          <div key={idx} className="relative mb-10">
            {/* Dot */}
            <span className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow" />

            {/* Card */}
            <div className="rounded-xl bg-white border shadow p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {job.role}
                </h2>
                <span className="text-sm text-gray-500">{job.years}</span>
              </div>
              <p className="mt-1 text-gray-700">
                {job.company} · {job.location}
              </p>

              <ul className="mt-4 list-disc pl-6 space-y-1 text-gray-700">
                {job.summary.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>

              {/* Impact */}
              <div className="mt-6">
                <p className="font-medium text-gray-900 mb-2">Impact</p>
                <p className="text-sm text-gray-600">{job.impact}</p>
              </div>

              {/* Tools */}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Overview Chart (moved to bottom) */}
      <div className="bg-white border rounded-xl shadow p-6 mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Skills Overview
        </h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <RadarChart data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
