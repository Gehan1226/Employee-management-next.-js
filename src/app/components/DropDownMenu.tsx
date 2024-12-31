import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type DropDownProps = {
    label: string;
    menuItems: Array<{ label: string; value: string }>;
    name: string; // Accept name as a prop
};

export default function DropDownMenu({
    label,
    menuItems,
    name,
}: Readonly<DropDownProps>) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedOption(event.target.value);
    };

    return (
        <FormControl fullWidth>
             <InputLabel
                id={`${name}-label`}
                sx={{
                    fontSize: "14px",
                }}
            >
                {label}
            </InputLabel>
            <Select
                labelId={`${name}-label`}
                id={name}
                value={selectedOption}
                label={label}
                onChange={handleChange}
                name={name}
                sx={{ height: 45 }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
