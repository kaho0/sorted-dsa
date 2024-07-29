import { useEffect, useState } from "react";
import Country from "./country";
import "./countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleVisitedCountry = (country) => {
    setVisitedCountries((prev) =>
      prev.includes(country.cca3)
        ? prev.filter((c) => c !== country.cca3)
        : [...prev, country.cca3]
    );
  };

  return (
    <div>
      <h3>Countries: {countries.length}</h3>
      <div>
        <h4>Visited countries: {visitedCountries.length}</h4>
      </div>
      <div className="country-container">
        {countries.map((country) => (
          <Country
            key={country.cca3}
            handleVisitedCountry={() => handleVisitedCountry(country)}
            visited={visitedCountries.includes(country.cca3)}
            country={country}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
