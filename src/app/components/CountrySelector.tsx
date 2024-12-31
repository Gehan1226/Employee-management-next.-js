import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Avatar } from '@mui/material';
import { getCountriesAndFlags } from '../api/country-names';
import { CountryDetails } from '../types/responseTypes';

const CountrySelector: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryDetails[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCountriesAndFlags();
      setCountryData(response.data ?? []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch country data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  const menuItems = React.useMemo(() => {
    if (!countryData) return [];
    return countryData.map((option) => (
      <MenuItem key={option.name} value={option.name}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={option.flag}
            alt={option.name}
            sx={{ width: 24, height: 24, marginRight: 1 }}
          />
          <Box component="span" sx={{ marginLeft: 1 }}>
            {option.name}
          </Box>
        </Box>
      </MenuItem>
    ));
  }, [countryData]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedOption}
          label="Country"
          onChange={handleChange}
          sx={{ height: 50 }}
          disabled={loading || error !== null}
        >
          {loading && <MenuItem disabled>Loading...</MenuItem>}
          {error && <MenuItem disabled>{error}</MenuItem>}
          {!loading && !error && menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountrySelector;
