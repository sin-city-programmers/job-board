"use client";

import JobCard from "./JobCard";

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  posted: string;
  tags: string[];
  color: string;
  initials: string;
}

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="px-8">
      <h2 className="text-lg font-semibold mb-4">Recent Opportunities</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
