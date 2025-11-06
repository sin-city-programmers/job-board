"use client";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="p-8 flex flex-col md:flex-row gap-2 items-center">
      <input
        type="text"
        placeholder="Search jobs by title, skills, or company..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
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
  );
}
