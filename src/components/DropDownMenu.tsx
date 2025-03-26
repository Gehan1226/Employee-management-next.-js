import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Controller } from "react-hook-form";

export type DropDownMenuItem = {
  label: string;
  id: string;
};

type DropDownProps = {
  label: string;
  menuItems: DropDownMenuItem[];
  name: string;
  handleChange?: (event: SelectChangeEvent) => void;
  error?: string;
  control?: any;
  onChange?: (value: string) => void;
};

export default function DropDownMenu({
  label,
  menuItems,
  name,
  handleChange,
  control,
  error,
  onChange
}: Readonly<DropDownProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel
            id={`${name}-label`}
            sx={{
              fontSize: "14px",
            }}
          >
            {label}
          </InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            id={name}
            value={field.value || ""} 
            label={label}
            onChange={(e) => {
              field.onChange(e); 
              handleChange?.(e);
              onChange?.(e.target.value);
            }}
            sx={{ height: 45 }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <p className="mt-2 text-sm text-red-600">*{error}</p>
          )}
        </FormControl>
      )}
    />
  );
}
