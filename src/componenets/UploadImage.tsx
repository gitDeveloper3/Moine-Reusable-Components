'use client';

import { TextField, Button } from '@mui/material';
import React, { ChangeEvent, useId, useState } from 'react';
import { validateForm } from './UploadFormValidator';
// import { Search } from '@mui/icons-material';

export interface FormValues {
  latitude: number;
  longitude: number;
  altitude: number;
}

const formDefaultValues: FormValues = {
  altitude: 0.0,
  latitude: 0.0,
  longitude: 0.0
};

export type FormErrors = Record<keyof FormValues, string>;


const UploadImage = () => {
  const [formValues, setFormValues] = useState<FormValues>(formDefaultValues);
  const [error, setError] = useState<FormErrors>();

  const latitudeId = useId();
  const longitudeId = useId();
  const altitudeId = useId();

  // Input change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic validation handler
  const handleSubmit = () => {
    const errors = validateForm(formValues);
    setError(errors);
  };

  return (
    <>
   <TextField
  name="latitude"
  id={latitudeId}
  label="Latitude"
  value={formValues.latitude}
  onChange={handleInputChange}
  error={!!error?.latitude}
  helperText={error?.latitude}
  
  margin="normal"
/>


      <TextField
        name="altitude"
        id={altitudeId}
        label="Altitude"
        value={formValues.altitude}
        onChange={handleInputChange}
        error={!!error?.altitude}
        helperText={error?.altitude}
        margin="normal"
      />

      <TextField
        name="longitude"
        id={longitudeId}
        label="Longitude"
        value={formValues.longitude}
        onChange={handleInputChange}
        error={!!error?.longitude}
        helperText={error?.longitude}
        margin="normal"
      />

      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </>
  );
};

export default UploadImage;
