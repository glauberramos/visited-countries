(function() {
  d3.xml('worldmap.svg').mimeType('image/svg+xml').get(function(error, xml) {
    document.querySelector('#svg').appendChild(xml.documentElement);

    d3.selectAll('path').each(function() {
      d3.select(this).attr('fill', '#ffce5d');
    });

    d3.selectAll('g').on('mouseover', function () {
      d3.selectAll('.hover').classed('hover', false);
      d3.selectAll('#' + this.id).classed('hover', true);
    });

    d3.selectAll('path').on('mouseover', function () {
      d3.selectAll('.hover').classed('hover', false);
      d3.selectAll('#' + this.id).classed('hover', true);
    });

    countries.map(function(country) {
      d3.select('#' + country).style('fill', '#c0442c');
      d3.select('#' + country + ' path').style('fill', '#c0442c');
    });

    d3.select('#number-countries').text(countries.length);
    d3.select('#globe-percent').text(Math.round(100 * countries.length / 193) + '%');

    function parseId(id) {
      return id.replace(/_/g, '  ').toUpperCase();
    }

    function donnutChart() {
      var dataset = {
        apples: [countries.length, 193 - countries.length],
      };

      var width = 460,
          height = 300,
          radius = Math.min(width, height) / 2;

      var color = ['#EA2E49', '#77C4D3'];

      var pie = d3.pie()
          .sort(null);

      var arc = d3.arc()
          .innerRadius(radius - 100)
          .outerRadius(radius - 50);

      var svg = d3.select('#pie-chart').append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      var path = svg.selectAll('path')
          .data(pie(dataset.apples))
          .enter().append('path')
          .attr('fill', function(d, i) { return color[i]; })
          .attr('d', arc);
    }

    donnutChart();
  });
})();
