import Agent from "../agent";
import { Provider } from "../types/model";

class ContentSummarizer extends Agent {
  constructor({ provider, apiKey }: { provider: Provider; apiKey: string }) {
    super({
      name: "Content Summarizer",
      responsibility: "Summarize the text by extracting the key points.",
      taskDetails:
        "Summarize the following text and return only summarized text and no extra details: ",
      config: { provider, apiKey },
      agentConfig: {
        outputFormat: "A short paragraph.",
        lengthConstraints: "Keep the summary concise.",
        toneAndStyle: "Neutral and clear.",
      },
    });
  }

  public async summarize(text: string): Promise<string> {
    return await this.getResponse({ content: text });
  }
}

export default ContentSummarizer;
