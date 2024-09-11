// components/Signup.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignupUserMutation } from '../redux/slices/auth/authAction';
import { useAppDispatch } from '../redux/hooks';
import { signupSuccess, signupFailure } from '../redux/slices/auth/authSlice';
import { Box } from '@mui/material';

// Define the type for the form inputs
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
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
    const [signupUser, { isLoading, isError, error }] = useSignupUserMutation();

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            const response = await signupUser(data).unwrap();
            dispatch(signupSuccess({ user: response.user, token: response.token }));
        } catch (err: any) {
            dispatch(signupFailure(err?.data?.message || 'Signup failed'));
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 5 }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        {...register('firstname', { required: 'First Name is required' })}
                    />
                    {errors.firstname && <p>{errors.firstname.message}</p>}
                </div>

                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        {...register('lastname', { required: 'Last Name is required' })}
                    />
                    {errors.lastname && <p>{errors.lastname.message}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div>
                    <label>Retype Password</label>
                    <input
                        type="password"
                        {...register('retypePassword', { required: 'Please retype your password' })}
                    />
                    {errors.retypePassword && <p>{errors.retypePassword.message}</p>}
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        {...register('dob', { required: 'Date of Birth is required' })}
                    />
                    {errors.dob && <p>{errors.dob.message}</p>}
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>

                <button type="submit" disabled={isLoading}>Signup</button>

                {isError && (
                    <p>
                        {error && 'data' in error
                            ? (error as any).data?.error || 'Signup failed'
                            : 'Signup failed'}
                    </p>
                )}
            </form>
        </Box>
    );
};

export default Signup;
