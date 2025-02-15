"use server";

import { Agent } from "@intextbox/core";

const agent = new Agent(process.env.GEMINI_API_KEY || "");

export async function rephrase(prompt: string) {
  const response = await agent.rephrase(prompt);
  return response?.parts[0]?.text;
}
