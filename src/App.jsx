import './App.css';
import axios from "axios";
import world_map from "./assets/world_map.png";
import React, {useState} from "react";
import continentColorSetter from "./helpers/continentColorSetter.js";

function App() {

    const [countryData, setCountryData] = useState({});

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

    console.log(countryData);

    return (
        <>
            <header>
                <img src={world_map} alt="world map"/>
            </header>
            <main>
                <h1>World Regions</h1>

                {Object.keys(countryData).length === 0 &&
                    <button onClick={getCountries} id="country_button">Click to load all countries</button>
                }

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
