// import React from 'react';
// import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

// function PatientSummary() {
//   // Patient data could also be passed as props
//   const patientSummary = {
//     patientId: "Patient_100",
//     ageGender: "Varies across records; gender reported as both Female and Male.",
//     bloodType: "Multiple entries including B+, A-, A+, O-, AB+, AB-.",
//     heightWeight: "Height ranges from 141 cm to 196 cm; weight ranges from 40 kg to 146 kg. Notably, one entry lists the patient as having obesity with a weight of 40 kg and height of 187 cm, which seems inconsistent and might be an error.",
//     medicalHistory: [
//       { condition: "Cancer", treatment: "Treated with Chemotherapy, Hormone therapy, Targeted therapy, Immunotherapy, Radiation therapy (Dr. Smith)." },
//       { condition: "Heart Disease", treatment: "Managed with Aspirin, Statins, Beta-blockers, ACE inhibitors, Nitroglycerin by Dr. Brown and Dr. Lee." },
//       // Add more conditions as needed
//     ],
//     allergies: "Broad range including Sulfites, Pollen, Fish, Gluten, Tree Nuts, Nickel, Dust Mites, Animal Proteins, Cockroaches, Perfumes, and Fragrances.",
//     recommendations: [
//       "Verify Patient Information: Confirm the patient's identity and demographic details to ensure accurate medical history and treatment plans.",
//       // Add more recommendations as needed
//     ],
//   };

//   return (
//     <Card raised sx={{ margin: 2, backgroundColor: '#f5f5f5' }}>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           Patient Summary for "{patientSummary.patientId}"
//         </Typography>
//         <Divider sx={{ my: 1 }} />
//         <Typography variant="body1">Age/Gender: {patientSummary.ageGender}</Typography>
//         <Typography variant="body1">Blood Type: {patientSummary.bloodType}</Typography>
//         <Typography variant="body1">Height/Weight: {patientSummary.heightWeight}</Typography>
        
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Medical History:
//         </Typography>
//         <List>
//           {patientSummary.medicalHistory.map((item, index) => (
//             <ListItem key={index} disablePadding>
//               <ListItemText primary={`${item.condition}:`} secondary={item.treatment} />
//             </ListItem>
//           ))}
//         </List>

//         <Typography variant="body1" sx={{ mt: 2 }}>
//           Allergies: {patientSummary.allergies}
//         </Typography>

//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Recommendations for Healthcare Providers:
//         </Typography>
//         <List dense>
//           {patientSummary.recommendations.map((recommendation, index) => (
//             <ListItem key={index} disablePadding>
//               <ListItemText primary={recommendation} />
//             </ListItem>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// }

// export default PatientSummary;


import React from 'react';
import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Box, Paper } from '@mui/material';

function PatientSummary() {
  // Patient data could be passed as props
  const patientSummary = {
    patientId: "Patient_100",
    ageGender: "Varies across records; gender reported as both Female and Male.",
    bloodType: "Multiple entries including B+, A-, A+, O-, AB+, AB-.",
    heightWeight: "Height ranges from 141 cm to 196 cm; weight ranges from 40 kg to 146 kg. Notably, one entry lists the patient as having obesity with a weight of 40 kg and height of 187 cm, which seems inconsistent and might be an error.",
    medicalHistory: [
      { condition: "Cancer", treatment: "Treated with Chemotherapy, Hormone therapy, Targeted therapy, Immunotherapy, Radiation therapy (Dr. Smith)." },
      { condition: "Heart Disease", treatment: "Managed with Aspirin, Statins, Beta-blockers, ACE inhibitors, Nitroglycerin by Dr. Brown and Dr. Lee." },
      // Add more conditions as needed
    ],
    allergies: "Broad range including Sulfites, Pollen, Fish, Gluten, Tree Nuts, Nickel, Dust Mites, Animal Proteins, Cockroaches, Perfumes, and Fragrances.",
    recommendations: [
      "Verify Patient Information: Confirm the patient's identity and demographic details to ensure accurate medical history and treatment plans.",
      // Add more recommendations as needed
    ],
  };

  const SectionTitle = ({ children }) => (
    <Typography gutterBottom variant="h6" component="div" color="secondary">
      {children}
    </Typography>
  );

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto', // centers the card horizontally
        my: 4, // margin top and bottom for outside spacing
      }}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Patient Summary for "{patientSummary.patientId}"
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <SectionTitle>Age/Gender</SectionTitle>
        <Typography variant="body1" gutterBottom>{patientSummary.ageGender}</Typography>
        
        <SectionTitle>Blood Type</SectionTitle>
        <Typography variant="body1" gutterBottom>{patientSummary.bloodType}</Typography>
        
        <SectionTitle>Height/Weight</SectionTitle>
        <Typography variant="body1" gutterBottom>{patientSummary.heightWeight}</Typography>
        
        <SectionTitle>Medical History</SectionTitle>
        <List disablePadding>
          {patientSummary.medicalHistory.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`${item.condition}:`} secondary={item.treatment} />
            </ListItem>
          ))}
        </List>

        <SectionTitle>Allergies</SectionTitle>
        <Typography variant="body1" gutterBottom>{patientSummary.allergies}</Typography>

        <SectionTitle>Recommendations for Healthcare Providers</SectionTitle>
        <List dense>
          {patientSummary.recommendations.map((recommendation, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default PatientSummary;

