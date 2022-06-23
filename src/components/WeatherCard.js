import React, { useEffect, useState } from "react";

const WeatherCard = () => {
  const [country, setCountry] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [search, setSearch] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [wind, setWind] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const retrieveData = async () => {
      const response = await fetch(
        "https://goweather.herokuapp.com/weather/" + country
      );
      const data = await response.json();
      setTemperature(data.temperature);
      setDescription(data.description);
      setWind(data.wind);
    };
    retrieveData();
    setLoading(false);
    setSearchCountry(country);
    setCountry("");
  }, [search]);

  const onClick = () => {
    setSearch(!search);
  };
  return (
    <div>
      <div className="card" id="main-card">
        <div className="card-body">
          {loading ? (
            <>
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </>
          ) : (
            <>
              <h1 className="card-title">{searchCountry}</h1>
              <h1 className="card-title display-1 ">{temperature}</h1>
              <h4 className="card-text display-2">{description}</h4>
              <p className="card-text">{wind}</p>
            </>
          )}
        </div>
      </div>
      <div className="input-group mt-5 ">
        <input
          type="text"
          class="form-control"
          placeholder="Country"
          aria-label="country name"
          aria-describedby="basic-addon2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={onClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
