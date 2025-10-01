"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export type Tool = {
  name: string;
  level: number;
};

export type SkillCategory = {
  category: string;
  strength: number;
  tools: Tool[];
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/skills`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setSkills(data);
        } else {
          console.error("Unexpected data format:", data);
          setSkills([]);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading skills...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-gray-900 mb-12 text-center"
      >
        My <span className="text-emerald-600">Skills</span>
      </motion.h1>

      {/* Radar Chart */}
      <div className="bg-white border rounded-2xl shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Category Strength
        </h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <RadarChart data={skills || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Strength"
                dataKey="strength"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white border rounded-2xl shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Tool Proficiency
        </h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <BarChart
              data={
                skills && Array.isArray(skills)
                  ? skills.flatMap((s) => s.tools)
                  : []
              }
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="level" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.tools.map((tool, j) => (
                <span
                  key={j}
                  className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700 font-medium"
                >
                  {tool.name} ({tool.level})
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
