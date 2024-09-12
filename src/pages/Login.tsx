import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginUserMutation } from '../redux/slices/auth/authAction';
import { useAppDispatch } from '../redux/hooks';
import { loginSuccess, loginFailure } from '../redux/slices/auth/authSlice';
import { loginSchema } from '../helper/schema/loginSchema';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    Link,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });
    const [loginUser, { isLoading }] = useLoginUserMutation();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await loginUser(data).unwrap();
            dispatch(loginSuccess({ user: response.user, token: response.token }));
        } catch (err: any) {
            dispatch(loginFailure(err?.data?.message || 'Login failed'));
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
                backgroundAttachment: 'fixed', // Fix background
                padding: '20px', // Add padding around the box
                boxSizing: 'border-box', // Prevent overflow from padding
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
                        Login
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                    >
                        <TextField
                            id="standard-basic"
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
                            id="standard-basic"
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
                                    color: !!errors.password ? 'error' : 'black',
                                    fontWeight: '400',
                                    fontSize: '0.875rem',
                                },
                                '& .MuiInputBase-input': {
                                    color: !!errors.password ? 'error' : 'black',
                                    fontSize: '1rem',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: !!errors.password ? 'error' : 'black',
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
                            {isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'LOGIN'}
                        </Button>

                        <Typography align="center" sx={{ mt: 1 }}>
                            Don't have an account?{' '}
                            <Link href="/auth/signup" underline="hover" sx={{ color: 'black', fontWeight: 'bold' }}>
                                Signup
                            </Link>
                        </Typography>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
