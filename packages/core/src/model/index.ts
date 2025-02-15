import Gemini from "./gemini";

class Model {
  public model: any;
  constructor(public provider: string, public apiKey: string) {
    this.provider = provider;
    this.apiKey = apiKey;
    this.initialize();
  }

  public initialize() {
    if (this.provider === "gemini") {
      if (!this.apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
      }
      this.model = new Gemini(this.apiKey);
    }
  }

  public generateResponse(prompt: string) {
    return this.model.generateResponse(prompt);
  }

  public async generateResponseAsync(prompt: string) {
    return this.model.generateResponse(prompt);
  }
}

export default Model;
