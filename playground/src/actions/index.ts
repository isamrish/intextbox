"use server";

import { ContentRephraser, ContentSummarizer } from "@intextbox/core";

const contentRephraser = new ContentRephraser({
  provider: "gemini",
  apiKey: process.env.GEMINI_API_KEY || "",
});

const contentSummarizer = new ContentSummarizer({
  provider: "gemini",
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function rephrase(prompt: string) {
  return await contentRephraser.rephrase(prompt);
}

export async function summarize(prompt: string) {
  return await contentSummarizer.summarize(prompt);
}
