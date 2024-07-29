import { useState, useEffect } from "react";
import "./country.css";

export default function Country({ country, handleVisitedCountry, visited }) {
  const {
    name,
    flags,
    area,
    independent,
    cca2,
    ccn3,
    cca3,
    status,
    unMember,
    currencies,
  } = country;
  const currency = currencies ? Object.values(currencies)[0] : {};
  const [visitedState, setVisitedState] = useState(visited);

  useEffect(() => {
    setVisitedState(visited);
  }, [visited]);

  const handleVisited = () => {
    setVisitedState(!visitedState);
    handleVisitedCountry();
  };

  return (
    <div className={`box ${visitedState ? "visited" : ""}`}>
      <img src={flags.png} alt={`Flag of ${name.common}`} />
      <h3>Name: {name.common}</h3>
      <h4>Official Name: {name.official}</h4>
      {name.nativeName && name.nativeName.eng && (
        <>
          <h4>
            Native Official Name (English): {name.nativeName.eng.official}
          </h4>
        </>
      )}

      <div className="country-details">
        <div className="column">
          <h4>Area: {area}</h4>
          <p>Independent: {independent ? "Yes" : "No"}</p>
          <p>
            <small>CCA2: {cca2}</small>
          </p>
          <p>
            <small>CCN3: {ccn3}</small>
          </p>
          <p>
            <small>CCA3: {cca3}</small>
          </p>
          <p>Status: {status}</p>
          <p>UN Member: {unMember ? "Yes" : "No"}</p>
          {currency && (
            <>
              <p>Currency Name: {currency.name}</p>
              <p>Currency Symbol: {currency.symbol}</p>
            </>
          )}
        </div>
      </div>
      <button onClick={handleVisited}>
        {visitedState ? "Visited" : "Mark as Visited"}
      </button>
      <br />
      {visitedState ? "I have visited this country" : "I want to visit"}
    </div>
  );
}
