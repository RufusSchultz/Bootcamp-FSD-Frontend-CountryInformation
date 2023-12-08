function continentColorSetter(continent){
    switch (continent) {
        case "Africa":
            return "africa";
            break;
        case "Antarctica":
            return "antarctica";
            break;
        case "Asia":
            return "asia";
            break;
        case "Europe":
            return "europe";
            break;
        case "North America":
            return "north_america";
            break;
        case "South America":
            return "south_america";
            break;
        case "Oceania":
            return "oceania";
            break;
        default:
            return "";
    }
}

export default continentColorSetter;