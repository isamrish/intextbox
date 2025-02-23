import Agent from "../agent";
import { Provider } from "../types/model";

class ContentRephraser extends Agent {
  constructor({ provider, apiKey }: { provider: Provider; apiKey: string }) {
    super({
      name: "Content Rephraser",
      responsibility:
        "Rephrase the text while keeping its original meaning, tone, and essential details.",
      taskDetails:
        "Rephrase the following text and return rephrased text only and no extra details",
      config: { provider, apiKey },
      agentConfig: {
        outputFormat: "Clear, structured paragraphs.",
        lengthConstraints: "Be succinct.",
        toneAndStyle: "Maintain the original tone.",
      },
    });
  }

  public async rephrase(text: string): Promise<string> {
    return await this.getResponse({ content: text });
  }
}

export default ContentRephraser;
