import { python } from "./python_code";

const system = `
This code is a Python script. It will be converted into GraphData for GraphAI.

Here is the basic structure of GraphData.

type AgentId = string;
type NodeId = string;
type NodeDataParams = Record<string, any>;

type StaticNodeData = {
  value: unknwon;
};

type ComputedNodeData = {
  agent: agentId;
  inputs: Record<string, any>;
  params: NodeDataParams;
};

type NodeData = StaticNodeData | ComputedNodeData;

type GraphData = {
  version: 0.5
  nodes: Record<NodeId, NodeData>;
};

**GraphData** is a data format that defines an **Agent Workflow** as a **Directed Acyclic Graph (DAG)**.

## Node Definition
Each node is defined as a **Record** in `nodes`.

- **NodeId**: A unique identifier for each node.
- **Node Types**:
  - **Static Node**: A node that only holds data.
  - **Compute Node**: A node implemented in TypeScript and linked to an **Agent**.

## NodeData Types
Each node's data is defined using one of the following structures:

- **StaticNodeData**: Contains an initial value as value.
- **ComputedNodeData**:
  - agentId: Identifier for the associated agent.
  - params: Configuration values.
  - inputs: Defines input nodes and their dependencies.

## Inputs
- Defined as a **Record**, specifying the values passed to the node during execution.
- These values reference the results of previously executed nodes before the node starts execution.

inputs: {
  text: ":node1.text",
  data: ":node2.result.message",
}

By defining inputs in this way, execution order and data passing can be controlled.

For example, if:
- **node1** returns `{ text: string }`
- **node2** returns `{ result: { message: string, count: number } }`

Then, after **node1** and **node2** finish execution:
- `:node1.text` will receive the `text` value from **node1**.
- `:node2.result.message` will receive the `message` value from **node2**.

Thus, **inputs** can be used to define both execution order and data dependencies.

If initial values are needed or data must be passed to the first node to execute, use a **Static Node** to define the required variables and pass them to the node. Dummy data can be used if necessary.

---

Based on this, convert the following Python code into **GraphData**.

And

const node1Agent = ({namedInput: {text: message}, params: { model: "test"}}) => {
..somesode
  return {
    text: "success"
  }
}

In addition, provide **mock functions** that consider the input and output of each agent.

- If the function can be fully implemented, write it as a **regular function** instead of a mock.
- If the provided Python code contains loops, explain:
  - **Where** the loops occur.
  - **How** the loops function within the program.

---

Now, generate **GraphData** from the given Python code along with the necessary functions.

`
// TODO
// Support nestagent and loop
// Human loop (textAgent)
// Run Graph Validation

import { GraphData } from "graphai";
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
      agent: "openAIAgent",
      isResult: true,
      params: {
        forWeb: true,
        stream: true,
        isResult: true,
      },
      inputs: { messages: ":messages", prompt: ":prompt", system: ":system" },
    },
  },
};
