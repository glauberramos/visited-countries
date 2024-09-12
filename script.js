(function () {
  d3.xml("worldmap.svg")
    .mimeType("image/svg+xml")
    .get(function (error, xml) {
      document.querySelector("#svg").appendChild(xml.documentElement);

      d3.selectAll("path").each(function () {
        d3.select(this).attr("fill", "#ffce5d");
      });

      d3.selectAll("g").on("mouseover", function () {
        d3.selectAll(".hover").classed("hover", false);
        d3.selectAll("#" + this.id).classed("hover", true);
      });

      d3.selectAll("path").on("mouseover", function () {
        d3.selectAll(".hover").classed("hover", false);
        d3.selectAll("#" + this.id).classed("hover", true);
      });

      countries.map(function (country) {
        d3.select("#" + country).style("fill", "#c0442c");
        d3.select("#" + country + " path").style("fill", "#c0442c");
      });

      d3.select("#number-countries").text(countries.length);
      d3.select("#globe-percent").text(
        Math.round((100 * countries.length) / 193) + "%"
      );
    });
})();
