import Model from "../model";

class Agent {
  public model: Model;
  constructor(apiKey: string) {
    this.model = new Model("gemini", apiKey);
  }

  public async rephrase(prompt: string) {
    const rephrasePrompt = `
      Please rephrase this text in a more professional tone and give the answer without any explanation: ${prompt}
    `;
    return this.model.generateResponse(rephrasePrompt);
  }

  public async rephraseVariants(prompt: string) {
    const rephrasePrompt = `
        Please rephrase this text in a more professional tone and give the answer without any explanation and return 10 different variants in the following format:
        - Variant 1:
        - Variant 2:
        - Variant 3:
        - Variant 4:
        - Variant 5:
        - Variant 6:
        - Variant 7:
        - Variant 8:
        - Variant 9:
        - Variant 10:
        Return only the variants, no other text : ${prompt}
    `;
    return this.model.generateResponse(rephrasePrompt);
  }
}

export default Agent;
