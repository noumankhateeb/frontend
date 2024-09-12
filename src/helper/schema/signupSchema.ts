import * as yup from 'yup';

export const signupSchema = yup.object({
    firstname: yup.string().required('First Name is required'),
    lastname: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    retypePassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please retype your password'),
    dob: yup.string().required('Date of Birth is required'),
    phone: yup
        .string()
        .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits')
        .required('Phone number is required'),
});
