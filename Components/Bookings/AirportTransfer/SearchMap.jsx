/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./airportTransfer.module.scss";

function Search({ handleSelectedAddress, name }) {

  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address, placeId) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        return extractLocationInfo(address, results);
      })
      .catch((error) => console.error("Error", error));
  };

  async function extractLocationInfo(selectedAddress, results) {
    if (results) {
      const latLng = await getLatLng(results[0]);
      handleSelectedAddress({
        formatedAddress: selectedAddress,
        latLng: latLng,
      });
    }
  }

  var searchOptions = {
    componentRestrictions: { country: "us" },
  };

  return (
    <PlacesAutocomplete
      searchOptions={searchOptions}
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            name={name}
            {...getInputProps({
              placeholder: "Address, airport, hotel, ...",
            })}
          />
          <div
            className={`${suggestions.length > 0 ? styles.dropdown_map_search : ""
              }`}>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const style = suggestion.active
                ? {
                  width: "100%",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "12px",
                  backgroundColor: "#f0f2f7",
                  padding: "8px",
                }
                : {
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                  width: "100%",
                  fontSize: "12px",
                  padding: "8px",
                };
              return (
                <div
                  key={Math.random()}
                  {...getSuggestionItemProps(suggestion, {
                    style,
                  })}>
                  <img
                    src="/Assets/Icon awesome-map-marker-alt.svg"
                    alt="Map"
                    loading="lazy"
                  />
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Search;
