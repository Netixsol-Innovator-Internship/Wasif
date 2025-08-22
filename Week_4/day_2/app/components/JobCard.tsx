"use client";
import React from "react";
import Image from "next/image";
import { Job } from "@/types/jobs";

export default function JobCard({
  job,
  addFilter,
}: {
  job: Job;
  addFilter: (tag: string) => void;
}) {
  return (
    <div
      className={`w-full bg-white shadow-md h-auto md:h-36 mx-auto rounded-md mt-10 px-5 py-6 flex flex-col md:flex-row md:items-center group gap-4 ${
        job.featured ? "border-l-4 border-[#5BA5A5]" : ""
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0 -mt-14 md:-mt-0">
        <Image
          src={job.logo}
          alt={`${job.company} Logo`}
          width={60}
          height={60}
          className="md:w-[80px] md:h-[80px]"
        />
      </div>

      {/* Job details */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[#5BA5A5] font-semibold">{job.company}</p>
          {job.new && (
            <span className="bg-[#5BA5A5] text-white font-semibold rounded-2xl px-2 py-1 text-xs">
              NEW!
            </span>
          )}
          {job.featured && (
            <span className="bg-black text-white font-semibold rounded-2xl px-2 py-1 text-xs">
              FEATURED
            </span>
          )}
        </div>

        <p className="text-black group-hover:text-[#5BA5A5] font-semibold text-lg">
          {job.position}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-gray-400 font-medium text-sm">
          <p>{job.postedAt}</p>
          <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          <p>{job.contract}</p>
          <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          <p>{job.location}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mt-4 md:mt-0 md:ml-auto border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
        {[job.role, job.level, ...job.languages, ...job.tools].map((tag) => (
          <button
            key={tag}
            onClick={() => addFilter(tag)}
            className="bg-gray-100 text-[#5BA5A5] hover:bg-[#5BA5A5] hover:text-white font-semibold text-sm py-1 px-2 rounded cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
