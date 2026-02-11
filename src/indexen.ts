import dotenv from "dotenv";
dotenv.config({ quiet: true });

import * as agents from "@graphai/vanilla";
import { openAIAgent } from "@graphai/openai_agent";
import { GraphAI } from "graphai/lib/index";

import { graphMeta } from "./graph";

const run = async () => {
  const graph = new GraphAI(graphMeta, {
    ...agents,
    openAIAgent,
  });
  const result = await graph.run<{ text: string }>();
  console.log(result?.llm?.text);
};

run();
