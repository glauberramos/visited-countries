(function () {
  d3.xml("br.svg")
    .mimeType("image/svg+xml")
    .get(function (error, xml) {
      if (error) throw error;

      document.querySelector("#svg").appendChild(xml.documentElement);

      d3.selectAll("path").each(function () {
        d3.select(this).attr("fill", "#ffce5d");
      });

      d3.selectAll("path").on("mouseover", function () {
        d3.selectAll(".hover").classed("hover", false);
        d3.select(this).classed("hover", true);
        displayStateName(this.id);
      });

      brazilStates.forEach(function (state) {
        d3.select("#BR" + state).style("fill", "#c0442c");
      });

      d3.select("#number-states").text(brazilStates.length);
      d3.select("#brazil-percent").text(
        Math.round((100 * brazilStates.length) / 27) + "%"
      );
    });
})();

function displayStateName(stateId) {
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

  const stateName = stateNames[stateId] || stateId;
  d3.select("#country-name").text(stateName);
}
