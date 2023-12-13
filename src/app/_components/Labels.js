"use client";

export default function Labels({ nodes }) {
  return nodes.map((node) => (
    <text alignmentBaseline="middle" key={node.id}>
      {node.id}
    </text>
  ));
}