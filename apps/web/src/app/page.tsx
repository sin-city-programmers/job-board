"use client";

import { useState } from "react";

export default function Index() {
  const [search, setSearch] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Acme Corp",
      type: "Full-Time",
      posted: "2 days ago",
      tags: ["React", "Node.js", "PostgreSQL"],
      color: "bg-blue-100 text-blue-700",
      initials: "AC",
    },
    {
      id: 2,
      title: "UX/UI Designer for SaaS Platform",
      company: "TechStart Inc",
      type: "Freelance",
      posted: "1 week ago",
      tags: ["Figma", "User Research"],
      color: "bg-purple-100 text-purple-700",
      initials: "TS",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Vegas Gaming Co",
      type: "Part-Time",
      posted: "3 days ago",
      tags: ["AWS", "Docker", "Kubernetes"],
      color: "bg-pink-100 text-pink-700",
      initials: "VG",
    },
  ];

  return (
    <div>
      {/* Search Bar */}
      <div className="p-8 flex flex-col md:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Search jobs by title, skills, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />
        <select className="select select-bordered text-sm">
          <option>Gig Type</option>
        </select>
        <select className="select select-bordered text-sm">
          <option>Tech Stack</option>
        </select>
        <button className="btn btn-primary">Search</button>
      </div>

      {/* Job Listings */}
      <div className="px-8">
        <h2 className="text-lg font-semibold mb-4">Recent Opportunities</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="card bg-base-100 shadow-md">
              <div className="card-body flex-row justify-between items-center p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${job.color}`}>
                    {job.initials}
                  </div>
                  <div>
                    <h3 className="card-title text-base font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500">
                      {job.company} • {job.type} • Posted {job.posted}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {job.tags.map((tag) => (
                        <span key={tag} className="badge badge-ghost badge-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-10">
        <h2 className="text-xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-4">Join the Tech Alley community and connect with local opportunities</p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-outline">I&apos;m Looking for Work</button>
          <button className="btn btn-success">I&apos;m Hiring Talent</button>
        </div>
      </div>
    </div>
  );
}
