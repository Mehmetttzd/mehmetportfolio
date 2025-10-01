"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Project = {
  id: number;
  name: string;
  description: string;
  details: string;
  impact: string;
  status: string;
  tech: {
    frontend: string[];
    backend: string[];
    ml: string[];
    cloud: string[];
  };
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading projects...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10">Projects</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border p-6 shadow-lg bg-white hover:shadow-2xl transition"
          >
            {/* Header with status */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">{proj.name}</h2>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  proj.status === "Completed"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {proj.status}
              </span>
            </div>

            {/* Description + Details */}
            <p className="text-gray-600 mb-3">{proj.description}</p>
            <p className="text-gray-700 text-sm leading-relaxed">{proj.details}</p>

            {/* Impact */}
            <p className="mt-4 text-emerald-700 font-medium">⚡ {proj.impact}</p>

            {/* Tech Stacks */}
            <div className="mt-6 space-y-3">
              {Object.entries(proj.tech).map(([category, tools]) =>
                tools.length > 0 ? (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg shadow-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
