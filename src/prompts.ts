export const system = `
このコードはPythonのコードです。これを、GraphAIのGraphDataに変換します。

これがGraphDataの基本的な型です。

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

GraphDataは、Agentワークフローを有向非循環グラフで定義するデータ形式です。
nodesのRecordとしてNodeを定義します。
NodeIdはユニークなnodeのIdです。
Nodeは２種類あり、
- データのみを持つStatic Node
- TypeScriptで実装されてAgentと紐づくComputeNode
があります。
それぞれのNodeDataの定義はStaticNodeDataとComputedNodeDataです。
StaticNodeDataはその初期値をvalueとして与えます。
ComputedNodeDataはそれの紐づくagentの識別子のagentIdと、設定値を与えるparams、
入力ノード/データとその依存を定義するinputsの値を持ちます。

inputsはRecordで定義され、そのnodeを実行するときに渡される値を定義します。
渡される値は、そのノードの実行を開始する前に実行したNodeの結果を定義します。
inputs: {
  text: ":node1.text",
  data: ":node2.result.message",
}
と定義すると、
node1が{text: string}, node2が{result: {message: string, count: numner}}
の結果を返すエージェントであれば、node1, node2の実行終了をまち
:node1.textにnode1の結果のtextの値、
:node2.result.mesageに、node2のmessageが渡されます。
このようにして、実行順と、渡されるデータを同時にinputsで定義することができます。

初期値や最初に実行するnodeにデータを渡す必要がある場合は、static nodeで必要な変数をそれぞれ定義して、そのノートにデータを渡してください。データはダミーでよいです。


これを参考にpythonのコードをGraphDataに変換してください。


同時に
const node1Agent = ({namedInput: {text: message}, params: { model: "test"}}) => {
..somesode
  return {
    text: "success"
  }
}

のように、agentの入出力を考慮したモック関数も返してください。
モック関数の、もし中身が実装可能ならモックではなく普通の関数を書いてください

もし下のプログラミングにループがある場合は、どこでどういうループをするか文章で教えて下さい。

`
// TODO
// Support nestagent and loop
// Human loop (textAgent)
// Run Graph Validation
