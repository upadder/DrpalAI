import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
    Typography,
    Paper,
    Link,
  } from '@mui/material';

function PatientAppointmentHistory() {
    // Dummy data for the appointments
    const appointmentData = [
      {
        date: 'March 12, 2021',
        title: 'Diabetes Control Appointment',
        description: 'Blood sugar management is especially important for people with diabetes, as chronically high blood sugar levels can lead',
        treatment: 'Check-up',
        duration: '3 months',
        document: 'check-up-result.pdf',
      },
      {
        date: 'March 12, 2021',
        title: 'Diabetes Control Appointment',
        description: 'Blood sugar management is especially important for people with diabetes, as chronically high blood sugar levels can lead',
        treatment: 'Check-up',
        duration: '3 months',
        document: 'check-up-result.pdf',
      },
      {
        date: 'March 12, 2021',
        title: 'Diabetes Control Appointment',
        description: 'Blood sugar management is especially important for people with diabetes, as chronically high blood sugar levels can lead',
        treatment: 'Check-up',
        duration: '3 months',
        document: 'check-up-result.pdf',
      },
      // ... more appointments
    ];
  
    return (
      <Timeline position="alternate">
        {appointmentData.map((appointment, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot />
              {index < appointmentData.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: '24px' }}>
              <Paper elevation={3} sx={{ p: '16px', maxWidth: 500 }}>
                <Typography variant="h6" component="h1">
                  {appointment.title}
                </Typography>
                <Typography color="textSecondary">{appointment.date}</Typography>
                <Typography>{appointment.description}</Typography>
                <Typography variant="caption">Treatment: {appointment.treatment}</Typography>
                <Typography variant="caption">Duration: {appointment.duration}</Typography>
                <Link href="#" underline="hover" sx={{ cursor: 'pointer', mt: '8px', display: 'block' }}>
                  {appointment.document}
                </Link>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }
  
  export default PatientAppointmentHistory;
