import React, { useState } from 'react';
import { TextField, MenuItem, Button, Typography } from '@mui/material';
import { trackPromise } from 'react-promise-tracker';

const insuranceProviders = ['Provider A', 'Provider B', 'Provider C'];
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function ContactForm(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    age: '',
    insuranceProvider: '',
    insuranceNumber: '',
    gender: '',
    bloodType: '',
    ssn: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.name) errors.name = 'Name is required';
    if (!formValues.age || formValues.age <= 0 || formValues.age > 150) errors.age = 'Age must be between 1 and 150';
    if (!formValues.insuranceProvider) errors.insuranceProvider = 'Insurance provider is required';
    if (!formValues.insuranceNumber) errors.insuranceNumber = 'Insurance number is required';
    if (!formValues.gender) errors.gender = 'Gender is required';
    if (!formValues.bloodType) errors.bloodType = 'Blood type is required';
    if (!formValues.ssn || formValues.ssn.length < 4) errors.ssn = 'SSN must be 4 digits';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length === 0) {
      await sendMessageToBackend(formValues);
      // Optionally clear form here or provide a success message
    } else {
      setFormErrors(errors);
    }
  };

  const sendMessageToBackend = async (formData) => {
    try {
      // Wrap the fetch operation with trackPromise
      await trackPromise(
        fetch('http://127.0.0.1:5000/fetch_patient_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(responseData => {
          console.log('Response from backend:', responseData.summary);
          // Handle success here
          props.setSummaryData(responseData.summary);
          props.setShowForm(false); // Assuming this is a part of your component's props
        })
      );
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };

  

  return (
    <div className="max-w-md mx-auto my-10">
      <Typography variant="h4" gutterBottom className="text-center mb-4">
        Patient Information Form
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          variant="outlined"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name || ' '}
        />
        <TextField
          fullWidth
          label="Age"
          margin="normal"
          variant="outlined"
          type="number"
          name="age"
          value={formValues.age}
          onChange={handleChange}
          error={!!formErrors.age}
          helperText={formErrors.age || ' '}
        />
        <TextField
          fullWidth
          select
          label="Insurance Provider"
          margin="normal"
          variant="outlined"
          name="insuranceProvider"
          value={formValues.insuranceProvider}
          onChange={handleChange}
          error={!!formErrors.insuranceProvider}
          helperText={formErrors.insuranceProvider || ' '}
        >
          {insuranceProviders.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Insurance Number"
          margin="normal"
          variant="outlined"
          name="insuranceNumber"
          value={formValues.insuranceNumber}
          onChange={handleChange}
          error={!!formErrors.insuranceNumber}
          helperText={formErrors.insuranceNumber || ' '}
        />
        <TextField
          fullWidth
          select
          label="Gender"
          margin="normal"
          variant="outlined"
          name="gender"
          value={formValues.gender}
          onChange={handleChange}
          error={!!formErrors.gender}
          helperText={formErrors.gender || ' '}
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
          name="bloodType"
          value={formValues.bloodType}
          onChange={handleChange}
          error={!!formErrors.bloodType}
          helperText={formErrors.bloodType || ' '}
        >
          {bloodTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Last Four Digits of SSN"
          margin="normal"
          variant="outlined"
          name="ssn"
          value={formValues.ssn}
          onChange={handleChange}
          error={!!formErrors.ssn}
          helperText={formErrors.ssn || ' '}
          inputProps={{ maxLength: 4 }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
