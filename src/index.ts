import "dotenv/config";

import * as agents from "@graphai/vanilla";
import { openAIAgent, anthropicAgent } from "@graphai/llm_agents";
import { GraphAI } from "graphai/lib/index";

import { graphMeta } from "./graph";

const run = async () => {
  const graph = new GraphAI(
    graphMeta,
    {
      ...agents,
      openAIAgent,
      anthropicAgent,
    },
  );
  const result = await graph.run<{text: string}>();
  console.log(result?.llm?.text);
};

run();
