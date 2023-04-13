import { useState } from "react";

const getCountryCode = (country) => {
  let countryCode = "";
  switch (country) {
    case "United States Of America":
      countryCode = "US";
      break;
    case "Andorra":
      countryCode = "AD";
      break;
    case "Anguilla":
      countryCode = "AI";
      break;
    case "Argentina":
      countryCode = "AR";
      break;
    case "Australia":
      countryCode = "AU";
      break;
    case "Austria":
      countryCode = "AT";
      break;
    case "Azerbaijan":
      countryCode = "AZ";
      break;
    case "Bahamas":
      countryCode = "BS";
      break;
    case "Bahrain":
      countryCode = "BH";
      break;
    case "Barbados":
      countryCode = "BB";
      break;
    case "Belgium":
      countryCode = "BE";
      break;
    case "Bermuda":
      countryCode = "BM";
      break;
    case "Brazil":
      countryCode = "BR";
      break;
    case "Bulgaria":
      countryCode = "BG";
      break;
    case "Canada":
      countryCode = "CA";
      break;
    case "Chile":
      countryCode = "CL";
      break;
    case "China":
      countryCode = "CN";
      break;
    case "Colombia":
      countryCode = "CO";
      break;
    case "Costa Rica":
      countryCode = "CR";
      break;
    case "Croatia":
      countryCode = "HR";
      break;
    case "Cyprus":
      countryCode = "CY";
      break;
    case "Czech Republic":
      countryCode = "CZ";
      break;
    case "Denmark":
      countryCode = "DK";
      break;
    case "Dominican Republic":
      countryCode = "DO";
      break;
    case "Ecuador":
      countryCode = "EC";
      break;
    case "Estonia":
      countryCode = "EE";
      break;
    case "Faroe Islands":
      countryCode = "FO";
      break;
    case "Finland":
      countryCode = "FI";
      break;
    case "France":
      countryCode = "FR";
      break;
    case "Georgia":
      countryCode = "GE";
      break;
    case "Germany":
      countryCode = "DE";
      break;
    case "Ghana":
      countryCode = "GH";
      break;
    case "Gibraltar":
      countryCode = "GI";
      break;
    case "Great Britain":
      countryCode = "GB";
      break;
    case "Greece":
      countryCode = "GR";
      break;
    case "Hong Kong":
      countryCode = "HK";
      break;
    case "Hungary":
      countryCode = "HU";
      break;
    case "Iceland":
      countryCode = "IS";
      break;
    case "India":
      countryCode = "IN";
      break;
    case "Ireland":
      countryCode = "IE";
      break;
    case "Israel":
      countryCode = "IL";
      break;
    case "Italy":
      countryCode = "IT";
      break;
    case "Jamaica":
      countryCode = "JM";
      break;
    case "Japan":
      countryCode = "JP";
      break;
    case "Korea, Republic of":
      countryCode = "KR";
      break;
    case "Latvia":
      countryCode = "LV";
      break;
    case "Lebanon":
      countryCode = "LB";
      break;
    case "Lithuania":
      countryCode = "LT";
      break;
    case "Luxembourg":
      countryCode = "LU";
      break;
    case "Malaysia":
      countryCode = "MY";
      break;
    case "Malta":
      countryCode = "MT";
      break;
    case "Mexico":
      countryCode = "MX";
      break;
    case "Monaco":
      countryCode = "MC";
      break;
    case "Montenegro":
      countryCode = "ME";
      break;
    case "Morocco":
      countryCode = "MA";
      break;
    case "Netherlands":
      countryCode = "NL";
      break;
    case "Netherlands Antilles":
      countryCode = "AN";
      break;
    case "New Zealand":
      countryCode = "NZ";
      break;
    case "Northern Ireland":
      countryCode = "ND";
      break;
    case "Norway":
      countryCode = "NO";
      break;
    case "Peru":
      countryCode = "PE";
      break;
    case "Poland":
      countryCode = "PL";
      break;
    case "Portugal":
      countryCode = "PT";
      break;
    case "Romania":
      countryCode = "RO";
      break;
    case "Russian Federation":
      countryCode = "RU";
      break;
    case "Saint Lucia":
      countryCode = "LC";
      break;
    case "Saudi Arabia":
      countryCode = "SA";
      break;
    case "Serbia":
      countryCode = "RS";
      break;
    case "Singapore":
      countryCode = "SG";
      break;
    case "Slovakia":
      countryCode = "SK";
      break;
    case "Slovenia":
      countryCode = "SI";
      break;
    case "South Africa":
      countryCode = "ZA";
      break;
    case "Spain":
      countryCode = "ES";
      break;
    case "Sweden":
      countryCode = "SE";
      break;
    case "Switzerland":
      countryCode = "CH";
      break;
    case "Taiwan":
      countryCode = "TW";
      break;
    case "Trinidad and Tobago":
      countryCode = "TT";
      break;
    case "Turkey":
      countryCode = "TR";
      break;
    case "Ukraine":
      countryCode = "UA";
      break;
    case "United Arab Emirates":
      countryCode = "AE";
      break;
    case "Uruguay":
      countryCode = "UY";
      break;
    case "Venezuela":
      countryCode = "VE";
      break;
    default:
      countryCode = "";
  }

  return countryCode;
};

