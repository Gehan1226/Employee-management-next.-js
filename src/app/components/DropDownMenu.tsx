import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { error } from 'console';

export type DropDownMenuItem = {
    label: string
    id: string;
}

type DropDownProps = {
    label: string;
    menuItems: DropDownMenuItem[];
    name: string;
    handleChange?: (event: SelectChangeEvent) => void
    error?: string;
};

export default function DropDownMenu({
    label,
    menuItems,
    name,
    handleChange,
    error
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
                error={!!error}
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
            {error && <p className="mt-2  text-sm text-red-600">*{error}</p>}
        </FormControl>
    );
}
