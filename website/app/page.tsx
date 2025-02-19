import React from "react";
import Link from "next/link";
import { getAllCategories } from "@/lib/markdown";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Introduction | Minimal Docs Site",
  description: "Welcome to our minimal documentation site",
};

export default function HomePage() {
  redirect("/tools");
}
