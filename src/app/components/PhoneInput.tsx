import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputField() {
  const [phone, setPhone] = useState<string>('');

  return (
    <div>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={(phone: string) => {
          setPhone(phone);
        }}
        containerStyle={{ width: '100%',  height: '45px' }}
        inputStyle={{ width: '100%',  height: '45px' }}
      />
    </div>
  );
}


