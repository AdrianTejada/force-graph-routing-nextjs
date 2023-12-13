"use client";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

import * as d3 from "d3";

import nodes from "@/data/nodes";
import links from "@/data/links";
import GRAPH_CONFIG from "@/data/graph.config";

import { initializeGraph } from "@/utils/simulationHelpers";

import Circles from "./Circles";
import Lines from "./Lines";
import Labels from "./Labels";

export default function ForceGraph({ width = 250, height = 250 }) {
  const router = useRouter();
  const simulation = useRef();

  const handleRoute = (route) => {
    router.push(route);
  };

  useEffect(() => {
    initializeGraph(simulation, d3, GRAPH_CONFIG);
  }, []);

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