import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export type DropDownMenuItem = {
    label: string
    id: string ; 
}

type DropDownProps = {
    label: string;
    menuItems: DropDownMenuItem[];
    name: string;
    handleChange?: (event: SelectChangeEvent) => void 
};

export default function DropDownMenu({
    label,
    menuItems,
    name,
    handleChange
}: Readonly<DropDownProps>) {
    const [selectedOption, setSelectedOption] = useState(
         ''
    );
    const onChangeSelect = (event: SelectChangeEvent) => {
        setSelectedOption(event.target.value);
        handleChange?.(event);
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
                onChange={onChangeSelect}
                name={name}
                sx={{ height: 45 }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
