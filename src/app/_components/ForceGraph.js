"use client";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

import nodes from "@/data/nodes";
import links from "@/data/links";

import { initializeGraph, updateGraph, addD3EventHandlers } from "@/utils/simulationHelpers";

import Circles from "./Circles";
import Lines from "./Lines";
import Labels from "./Labels";

export default function ForceGraph({ width = 250, height = 250 }) {
  const router = useRouter();
  const simulation = useRef();
	const currentPath = usePathname();

  const handleRoute = (node) => {
    router.push(node.route);
  };

  useEffect(() => {
    initializeGraph(simulation);
  }, []);

  useEffect(() => {
    updateGraph(simulation, nodes, links, currentPath);
  }, [currentPath]);

  useEffect(() => {
    addD3EventHandlers(simulation, currentPath)
  }, [currentPath]);

  return (
    <svg
      className={`w-[${width}px] h-[${height}px] bg-white drop-shadow-lg rounded-md`}
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
    >
      <Lines links={links} />
      <Circles nodes={nodes} handleRoute={handleRoute} />
      <Labels nodes={nodes} />
    </svg>
  );
}