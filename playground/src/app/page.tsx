"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rephrase, summarize } from "@/actions";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const handleRephrase = async () => {
    const response = await rephrase(prompt);
    if (response) {
      setPrompt(response);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSummarize = async () => {
    const response = await summarize(text);
    if (response) {
      setText(response);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex justify-center items-center pt-32">
      <Tabs defaultValue="rephrase" className="w-full">
        <TabsList>
          <TabsTrigger value="rephrase">Rephrase</TabsTrigger>
          <TabsTrigger value="summarize">Summarize</TabsTrigger>
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
        <TabsContent value="summarize">
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              value={text}
              onChange={handleTextChange}
              rows={16}
            />
            <Button onClick={handleSummarize}>Summarize</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
