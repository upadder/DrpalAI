import React from 'react';
import { TextField, MenuItem, Button, Typography } from '@mui/material';
import './contact-form.css'; // Make sure to create and import your CSS styles

const insuranceProviders = [
  'Provider A',
  'Provider B',
  'Provider C',
  // ... add other insurance providers
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function ContactForm() {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Client Information Form
      </Typography>
      <form noValidate autoComplete="off">
        <TextField fullWidth label="Name" margin="normal" variant="outlined" />
        <TextField fullWidth label="Age" margin="normal" variant="outlined" type="number" />
        <TextField
          fullWidth
          select
          label="Insurance Provider"
          margin="normal"
          variant="outlined"
        >
          {insuranceProviders.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField fullWidth label="Insurance Number" margin="normal" variant="outlined" />
        <TextField
          fullWidth
          select
          label="Gender"
          margin="normal"
          variant="outlined"
        >
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
          <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label="Blood Type"
          margin="normal"
          variant="outlined"
        >
          {bloodTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField fullWidth label="Last Four Digits of SSN" margin="normal" variant="outlined" inputProps={{ maxLength: 4 }} />
        <Button variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
