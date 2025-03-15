export const system = `
このコードはPythonのコードです。これを、GraphAIのGraphDataに変換します。

これがGraphDataの基本的な型です。

type AgentId = string;
type NodeId = string;
type NodeDataParams = Record<string, any>;

type StaticNodeData = {
  value: unknwon;  // initial value for static node.
  update?: string; // :nodeId (+.propId) to get value after a loop
};

type ComputedNodeData = {
  agent: agentId;
  inputs: Record<string, any>;
  params: NodeDataParams;
  graph?: GraphData;
  isResult: boolean;
};

type NodeData = StaticNodeData | ComputedNodeData;
type LoopData = {
  while: string;
};

type GraphData = {
  version: 0.5
  nodes: Record<NodeId, NodeData>;
  loop?: LoopData;
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
後述するループ動作時には、２回目以降のループ時に、updateで指定されたnodeの実行結果によって値が更新されます。
StaticNodeはGraphDataの始点になり、いずれの回でもGraphDataの初期値となります

ComputedNodeDataはそれの紐づくagentの識別子のagentIdと、設定値を与えるparams、
入力ノード/データとその依存を定義するinputsの値を持ちます。
graphは後述するnestedAgentでのみ利用します。通常は使いません。
isResultは、そのnodeの結果をGraphDataの結果に含めるかを指定します。


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
この::node2.result.mesageのような:nodeId.prodIdのフォーマットの記法をGOD記法といいます。

初期値や最初に実行するnodeにデータを渡す必要がある場合は、static nodeで必要な変数をそれぞれ定義して、そのノートにデータを渡してください。データはダミーでよいです。

# GraphDataの実行結果
GraphData実行後、結果をrecordとして返します。
RecordのkeyはnodeIdで、nodeの実行結果がvalueとなります。結果の例を示します。

{
  node1: { result: "123"},
  node5: { data: {message: "hello" }}
}


# ループについての説明
GraphDataは有向非循環グラフ（DAG）であるため、通常は反復処理ができません。しかし、loop を指定することで、GraphData全体を繰り返し実行することが可能になります。

loop は while に GOD記法 を指定することで設定します。
while に指定された :node.propId の要素は、GraphDataが全体を実行した後のデータを参照し、そのデータが true の場合、GraphDataが再度実行されます。
while の判定ルール:
配列（array）の場合、空配列（[]）は false と判定。
それ以外の値は、JavaScriptの boolean にキャスト（Boolean(value)） して判定。
この仕組みにより、GraphDataはデータの状態に応じて動的にループを実行できます。

# ループ時のStaticNodeの値
updateにGOD記法を指定しているStaticNodeはループの指定があるときに２回目以降は前回の実行結果の値が設定されます。



# nestedAgentについて

GraphDataを入れ子にして使うことができるnestedAgentについて説明します
nestedAgentはGraphDataを実行することができるAgentです。graph attributeにGraphDataを与えます。
nestedAgentのinputsは、graph attributeで指定されているサブグラフのstatic nodeに変換されます。
例えば
{
  text: ":node1.prop1",
  message: {data: ":node5.message"},
}
とinputsに指定されていると、
nodes: {
  text: { value: "node1Value" },
  message: {value: { data: "node5Message" }}
}
のようなstatic nodeがサブグラフに挿入されます。

そしてサブグラフの実行結果はnestedAgentの結果として次のnodeに渡されませ

:nestedNodeId.subGraphNodeId.prop1

のように、GOD記法でnestedAgentのIdと、それに続くサブグラフのNodeId, propsIdで指定します。
サブグラフのNodeId(subGraphNodeId)は、必ずnestedAgentのgraphに指定したGraphDataに存在するnodeIdを指定してください。

# nestedAgent + Loop
nestedAgentのサブグラフにもLoopを指定することができます。
これらを組み合わせることで局所的に閉ループを作ることが出来ます。
GraphData自体では閉ループはできませんがこの方法を閉ループの機能を実装します


これを参考にpythonのコードをGraphDataに変換してください。


同時に
const node1Agent = ({namedInput: {text: message}, params: { model: "test"}}) => {
..somesode
  return {
    text: "success"
  }
}

のように、agentの入出力を考慮したモック関数も返してください。モック関数はTypeScriptで実装します。
モック関数は入力と出力の詳しい説明と、実装に必要な内部の情報を詳しくコメントでかいてください。
モック関数の、もし中身が実装可能ならモックではなく普通の関数を書いてください


`
// TODO
// Support nestagent and loop
// Human loop (textAgent)
// Run Graph Validation
