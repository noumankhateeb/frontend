import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, Typography, Container, Box, TextField, Button, IconButton, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../components/Navbar';
import { editProfileSchema } from '../helper/schema/editProfileSchema';
import { RootState } from '../redux/rootReducer';
import moment from 'moment';
import { useUpdateUserProfileMutation } from '../redux/slices/auth/authAction';
import { updateProfileSuccess, updateProfileFailure } from '../redux/slices/auth/authSlice';

type ProfileFormInputs = {
    firstname: string;
    lastname: string;
    email: string;
    dob: string;
    phone: string;
};

const Dashboard: React.FC = () => {
    const authData = useSelector((state: RootState) => state.auth.authData);
    const token = useSelector((state: RootState) => state.auth.token);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [authError, setAuthError] = useState('');

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileFormInputs>({
        resolver: yupResolver(editProfileSchema),
    });

    useEffect(() => {
        if (isEditing && authData) {
            reset({
                firstname: authData.firstname,
                lastname: authData.lastname,
                email: authData.email,
                dob: moment(authData.dob).format('YYYY-MM-DD'),
                phone: authData.phone,
            });
        }
    }, [isEditing, authData, reset]);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const onSubmit = async (data: ProfileFormInputs) => {
        try {
            const response = await updateUserProfile({ token, profileData: data }).unwrap();
            dispatch(updateProfileSuccess(response.user));

            setIsEditing(false);
        } catch (error: any) {

            const errorMessage = error?.data?.error || error?.error || 'Failed to update profile';

            dispatch(updateProfileFailure(errorMessage));
            setAuthError(error?.data?.error || 'Failed to update profile')
        }
    };

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'url("/backgroundImage.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    padding: '20px',
                    boxSizing: 'border-box',
                }}
            >
                <Container maxWidth="sm">
                    <Card
                        sx={{
                            borderRadius: '20px',
                            boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
                            background: 'transparent',
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(20px)',
                            position: 'relative',
                            marginTop:'50px'
                        }}
                    >
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5em', color: 'black' }}>
                                    Profile Data
                                </Typography>
                                <IconButton onClick={handleEdit}>
                                    {isEditing ? <CloseIcon sx={{ color: 'black' }} /> : <EditIcon sx={{ color: 'black' }} />}
                                </IconButton>
                            </Box>

                            <hr />

                            {isEditing ? (
                                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <TextField
                                        label="First Name"
                                        variant="standard"
                                        {...register('firstname')}
                                        error={!!errors.firstname}
                                        helperText={errors.firstname?.message}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Last Name"
                                        variant="standard"
                                        {...register('lastname')}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname?.message}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Email"
                                        variant="standard"
                                        type="email"
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Date of Birth"
                                        variant="standard"
                                        type="date"
                                        {...register('dob')}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.dob}
                                        helperText={errors.dob?.message}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: !!errors.dob ? 'error' : 'black',
                                                fontWeight: '400',
                                                fontSize: '0.875rem',
                                            },
                                            '& .MuiInputBase-input': {
                                                color: !!errors.dob ? '#D32F2F' : 'black',
                                                fontSize: '1rem',
                                            },
                                            '& .MuiFormHelperText-root': {
                                                color: !!errors.dob ? 'error' : 'black',
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Phone"
                                        variant="standard"
                                        {...register('phone')}
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                        fullWidth
                                        InputProps={{
                                            inputProps: {
                                                onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }
                                            },
                                        }}
                                    />

                                    {authError && <Alert severity="error">{authError}</Alert>}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 1,
                                            padding: '10px',
                                            backgroundColor: 'black',
                                            color: '#fff',
                                            borderRadius: 1,
                                            '&:hover': {
                                                backgroundColor: '#333',
                                            },
                                        }}
                                        disabled={!isDirty}
                                    >
                                        Update
                                    </Button>
                                </Box>
                            ) : (
                                <>
                                    <Typography variant="body1"><strong>First Name:</strong> {authData?.firstname}</Typography>
                                    <Typography variant="body1"><strong>Last Name:</strong> {authData?.lastname}</Typography>
                                    <Typography variant="body1"><strong>Email:</strong> {authData?.email}</Typography>
                                    <Typography variant="body1"><strong>Date of Birth:</strong> {moment(authData?.dob).format('MM-DD-YYYY')}</Typography>
                                    <Typography variant="body1"><strong>Phone:</strong> {authData?.phone}</Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default Dashboard;
