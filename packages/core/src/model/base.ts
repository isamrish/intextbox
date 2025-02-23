import {
  LanguageModelConfig,
  RequestTransformer,
  ResponseTransformer,
} from "../types/model";

export class BaseModel<T = string> {
  private apiUrl: string;
  private headers: Record<string, string>;
  private method: string;
  private requestTransformer: RequestTransformer;
  private responseTransformer: ResponseTransformer<T>;

  constructor(config: LanguageModelConfig<T>) {
    this.apiUrl = config.apiUrl;
    this.headers = config.headers || { "Content-Type": "application/json" };
    this.method = config.method || "POST";
    this.requestTransformer =
      config.requestTransformer || ((prompt) => ({ prompt }));
    this.responseTransformer =
      config.responseTransformer || ((data) => data as T);
  }

  public async completeText(prompt: string): Promise<T> {
    const body = JSON.stringify(this.requestTransformer(prompt));
    const response = await fetch(this.apiUrl, {
      headers: this.headers,
      method: this.method,
      body,
    });
    const data = await response.json();
    return this.responseTransformer(data);
  }

  public async *streamCompleteText(
    prompt: string
  ): AsyncGenerator<string, void, unknown> {
    const body = JSON.stringify(this.requestTransformer(prompt));
    const response = await fetch(this.apiUrl, {
      headers: this.headers,
      method: this.method,
      body,
    });

    if (!response.body) {
      throw new Error(
        "Streaming responses are not supported by this endpoint."
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield decoder.decode(value);
      }
    } finally {
      reader.releaseLock();
    }
  }

  public updateConfig(newConfig: Partial<LanguageModelConfig<T>>): void {
    if (newConfig.apiUrl) {
      this.apiUrl = newConfig.apiUrl;
    }
    if (newConfig.headers) {
      this.headers = newConfig.headers;
    }
    if (newConfig.method) {
      this.method = newConfig.method;
    }
    if (newConfig.requestTransformer) {
      this.requestTransformer = newConfig.requestTransformer;
    }
    if (newConfig.responseTransformer) {
      this.responseTransformer = newConfig.responseTransformer;
    }
  }
}
