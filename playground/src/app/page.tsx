"use client";
import { useState } from "react";
import { Agent } from "../../../packages/core";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const agent = new Agent(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  const handleRephrase = async () => {
    const response = await agent.rephrase(prompt);
    const result = response?.parts[0]?.text;
    if (result) {
      setPrompt(result);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto flex justify-center items-center pt-32">
      <Tabs defaultValue="rephrase" className="w-full">
        <TabsList>
          <TabsTrigger value="rephrase">Rephrase</TabsTrigger>
        </TabsList>
        <TabsContent value="rephrase">
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              value={prompt}
              onChange={handleChange}
              rows={16}
            />
            <Button onClick={handleRephrase}>Rephrase</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
