import toMillionsRounder from "./toMillionsRounder.js";

function countryInformationText(country) {
    if (country.borders) {
        return (
            <p>
                {country.name.common} is situated in {country.subregion} and the capital
                is {country.capital}.
                It has a population of {toMillionsRounder(country.population)} million people
                and it borders with {country.borders.length} neighbouring countries.
                Websites can be found on {country.tld} domains.
            </p>
        )
    } else {
        return (
            <p>
                {country.name.common} is situated in {country.subregion} and the capital
                is {country.capital}.
                It has a population of {toMillionsRounder(country.population)} million people
                and it has 0 neighbouring countries because it is an island.
                Websites can be found on {country.tld} domains.
            </p>
        )
    }
}

export default countryInformationText;