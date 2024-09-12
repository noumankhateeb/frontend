import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';  // Adjust this import based on your store setup
import { Card, CardContent, Typography, Container } from '@mui/material';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
    const authData = useSelector((state: RootState) => state.auth.authData);

    console.log('this is data', authData)

    return (
        <>
            <Navbar />
            <Container>
                <Card style={{ marginTop: 20 }}>
                    <CardContent>
                        <Typography variant="h5">Profile Data</Typography>
                        {authData ? (
                            <>
                                <Typography variant="body1"><strong>First Name:</strong> {authData.firstname}</Typography>
                                <Typography variant="body1"><strong>Last Name:</strong> {authData.lastname}</Typography>
                                <Typography variant="body1"><strong>Email:</strong> {authData.email}</Typography>
                                <Typography variant="body1"><strong>Date of Birth:</strong> {authData.dob}</Typography>
                                <Typography variant="body1"><strong>Phone:</strong> {authData.phone}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1">No user data available.</Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default Dashboard;
