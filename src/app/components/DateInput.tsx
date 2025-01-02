import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DateInputProps = {
  label: string;
  name: string
  error?: string;
}

export default function DateInput({ label, name, error }: Readonly<DateInputProps>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label={label}
          name={name}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              height: '45px',
              overflow: 'hidden',
              '& fieldset': {
                borderColor: error ? '#E34F50' : '#ced4da',
              },
              '&.Mui-focused fieldset': {
                borderColor:  error ? '#E34F50' : 'blue-500', 
              },
            },
            '& .MuiInputBase-input': {
              padding: '10px 12px',
              fontSize: '16px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
          }}
        />
      </DemoContainer>
      {error && <p className="mt-2 ms-2 text-sm text-red-600">*{error}</p>}

    </LocalizationProvider>
  );
}