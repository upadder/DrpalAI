
import React from 'react';
import { jsPDF } from "jspdf";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function PatientAppointmentHistory(props) {
  const { summaryData } = props;
  const downloadPdf = async () => {
    // Initialize jsPDF
    const doc = new jsPDF();
  
    // Load the logo image as a Data URL
    const logoUrl = `${process.env.PUBLIC_URL}/logo.png`;
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    const logoDataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  
    // Once the Data URL is ready, add it to the PDF
    doc.addImage(logoDataUrl, 'PNG', 10, 10, 50, 50);
  
    // Set the starting y position for the text below the image
    const startYPosition = 70;
  
    // Set the maximum width for text lines
    const maxLineWidth = doc.internal.pageSize.getWidth() - 20; // 10 units padding on each side
    
    // Split the text into lines
    const lines = doc.splitTextToSize(summaryData, maxLineWidth);
    
    // Add each line of text to the document
    let yPosition = startYPosition;
    const lineHeight = 7;
  
    lines.forEach((line) => {
      doc.text(line, 10, yPosition);
      yPosition += lineHeight;
    });
  
    // Save the PDF
    doc.save('summaryData.pdf');
  };
  
  

  return (
    <>
    <Box sx={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ my: 4 }}>
        <Grid item>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="App Logo" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </Grid>
      </Grid>

      {/* Content with Padding */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          {/* Summary Data Display */}
          <Typography component="div" variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {summaryData}
          </Typography>
        </Paper>
        
        {/* Download Button */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={downloadPdf}>
            Download to PDF
          </Button>
        </Box>
      </Container>
    </Box>
  </>
  );
}

export default PatientAppointmentHistory;



// import React from 'react';
// import {
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
// } from '@mui/lab';
// import {
//     Typography,
//     Paper,
//     Link,
//   } from '@mui/material';

// function PatientAppointmentHistory(props) {
//     // Dummy data for the appointments
//     // const appointmentData = [
//     //   {
//     //     date: 'March 12, 2021',
//     //     title: 'Diabetes Control Appointment',
//     //     description: 'Blood sugar management is especially important for people with diabetes, as chronically high blood sugar levels can lead',
//     //     treatment: 'Check-up',
//     //     duration: '3 months',
//     //     document: 'check-up-result.pdf',
//     //   },
//     //   {
//     //     date: 'March 12, 2021',
//     //     title: 'Diabetes Control Appointment',
//     //     description: 'Blood sugar management is especially important for people with diabetes, as chronically high blood sugar levels can lead',
//     //     treatment: 'Check-up',
//     //     duration: '3 months',
//     //     document: 'check-up-result.pdf',
//     //   },
//     //   {
//     //     date: 'March 12, 2021',
//     //     title: 'Diabetes Control Appointment',
//     //     description: 'Blood sugar management is especially important for people with diabetes, as chronically high blood sugar levels can lead',
//     //     treatment: 'Check-up',
//     //     duration: '3 months',
//     //     document: 'check-up-result.pdf',
//     //   },
//     //   // ... more appointments
//     // ];
//     const summaryData = props.summaryData;
//     // const appointmentData = [ props ]
//     return (
//     <>
//         {summaryData}
//     </>
//       // <Timeline position="alternate">
//       //   {appointmentData.map((appointment, index) => (
//       //     <TimelineItem key={index}>
//       //       <TimelineSeparator>
//       //         <TimelineDot />
//       //         {index < appointmentData.length - 1 && <TimelineConnector />}
//       //       </TimelineSeparator>
//       //       <TimelineContent sx={{ py: '12px', px: '24px' }}>
//       //         <Paper elevation={3} sx={{ p: '16px', maxWidth: 500 }}>
//       //           <Typography variant="h6" component="h1">
//       //             {appointment.title}
//       //           </Typography>
//       //           <Typography color="textSecondary">{appointment.date}</Typography>
//       //           <Typography>{appointment.description}</Typography>
//       //           {/* <Typography variant="caption">Treatment: {appointment.treatment}</Typography>
//       //           <Typography variant="caption">Duration: {appointment.duration}</Typography>
//       //           <Link href="#" underline="hover" sx={{ cursor: 'pointer', mt: '8px', display: 'block' }}>
//       //             {appointment.document}
//       //           </Link> */}
//       //         </Paper>
//       //       </TimelineContent>
//       //     </TimelineItem>
//       //   ))}
//       // </Timeline>
//     );
//   }
  
//   export default PatientAppointmentHistory;