const getGenreId = (genre) => {
  let genreId = "";

  switch (genre) {
    case "Alternative":
      genreId = "KnvZfZ7vAvv";
      break;
    case "Ballads/Romantic":
      genreId = "KnvZfZ7vAve";
      break;
    case "Blues":
      genreId = "KnvZfZ7vAvd";
      break;
    case "Chanson Francaise":
      genreId = "KnvZfZ7vAvA";
      break;
    case "Children's Music":
      genreId = "KnvZfZ7vAvk";
      break;
    case "Classical":
      genreId = "KnvZfZ7vAeJ";
      break;
    case "Country":
      genreId = "KnvZfZ7vAv6";
      break;
    case "Dance/Electronic":
      genreId = "KnvZfZ7vAvF";
      break;
    case "Folk":
      genreId = "KnvZfZ7vAva";
      break;
    case "Hip-Hop/Rap":
      genreId = "KnvZfZ7vAv1";
      break;
    case "Holiday":
      genreId = "KnvZfZ7vAvJ";
      break;
    case "Jazz":
      genreId = "KnvZfZ7vAvE";
      break;
    case "Latin":
      genreId = "KnvZfZ7vAJ6";
      break;
    case "Medieval/Renaissance":
      genreId = "KnvZfZ7vAvI";
      break;
    case "Metal":
      genreId = "KnvZfZ7vAvt";
      break;
    case "New Age":
      genreId = "KnvZfZ7vAvn";
      break;
    case "Other":
      genreId = "KnvZfZ7vAvl";
      break;
    case "Pop":
      genreId = "KnvZfZ7vAev";
      break;
    case "R&B":
      genreId = "KnvZfZ7vAee";
      break;
    case "Reggae":
      genreId = "KnvZfZ7vAed";
      break;
    case "Religious":
      genreId = "KnvZfZ7vAe7";
      break;
    case "Rock":
      genreId = "KnvZfZ7vAeA";
      break;
    case "Undefined":
      genreId = "KnvZfZ7vAe6";
      break;
    case "World":
      genreId = "KnvZfZ7vAeF";
      break;
    default:
      genreId = "";
  }
  return genreId;
};

const countryNames = [
  "United States Of America",
  "Andorra",
  "Anguilla",
  "Argentina",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Barbados",
  "Belgium",
  "Bermuda",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Estonia",
  "Faroe Islands",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Great Britain",
  "Greece",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Korea, Republic of",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Malta",
  "Mexico",
  "Monaco",
  "Montenegro",
  "Morocco",
  "Netherlands",
  "Netherlands Antilles",
  "New Zealand",
  "Northern Ireland",
  "Norway",
  "Peru",
  "Poland",
  "Portugal",
  "Romania",
  "Russian Federation",
  "Saint Lucia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Trinidad and Tobago",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "Uruguay",
  "Venezuela",
];

const genreNames = [
  "Alternative",
  "Ballads/Romantic",
  "Blues",
  "Chanson Francaise",
  "Children's Music",
  "Classical",
  "Country",
  "Dance/Electronic",
  "Folk",
  "Hip-Hop/Rap",
  "Holiday",
  "Jazz",
  "Latin",
  "Medieval/Renaissance",
  "Metal",
  "New Age",
  "Other",
  "Pop",
  "R&B",
  "Reggae",
  "Religious",
  "Rock",
  "Undefined",
  "World",
];

export { getCountryCode, getGenreId, countryNames, genreNames };
