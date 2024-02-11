import React, { useState } from 'react';
import './form-component.css';

function FormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    insuranceNumber: '',
    gender: '',
    bloodType: '',
    ssn: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Here you would typically send the data to a server or process it as needed.
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age" className="form-label">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          className="form-input"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="insuranceNumber" className="form-label">Insurance Number:</label>
        <input
          type="text"
          id="insuranceNumber"
          name="insuranceNumber"
          className="form-input"
          value={formData.insuranceNumber}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ssn" className="form-label">Social Security Number:</label> {/* SSN Field */}
        <input
          type="text"
          id="ssn"
          name="ssn"
          className="form-input"
          value={formData.ssn}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Gender:</label>
        <select name="gender" className="form-input" value={formData.gender} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Blood Type:</label>
        <select name="bloodType" className="form-input" value={formData.bloodType} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <button type="submit" className="form-submit">Submit</button>
    </form>
  );
}

export default FormComponent;
