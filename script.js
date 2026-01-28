(function () {
  d3.xml("world.svg")
    .mimeType("image/svg+xml")
    .get(function (error, xml) {
      document.querySelector("#svg").appendChild(xml.documentElement);

      // Make ocean and world background transparent
      d3.select("#Ocean").attr("fill", "none");
      d3.select("#World").attr("fill", "none");

      // Set all country paths to yellow with transparent 2px borders
      d3.selectAll("path").each(function () {
        const id = d3.select(this).attr("id");
        if (id !== "Ocean") {
          d3.select(this).attr("fill", "#ffce5d");
          d3.select(this).attr("stroke", "#198786");
          d3.select(this).attr("stroke-width", "1");
        }
      });

      d3.selectAll("g").on("mouseover", function () {
        d3.selectAll(".hover").classed("hover", false);
        d3.selectAll("#" + this.id).classed("hover", true);
        displayCountryName(this.id);
      });

      d3.selectAll("path").on("mouseover", function () {
        d3.selectAll(".hover").classed("hover", false);
        const parent = this.parentNode;
        const parentId = parent ? parent.id : null;
        // If parent is a country group (2-letter code), highlight the group
        if (parentId && /^[A-Z]{2}$/.test(parentId)) {
          d3.selectAll("#" + parentId).classed("hover", true);
          displayCountryName(parentId);
        } else {
          d3.selectAll("#" + this.id).classed("hover", true);
          displayCountryName(this.id);
        }
      });

      const flattenedCountries = countries.flatMap((country) =>
        country.split(" ")
      );
      flattenedCountries.forEach(function (country) {
        d3.select("#" + country).style("fill", "#c0442c");
        d3.select("#" + country + " path").style("fill", "#c0442c");
      });

      d3.select("#number-countries").text(countries.length);
      d3.select("#globe-percent").text(
        Math.round((100 * countries.length) / 193) + "%"
      );
    });
})();

const countryNames = {
  BR: "Brazil",
  EC: "Ecuador",
  CL: "Chile",
  AR: "Argentina",
  UY: "Uruguay",
  PY: "Paraguay",
  PE: "Peru",
  BO: "Bolivia",
  CO: "Colombia",
  US: "United States",
  IE: "Ireland",
  GB: "United Kingdom",
  FR: "France",
  IT: "Italy",
  NL: "Netherlands",
  CZ: "Czech Republic",
  BE: "Belgium",
  ES: "Spain",
  DE: "Germany",
  HT: "Haiti",
  ZA: "South Africa",
  UG: "Uganda",
  MZ: "Mozambique",
  NG: "Nigeria",
  IN: "India",
  TH: "Thailand",
  ID: "Indonesia",
  TR: "Turkey",
  HR: "Croatia",
  HU: "Hungary",
  PT: "Portugal",
  AT: "Austria",
  MC: "Monaco",
  CH: "Switzerland",
  RS: "Serbia",
  ME: "Montenegro",
  AL: "Albania",
  BA: "Bosnia and Herzegovina",
  GR: "Greece",
  SG: "Singapore",
  VN: "Vietnam",
  AF: "Afghanistan",
  AO: "Angola",
  AM: "Armenia",
  AU: "Australia",
  AZ: "Azerbaijan",
  BD: "Bangladesh",
  BY: "Belarus",
  BZ: "Belize",
  BJ: "Benin",
  BT: "Bhutan",
  BW: "Botswana",
  BN: "Brunei",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CF: "Central African Republic",
  TD: "Chad",
  CN: "China",
  CG: "Congo",
  CD: "Democratic Republic of the Congo",
  CR: "Costa Rica",
  CI: "Ivory Coast",
  CU: "Cuba",
  CY: "Cyprus",
  DK: "Denmark",
  DJ: "Djibouti",
  DO: "Dominican Republic",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FJ: "Fiji",
  FI: "Finland",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  GH: "Ghana",
  GT: "Guatemala",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HN: "Honduras",
  IS: "Iceland",
  IR: "Iran",
  IQ: "Iraq",
  IL: "Israel",
  JM: "Jamaica",
  JP: "Japan",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Laos",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LT: "Lithuania",
  LU: "Luxembourg",
  MK: "North Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  ML: "Mali",
  MR: "Mauritania",
  MX: "Mexico",
  MD: "Moldova",
  MN: "Mongolia",
  MA: "Morocco",
  MM: "Myanmar",
  NA: "Namibia",
  NP: "Nepal",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PA: "Panama",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PL: "Poland",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SN: "Senegal",
  SL: "Sierra Leone",
  SK: "Slovakia",
  SI: "Slovenia",
  SO: "Somalia",
  SS: "South Sudan",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SE: "Sweden",
  SY: "Syria",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TL: "Timor-Leste",
  TG: "Togo",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TM: "Turkmenistan",
  AE: "United Arab Emirates",
  UA: "Ukraine",
  VE: "Venezuela",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};

function displayCountryName(countryId) {
  const countryName = countryNames[countryId] || countryId.replace(/_/g, " ");
  d3.select("#country-name").text(countryName);
}
