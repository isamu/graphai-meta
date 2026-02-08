import { python } from "./python_code";
import { system } from "./prompts";

import { GraphData } from "graphai";

const __claude = {
  agent: "anthropicAgent",
  params: {
    stream: true,
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 64000,
  },
};

const openAI = {
  agent: "openAIAgent",
  params: {
    stream: true,
  },
};

export const graphMeta: GraphData = {
  version: 0.5,
  nodes: {
    messages: {
      value: [],
    },
    system: {
      value: system,
    },
    prompt: {
      value: python,
    },
    llm: {
      ...openAI,
      isResult: true,
      inputs: { messages: ":messages", prompt: ":prompt", system: ":system" },
    },
  },
};
