(function () {
  const self = {};

  function dragstarted(d) {
    d3.select(this).raise().classed('active', true);
  }

  function dragged(d) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
  }

  function dragended(d) {
    d3.select(this).classed('active', false);
  }

  self.dragstarted = dragstarted;
  self.dragged = dragged;
  self.dragended = dragstarted;
  echo.animation = self;
}());
