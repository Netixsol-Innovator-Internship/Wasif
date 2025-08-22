"use client";
import React from "react";
import NewsCard from "./NewsCard";
import Container from "./Container";

export default function Exclusive() {
  return (
    <section className="bg-black w-full pt-20">
      <Container>
        <div className="flex gap-x-4 w-full">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </Container>
    </section>
  );
}
