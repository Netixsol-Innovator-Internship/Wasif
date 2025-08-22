import React from "react";
interface ButtonProps {
  className?: string;
}
export default function Button({ className }: ButtonProps) {
  return (
    <div>
      <button
        className={`border-[1px] border-white p-0.5 px-4 ${className ?? ""}`}
      >
        View More
      </button>
    </div>
  );
}
