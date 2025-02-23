export interface RequestTransformer {
  (prompt: string): any;
}

export interface ResponseTransformer<T> {
  (data: any): T;
}

export interface LanguageModelConfig<T> {
  apiUrl: string;
  headers?: Record<string, string>;
  method?: string;
  requestTransformer?: RequestTransformer;
  responseTransformer?: ResponseTransformer<T>;
}

export type Provider = "gemini" | "openai" | "claude";

export interface ModelConfigParams {
  provider: Provider;
  apiKey: string;
  model?: string;
}
