var countries = [
  'brazil',
  'argentina',
  'usa',
  'ireland',
  'britain',
  'france',
  'italy',
  'belgium',
  'netherlands',
  'czech',
  'spain',
  'germany'
]


$(function() {
  d3.xml('worldmap.svg', 'image/svg+xml', function(xml) {
    $('#map').html(xml.documentElement);

    d3.selectAll('path').each(function() {
      var newId =  $(this).attr('id').replace(/ /g, '_');
      $(this).attr('id', newId).attr('fill', '#77C4D3');
    }).on('mouseover', function () {
      d3.selectAll('.hover').classed('hover', false);
      d3.selectAll('#' + this.id).classed('hover', true);
      $('#country').text(parseId(this.id));
    });

    $(countries).each(function() {
      $('#' + this).css('fill', '#EA2E49');
    });

    $('#number-countries').text(countries.length);
    $('#globe-percent').text(Math.round(100 * countries.length / 193) + '%');

    function parseId(id) {
      return id.replace(/_/g, '  ').toUpperCase();
    }

    function pieChart() {
      var w = 100,
        h = 100,
        r = 50,
        color = ['#EA2E49', '#77C4D3'];

        var data = [{"value": countries.length}, {"value": 193 - countries.length}];
        var vis = d3.select("#pie-chart").append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")"); 
        var arc = d3.svg.arc().outerRadius(r);
        var pie = d3.layout.pie().value(function(d) { return d.value; });
        var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
            
        arcs.append("svg:path").attr("fill", function(d, i) { return color[i]; } ).attr("d", arc);
    }

    pieChart();

  });
});
