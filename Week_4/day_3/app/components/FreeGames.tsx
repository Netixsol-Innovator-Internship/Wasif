"use client";
import React from "react";
import Container from "./Container";
import { FiGift } from "react-icons/fi";
import FGCard from "./FGCard";
import Button from "./Button";

export default function FreeGames() {
  return (
    <>
      <Container className="pt-10">
        <div className="w-full bg-[#2A2A2A] min-h-[522px] text-white px-8">
          <div className="flex justify-between w-full pt-4 items-center">
            <div className="flex gap-x-2 items-center">
              <FiGift className="text-4xl" />
              <p>Free Games</p>
            </div>
            <Button />
          </div>
          <div className="grid grid-cols-4 gap-x-10 px-10 pt-11">
            <FGCard />
            <FGCard />
            <FGCard />
            <FGCard />
          </div>
        </div>
      </Container>
    </>
  );
}
