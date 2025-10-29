"use client";

export default function CallToAction() {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-gray-600 mb-4">Join the Tech Alley community and connect with local opportunities</p>
      <div className="flex justify-center gap-4">
        <button className="btn btn-outline">I&apos;m Looking for Work</button>
        <button className="btn btn-success">I&apos;m Hiring Talent</button>
      </div>
    </div>
  );
}
