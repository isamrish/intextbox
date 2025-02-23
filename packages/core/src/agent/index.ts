import { basePrompt } from "./basePrompt";
import { getModels } from "../model/models";
import { BaseModel } from "../model/base";
import { Provider } from "../types/model";
class Agent {
  public name: string;
  private responsibility: string;
  private taskDetails: string;
  private model: BaseModel;
  private agentConfig: any;

  constructor({
    name,
    responsibility,
    taskDetails,
    config,
    agentConfig,
  }: {
    name: string;
    responsibility: string;
    taskDetails: string;
    config: {
      provider: Provider;
      apiKey: string;
    };
    agentConfig?: {
      outputFormat?: string;
      lengthConstraints?: string;
      toneAndStyle?: string;
    };
  }) {
    this.name = name;
    this.responsibility = responsibility;
    this.taskDetails = taskDetails;
    this.model = getModels({
      provider: config.provider,
      apiKey: config.apiKey,
    })!;
    this.agentConfig = agentConfig || {};
  }

  private preparePrompt({ content }: { content: string }) {
    const _prompt = basePrompt({
      agentName: this.name,
      agentResponsibility: this.responsibility,
      taskDetails: this.taskDetails,
      content,
      ...("outputFormat" in this.agentConfig
        ? {
            outputFormat: this.agentConfig.outputFormat,
          }
        : {}),
      ...("lengthConstraints" in this.agentConfig
        ? {
            lengthConstraints: this.agentConfig.lengthConstraints,
          }
        : {}),
      ...("toneAndStyle" in this.agentConfig
        ? {
            toneAndStyle: this.agentConfig.toneAndStyle,
          }
        : {}),
    });
    return _prompt;
  }

  public async getResponse({ content }: { content: string }) {
    const prompt = this.preparePrompt({ content });
    return await this.model.completeText(prompt);
  }
}

export default Agent;
