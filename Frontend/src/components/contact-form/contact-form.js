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

  const textFieldStyle = {
    input: {
      color: '#D4DCE2',
      borderColor: 'grey',
      '&:before': {
        borderColor: '#D4DCE2',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderColor: '#D4DCE2',
      },
    },
    notchedOutline: {
      borderColor: '#D4DCE2', // Default border color
    },
  };


  return (<>
    <p style={{backgroundColor: "#1E1E1E",minHeight:'155px'}}></p>
    <div style={{ backgroundColor: '#1E1E1E', color: '#D4DCE2', padding: '20px', paddingTop: '10px', paddingBottom: '10px' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#D4DCE2', textAlign: 'center', fontFamily: 'Satoshi, sans-serif' }}>
        Patient History Tracker
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
          InputLabelProps={{ style: { color: '#D4DCE2' } }}
  // Using the sx prop to apply styles
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
  }}
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
          InputLabelProps={{ style: { color: '#D4DCE2' } }}
  // Using the sx prop to apply styles
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
  }}
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
          InputLabelProps={{ style: { color: '#D4DCE2' } }}
  // Using the sx prop to apply styles
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
  }}
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
  InputLabelProps={{ style: { color: '#D4DCE2' } }}
  // Using the sx prop to apply styles 
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
  }}
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
          InputLabelProps={{ style: { color: '#D4DCE2' } }}
      
  // Using the sx prop to apply styles
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
  }}
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
          InputLabelProps={{ style: { color: '#D4DCE2' } }}
  // Using the sx prop to apply styles
  sx={{
    '& .MuiOutlinedInput-root': {
      '& input' : {
        color: '#D4DCE2' 
      },
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
      
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
    
  }}
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
          // InputLabelProps={{ style: { color: '#D4DCE2' } }}
          // InputProps={{
          //   maxLength: 4,
          //   style: { color: '#D4DCE2', borderColor: '#D4DCE2' },
          //   classes: textFieldStyle,
          // }}
          InputLabelProps={{ style: { color: '#D4DCE2' } }}
          InputProps={{maxLength: 4}}
  // Using the sx prop to apply styles
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D4DCE2', // default
      },
      '&:hover fieldset': {
        borderColor: '#D4DCE2', // hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D4DCE2', // focused
      },
    },
    // Apply color directly to the input
    input: {
      color: '#D4DCE2',
    }
  }}
        />
        <Button variant="contained" color="primary" fullWidth type="submit" style={{ backgroundColor: '#1D8FE1', color: '#FFFFFF', marginTop: '20px', fontFamily: 'Satoshi, sans-serif'}}>
          Submit
        </Button>
      </form>
    </div>
    <p style={{backgroundColor: "#1E1E1E",minHeight:'155px'}}></p>
    </>
  );
}

export default ContactForm;
