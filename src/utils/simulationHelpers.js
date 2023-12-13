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

function addD3EventHandlers(simulation, d3, currentPath, GRAPH_CONFIG) {
  const {
    CURRENT_NODE_RADIUS,
    DEFAULT_NODE_RADIUS,
    LINK_STROKE_WIDTH,
    HOVER_NODE_RADIUS,
    TRANSITION_LENGTH,
  } = GRAPH_CONFIG;

  // selecting SVG elements
  const nodeSelection = d3.selectAll("circle");
  const linkSelection = d3.selectAll("line");
  const labelSelection = d3.selectAll("text");

  // drag event
  nodeSelection.call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

  function dragstarted(event) {
    if (!event.active) simulation.current.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.current.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // hover event and styling logic
  nodeSelection.on("mouseover", (event, currentNode) => {
    d3.select(event.target).style("cursor", "pointer");

    nodeSelection
      .transition(TRANSITION_LENGTH)
      .attr("fill", (node) => (node.id === currentNode.id ? "#333" : "#e1e1e1"))
      .attr("r", (node) =>
        node.id === currentNode.id ? HOVER_NODE_RADIUS : DEFAULT_NODE_RADIUS
      );

    linkSelection
      .transition(TRANSITION_LENGTH)
      .attr("stroke", (link) =>
        currentNode.id === link.target.id
          ? "#505050"
          : currentNode.id === link.source.id
          ? "#505050"
          : "#e8e8e8"
      );

    labelSelection
      .transition(TRANSITION_LENGTH)
      .style("font-size", (node) =>
        currentNode.id === node.id ? ".9em" : ".75em"
      );
  });

  // mouse out event and styling logic
  nodeSelection.on("mouseout", (event) => {
    d3.select(event.target).style("cursor", "pointer");

    nodeSelection
      .transition()
      .attr("fill", (node) => (node.route === currentPath ? "#333" : "#e1e1e1"))
      .attr("r", (node) =>
        node.route === currentPath ? CURRENT_NODE_RADIUS : DEFAULT_NODE_RADIUS
      );

    linkSelection
      .transition()
      .attr("stroke", "#e1e1e1")
      .attr("stroke-width", LINK_STROKE_WIDTH);

    labelSelection
      .transition()
      .attr("fill", "#000")
      .style("font-size", ".75em");
  });
}

export { 
  initializeGraph, 
  updateGraph,
  addD3EventHandlers
};