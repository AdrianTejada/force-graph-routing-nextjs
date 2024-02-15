"use client";

export default function Circles({ nodes, handleRoute }) {
  return nodes.map((node) => (
    <circle key={node.id} onClick={() => handleRoute(node)} />
  ));
}
