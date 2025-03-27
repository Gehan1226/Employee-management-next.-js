import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Controller } from "react-hook-form";
import dayjs from 'dayjs';

interface DateInputProps {
  label: string;
  name: string;
  control: any;
  error?: string;
}

export default function DateInput({
  label,
  name,
  control,
  error,
}: Readonly<DateInputProps>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              field.onChange(date?.toDate() ?? null);
            }}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error,
              },
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                height: "50px",
                backgroundColor: "#F9FAFB",
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "16px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}