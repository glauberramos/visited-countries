$(function() {
  d3.xml("worldmap.svg", "image/svg+xml", function(xml) {
    $("#svg").html(xml.documentElement);

    d3.selectAll("path").each(function() {
      $(this).attr("fill", "#ffce5d");
    });

    d3.selectAll("g").on("mouseover", function() {
      d3.selectAll(".hover").classed("hover", false);
      d3.selectAll("#" + this.id).classed("hover", true);
    });

    d3.selectAll("path").on("mouseover", function() {
      d3.selectAll(".hover").classed("hover", false);
      d3.selectAll("#" + this.id).classed("hover", true);
    });

    $(countries).each(function(index, country) {
      if (country.indexOf(" ") > -1) {
        country.split(" ").forEach(function(area) {
          $("#" + area).css("fill", "#c0442c");
          $("#" + area + " path").css("fill", "#c0442c");
        });
      }

      $("#" + country).css("fill", "#c0442c");
      $("#" + country + " path").css("fill", "#c0442c");
    });

    $("#number-countries").text(countries.length);
    $("#globe-percent").text(Math.round((100 * countries.length) / 193) + "%");

    function parseId(id) {
      return id.replace(/_/g, "  ").toUpperCase();
    }

    function donnutChart() {
      var dataset = {
        apples: [countries.length, 193 - countries.length]
      };

      var width = 460,
        height = 300,
        radius = Math.min(width, height) / 2;

      var color = ["#EA2E49", "#77C4D3"];

      var pie = d3.layout.pie().sort(null);

      var arc = d3.svg
        .arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

      var svg = d3
        .select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var path = svg
        .selectAll("path")
        .data(pie(dataset.apples))
        .enter()
        .append("path")
        .attr("fill", function(d, i) {
          return color[i];
        })
        .attr("d", arc);
    }

    donnutChart();
  });
});
