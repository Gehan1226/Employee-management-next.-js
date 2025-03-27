"use client";
import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Avatar } from "@mui/material";
import { getCountriesAndFlags } from "../api/country-names";
import { CountryDetails } from "../types/response-types";
import { Controller } from "react-hook-form";

type CountrySelectorProps = {
  name: string;
  error?: string;
  control?: any;
};

const CountrySelector: React.FC<CountrySelectorProps> = ({
  name,
  error,
  control,
}) => {
  const [countryData, setCountryData] = useState<CountryDetails[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCountriesAndFlags();
      setCountryData(response.data ?? []);
      setFetchError(null);
    } catch (err) {
      setFetchError("Failed to fetch country data.");
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!error}>
            <InputLabel id="country-select-label" sx={{ fontSize: "14px" }}>
              Country
            </InputLabel>
            <Select
              {...field}
              labelId="country-select-label"
              id="country-select"
              value={selectedOption}
              label="Country"
              onChange={(e) => {
                field.onChange(e.target.value);
                handleChange(e);
              }}
              sx={{ height: 45, backgroundColor: "#F9FAFB" }}
              disabled={loading || fetchError !== null}
              name={name}
            >
              {loading && <MenuItem disabled>Loading...</MenuItem>}
              {fetchError && <MenuItem disabled>{fetchError}</MenuItem>}
              {!loading && !fetchError && menuItems}
            </Select>
          </FormControl>
        )}
      />
      {error && <p className="mt-2 text-sm text-red-600">*{error}</p>}
    </Box>
  );
};

export default CountrySelector;
