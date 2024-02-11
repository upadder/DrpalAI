import React from 'react';
import { jsPDF } from "jspdf";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
      <Box sx={{ backgroundColor: '#252422', color: '#D4DCE2', minHeight: '100vh' }}> {/* Dark grey background and light grey text */}
        <Grid container justifyContent="center" alignItems="center" sx={{ my: 4 }}>
          <Grid item>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="App Logo" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </Grid>
        </Grid>

        {/* Content with Padding */}
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor: '#FFFFFF' }}> {/* White paper background */}
            {/* Summary Data Display */}
            <Typography component="div" variant="body1" sx={{ whiteSpace: 'pre-wrap', color: '#1E1E1E' }}> {/* Black text for readability */}
              {summaryData}
            </Typography>
          </Paper>
          
          {/* Download Button */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth onClick={downloadPdf} sx={{ backgroundColor: '#1D8FE1' }}>
              Download to PDF
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PatientAppointmentHistory;
