// components/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../redux/slices/auth/authAction';
import { useAppDispatch } from '../redux/hooks';
import { loginSuccess, loginFailure } from '../redux/slices/auth/authSlice';

// Define the type for the form inputs
type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    // Pass the form input types to useForm
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    console.log('i hit')
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await loginUser(data).unwrap();
            dispatch(loginSuccess({ user: response.user, token: response.token }));
        } catch (err: any) {
            dispatch(loginFailure(err?.data?.message || 'Login failed'));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" disabled={isLoading}>Login</button>
            {isError && (
                <p>
                    {error && 'data' in error
                        ? (error as any).data?.error || 'Login failed'
                        : 'Login failed'}
                </p>
            )}
        </form>
    );
};

export default Login;
