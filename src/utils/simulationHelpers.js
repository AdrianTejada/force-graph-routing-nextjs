function initializeGraph(simulation, d3, GRAPH_CONFIG) {
  const {
    LINK_DISTANCE,
    LINK_STRENGTH,
    MANY_BODY_FORCE,
    X_FORCE,
    Y_FORCE
  } = GRAPH_CONFIG;

  // simulation is provided to us by a useRef hook, cence the .current property
  simulation.current = d3
    .forceSimulation()
    .force(
      "link",
      d3
        .forceLink()
        .id((link) => link.id)
        .distance(LINK_DISTANCE)
        .strength(LINK_STRENGTH)
    )
    .force(
      "charge",
      d3
        .forceManyBody()
        .strength(MANY_BODY_FORCE)
    )
    .force(
      "x",
      d3
        .forceX()
        .strength(X_FORCE)
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(Y_FORCE)
    )
    .alphaTarget(0);
}

function updateGraph(simulation, d3, nodes, links, currentPath, GRAPH_CONFIG) {
  const {
    CURRENT_NODE_RADIUS,
    DEFAULT_NODE_RADIUS,
    LINK_STROKE_WIDTH,
    LABEL_X,
  } = GRAPH_CONFIG;

  // passing in nodes and links into the simulation instance
  simulation.current.nodes(nodes);
  simulation.current.force("link").links(links);
  simulation.current.alpha(1).restart();

  // selecting SVG elements and binding data with .data()
  const nodeSelection = d3.selectAll("circle").data(nodes);
  const linkSelection = d3.selectAll("line").data(links);
  const labelSelection = d3.selectAll("text").data(nodes);

  // styling our selections
  nodeSelection
    .attr("fill", (node) => (node.route === currentPath ? "#333" : "#e1e1e1"))
    .attr("r", (node) =>
      node.route === currentPath ? CURRENT_NODE_RADIUS : DEFAULT_NODE_RADIUS
    );

  linkSelection
    .attr("stroke", "#e1e1e1")
    .attr("stroke-width", LINK_STROKE_WIDTH);

  labelSelection.attr("fill", "#000").style("font-size", ".75em");

  // "tick" event that updates positions of nodes and links as the simulation iterates
  simulation.current.on("tick", (d) => {
    nodeSelection.attr("cx", (node) => node.x).attr("cy", (node) => node.y);

    linkSelection
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    labelSelection
      .attr("x", (node) => node.x + LABEL_X)
      .attr("y", (node) => node.y);
  });
}

export { 
  initializeGraph, 
  updateGraph 
};