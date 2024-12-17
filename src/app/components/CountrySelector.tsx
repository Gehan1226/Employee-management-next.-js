import React, { useState, useEffect } from 'react'
import Select from 'react-select'

export default function CountrySelector() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState<any>({});

    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
    }, []);
    
    return (
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
      />
    );
}

