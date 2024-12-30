import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Avatar } from '@mui/material';

export default function CountrySelector() {

  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
  };

  const options = [
    { value: 'dog', label: 'Dog', img: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg' },
    { value: 'cat', label: 'Cat', img: 'https://via.placeholder.com/30?text=Cat' },
    { value: 'bird', label: 'Bird', img: 'https://via.placeholder.com/30?text=Bird' },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="image-select-label">Animal</InputLabel>
        <Select
          labelId="image-select-label"
          id="image-select"
          value={selectedOption}
          label="Animal"
          onChange={handleChange}
          sx={{ height: 50 }}
        >
          {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
          <Box display="flex" alignItems="center">
            <Avatar
              src={option.img}
              alt={option.label}
              sx={{ width: 24, height: 24, marginRight: 1 }}
            />
            <Box component="span" sx={{ marginLeft: 1 }}>
              {option.label}
            </Box>
          </Box>
        </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>


  );
}

