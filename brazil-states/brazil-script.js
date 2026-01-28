const stateNames = {
  BRAC: "Acre",
  BRAL: "Alagoas",
  BRAP: "Amapá",
  BRAM: "Amazonas",
  BRBA: "Bahia",
  BRCE: "Ceará",
  BRDF: "Distrito Federal",
  BRES: "Espírito Santo",
  BRGO: "Goiás",
  BRMA: "Maranhão",
  BRMT: "Mato Grosso",
  BRMS: "Mato Grosso do Sul",
  BRMG: "Minas Gerais",
  BRPA: "Pará",
  BRPB: "Paraíba",
  BRPR: "Paraná",
  BRPE: "Pernambuco",
  BRPI: "Piauí",
  BRRJ: "Rio de Janeiro",
  BRRN: "Rio Grande do Norte",
  BRRS: "Rio Grande do Sul",
  BRRO: "Rondônia",
  BRRR: "Roraima",
  BRSC: "Santa Catarina",
  BRSP: "São Paulo",
  BRSE: "Sergipe",
  BRTO: "Tocantins",
};

(function () {
  d3.xml("br.svg")
    .mimeType("image/svg+xml")
    .get(function (error, xml) {
      if (error) throw error;

      document.querySelector("#svg").appendChild(xml.documentElement);

      // Fix SVG sizing for proper display
      const svg = d3.select("#svg svg");
      svg.attr("width", "100%");
      svg.attr("height", "100%");
      svg.attr("viewBox", "0 0 1000 912");
      svg.attr("preserveAspectRatio", "xMidYMid meet");

      d3.selectAll("path").each(function () {
        d3.select(this).attr("fill", "#e8dcc8");
        d3.select(this).attr("stroke", "#1a3a3a");
        d3.select(this).attr("stroke-width", "0.5");
      });

      const tooltip = d3.select("#country-tooltip");

      d3.selectAll("path").on("mouseover", function () {
        d3.selectAll(".hover").classed("hover", false);
        d3.select(this).classed("hover", true);
        showTooltip(this.id, d3.event);
      }).on("mousemove", function () {
        moveTooltip(d3.event);
      }).on("mouseout", function () {
        d3.selectAll(".hover").classed("hover", false);
        hideTooltip();
      });

      function showTooltip(stateId, event) {
        const stateName = stateNames[stateId] || stateId;
        tooltip.text(stateName);
        tooltip.classed("visible", true);
        if (event) {
          moveTooltip(event);
        }
      }

      function moveTooltip(event) {
        const tooltipNode = tooltip.node();
        const tooltipWidth = tooltipNode.offsetWidth;
        const tooltipHeight = tooltipNode.offsetHeight;
        tooltip
          .style("left", (event.clientX - tooltipWidth / 2) + "px")
          .style("top", (event.clientY - tooltipHeight - 15) + "px");
      }

      function hideTooltip() {
        tooltip.classed("visible", false);
      }

      brazilStates.forEach(function (state) {
        d3.select("#BR" + state).style("fill", "#e07a5f");
      });

      d3.select("#number-states").text(brazilStates.length);
      d3.select("#brazil-percent").text(
        Math.round((100 * brazilStates.length) / 27) + "%"
      );
    });
})();
