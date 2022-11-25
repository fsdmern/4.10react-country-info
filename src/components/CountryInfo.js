import React from 'react';
import {useState, useEffect} from 'react';
import CountryCard from './CountryCard';
import './countryinfo.css'

function CountryInfo() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setIsLoaded(true);
      setCountries(data);
      const errMsg = (error) => {
        setIsLoaded(true);
        setError(error);
      };
    }
    getData();
  }, []);
  

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = countries.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData)
    } else {
        setFilteredResults(countries)
    }
  };


  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>Loading...</>;
  } else {
    return (
      <div>
        <h2>Country Information Portal</h2>
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search..."
              onChange={(e) => searchItems(e.target.value)}
            />
          </label>
        </div>
        <div className="country-wrapper">
          {(filteredResults.length > 0 ? filteredResults : countries).map(
            (cinfo, index) => (
              <CountryCard
                key={index}
                flag={cinfo.flags.png}
                name={cinfo.name.common}
                capital={cinfo.capital}
                region={cinfo.region}
                population={cinfo.population}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default CountryInfo;
