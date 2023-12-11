import './App.css';
import axios from "axios";
import world_map from "./assets/world_map.png";
import React, {useState} from "react";
import continentColorSetter from "./helpers/continentColorSetter.js";
import countryInformationText from "./helpers/countryInformationText.jsx";

function App() {

    const [countryData, setCountryData] = useState({});
    const [searchResult, setSearchResult] = useState({});
    const [countryQuery, setCountryQuery] = useState("");
    const [queryError, setQueryError] = useState("");

    async function getCountries() {
        try {
            const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,continents");
            result.data.sort((a, b) => {
                return a.population - b.population;
            })
            setCountryData(result);
        } catch (e) {
            console.error(e);
        }
    }

    async function getCountry(e) {
        e.preventDefault();
        setQueryError("");
        setSearchResult("");
        try {
            const result = await axios.get(`https://restcountries.com/v3.1/name/${countryQuery}`);
            setSearchResult(result.data.slice(0, 1));
            setCountryQuery("");
        } catch (error) {
            setQueryError(`Oops, ${countryQuery} doesn't exist. Please try again.`);
            setCountryQuery("");
        }
    }

    return (
        <>
            <header>
                <img src={world_map} alt="world map"/>
            </header>
            <main>
                <h1>World Regions</h1>

                <h2>Search country information</h2>

                <form onSubmit={getCountry} id="search_form">
                    <input
                        type="text"
                        id="search_input"
                        value={countryQuery}
                        onChange={(e) => setCountryQuery(e.target.value)}
                    />
                    <button id="search_button" type="submit">Search</button>
                </form>

                {queryError.length > 0 && <article className="search_result_card" id="error_card">{queryError}</article>}

                {Object.keys(searchResult).length > 0 && <article className="search_result_card">
                    {searchResult.map((country) => {
                            return (
                                <li key={country.name.common}>
                                    <div className="country_card_flag_and_name">
                                    <span>
                                        <img src={country.flags.svg} alt={country.name.common}/>
                                    </span>
                                        <h1>{country.name.common}</h1>
                                    </div>
                                    {countryInformationText(country)}
                                </li>
                            )
                    })}
                </article>
                }

                <h2>All countries by population count. Low to high.</h2>

                {Object.keys(countryData).length === 0 && <button onClick={getCountries} id="country_button">Click here</button>}

                {Object.keys(countryData).length > 0 && <ul className="country_card_list">
                    {countryData.data.map((countries) => {
                        return (
                            <li className="country_card" key={countries.name.common}>
                                <div className="country_card_flag_and_name">
                            <span>
                                <img src={countries.flags.svg} alt={countries.name.common}/>
                            </span>
                                    <h4 className={continentColorSetter(countries.continents[0])}>{countries.name.common}</h4>
                                </div>
                                <span>Has a population of {countries.population} people.</span>
                            </li>
                        )
                    })}
                </ul>
                }
            </main>
        </>
    )
}

export default App
