import { BaseModel } from "./base";
import { ModelConfigParams } from "../types/model";

export const getModels = ({ provider, apiKey, model }: ModelConfigParams) => {
  switch (provider) {
    case "gemini":
      return new BaseModel<string>({
        apiUrl: `https://generativelanguage.googleapis.com/v1beta/models/${
          model || "gemini-2.0-flash"
        }:generateContent?key=${apiKey}`,
        requestTransformer: (prompt: string) => ({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
        responseTransformer: (data: any) => {
          return data.candidates[0].content.parts[0].text;
        },
      });
    case "openai":
      return new BaseModel<string>({
        apiUrl: `https://api.openai.com/v1/completions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        requestTransformer: (prompt: string) => ({
          model: model || "text-davinci-003",
          prompt,
          max_tokens: 150,
        }),
        responseTransformer: (data: any) => data.choices[0].text,
      });
    case "claude":
      return new BaseModel<string>({
        apiUrl: `https://api.anthropic.com/v1/complete`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        requestTransformer: (prompt: string) => ({
          prompt: `Human: ${prompt}\n\nAssistant:`,
          model: model || "claude-v1",
          max_tokens_to_sample: 150,
        }),
        responseTransformer: (data: any) => data.completion,
      });
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};
