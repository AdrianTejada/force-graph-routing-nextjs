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

export { initializeGraph };