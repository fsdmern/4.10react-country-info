import React from 'react';
import './countryinfo.css';

function CountryCard(props) {
  return (
    <div className="card">
      <div>
        <img src={props.flag} alt={`${props.name}'s flag`} />
      </div>
      <div className="card-detail">
        <div className="c-name">{props.name}</div>
        <div className="oth-det">{props.capital}</div>
        <div className="oth-det">{props.region}</div>
        <div className="oth-det">{props.population}</div>
      </div>
    </div>
  );
}

export default CountryCard;
