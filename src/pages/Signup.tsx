import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignupUserMutation } from '../redux/slices/auth/authAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signupSuccess, signupFailure } from '../redux/slices/auth/authSlice';
import { signupSchema } from '../helper/schema/signupSchema';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    CircularProgress,
    Link,
    FormControlLabel,
    Checkbox,
    Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

type SignupFormInputs = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    retypePassword: string;
    dob: string;
    phone: string;
};

const Signup: React.FC = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignupFormInputs>({
        resolver: yupResolver(signupSchema),
    });
    const [signupUser, { isLoading }] = useSignupUserMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState('');

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            const response = await signupUser(data).unwrap();
            dispatch(signupSuccess({ user: response.user, token: response.token }));
            reset();
        } catch (err: any) {
            dispatch(signupFailure(err?.data?.error || 'Signup failed'));
            setAuthError(err?.data?.error || 'Signup failed')
        }
    };

    const handleShowPasswordChange = () => setShowPassword(!showPassword);

    return (
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
            <Card
                sx={{
                    width: '300px',
                    padding: 3,
                    borderRadius: '20px',
                    boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                }}
            >
                <CardContent>
                    <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5em', color: 'black' }}>
                        Signup
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                    >
                        <TextField
                            label="First Name"
                            variant="standard"
                            {...register('firstname')}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                            InputProps={{
                                endAdornment: (
                                    <PersonIcon sx={{ color: 'black' }} />
                                ),
                            }}
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
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'black',
                                },
                            }}
                        />

                        <TextField
                            label="Last Name"
                            variant="standard"
                            {...register('lastname')}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                            InputProps={{
                                endAdornment: (
                                    <PersonIcon sx={{ color: 'black' }} />
                                ),
                            }}
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
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'black',
                                },
                            }}
                        />

                        <TextField
                            label="Email"
                            variant="standard"
                            type="email"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputProps={{
                                endAdornment: (
                                    <EmailIcon sx={{ color: 'black' }} />
                                ),
                            }}
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
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'black',
                                },
                            }}
                        />

                        <TextField
                            label="Password"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <LockIcon sx={{ color: 'black' }} />
                                ),
                            }}
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
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'black',
                                },
                            }}
                        />

                        <TextField
                            label="Retype Password"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            {...register('retypePassword')}
                            error={!!errors.retypePassword}
                            helperText={errors.retypePassword?.message}
                            InputProps={{
                                endAdornment: (
                                    <LockIcon sx={{ color: 'black' }} />
                                ),
                            }}
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
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'black',
                                },
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{ color: 'black' }}
                                        checked={showPassword}
                                        onChange={handleShowPasswordChange}
                                    />
                                }
                                label={<Typography sx={{ color: 'black', fontSize: '0.75rem' }}>Show password</Typography>}
                                sx={{ margin: 0 }}
                            />
                        </Box>

                        <TextField
                            label="Date of Birth"
                            variant="standard"
                            type="date"
                            {...register('dob')}
                            error={!!errors.dob}
                            helperText={errors.dob?.message}
                            InputLabelProps={{ shrink: true }}
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
                            InputProps={{
                                endAdornment: (
                                    <PhoneIcon sx={{ color: 'black' }} />
                                ),
                                inputProps: {
                                    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }
                                },
                            }}
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
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'black',
                                },
                            }}
                        />

                        {authError && <Alert severity="error">{authError}</Alert>}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
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
                        >
                            {isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'SIGNUP'}
                        </Button>

                        <Typography align="center" sx={{ mt: 1 }}>
                            Already have an account?{' '}
                            <Link href="/auth/login" underline="hover" sx={{ color: 'black', fontWeight: 'bold' }}>
                                Login
                            </Link>
                        </Typography>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;
