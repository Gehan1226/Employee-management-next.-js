import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type PhoneInputFieldProps = {
  error?: string;
};

export default function PhoneInputField({ error }: Readonly<PhoneInputFieldProps>) {
  const [phone, setPhone] = useState<string>('');

  return (
    <div>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={(phone: string) => {
          setPhone(phone);
        }}
        containerStyle={{
          width: '100%', height: '45px', borderColor: error ? 'red' : '#ced4da'
        }}
        inputStyle={{
          width: '100%',
          height: '45px',
          borderColor: error ? 'red' : '#ced4da',
          borderWidth:'1px',
        }}
      />
    </div>
  );
}


