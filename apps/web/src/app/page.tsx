"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobList from "../components/JobList";
import CallToAction from "../components/CallToAction";
import PageContainer from "../components/PageContainer";

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
    <PageContainer>
      <SearchBar search={search} onSearchChange={setSearch} />
      <JobList jobs={jobs} />
      <CallToAction />
    </PageContainer>
  );
}
