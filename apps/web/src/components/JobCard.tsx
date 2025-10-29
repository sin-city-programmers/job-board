"use client";

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

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="card bg-base-100 shadow-md">
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
  );
}
