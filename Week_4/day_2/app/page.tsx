"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import JobCard from "./components/JobCard";
import FilterBar from "./components/FilterBar";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobs", {
        cache: "no-store",
      });
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  // Add filter
  const addFilter = (tag: string) => {
    if (!filters.includes(tag)) {
      setFilters([...filters, tag]);
    }
  };

  // Remove filter
  const removeFilter = (tag: string) => {
    setFilters(filters.filter((f) => f !== tag));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([]);
  };

  // Filter jobs
  const filteredJobs = useMemo(() => {
    if (filters.length === 0) return jobs;

    return jobs.filter((job) => {
      const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
      return filters.every((f) => jobTags.includes(f));
    });
  }, [filters, jobs]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full relative h-36 bg-[#5BA5A5]">
        <Image src="/bg-header-desktop.svg" alt="" fill />
      </div>

      {/* Main content */}
      <div className="w-80 md:w-[600px] lg:w-[1000px] mx-auto px-4">
        {filters.length > 0 && (
          <FilterBar
            filters={filters}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
          />
        )}

        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} addFilter={addFilter} />
        ))}
      </div>
    </div>
  );
}
