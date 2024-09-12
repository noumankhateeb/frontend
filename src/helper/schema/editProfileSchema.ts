import * as Yup from 'yup';

export const editProfileSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters')
        .max(50, 'First Name must not exceed 50 characters'),
    lastname: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters')
        .max(50, 'Last Name must not exceed 50 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    dob: Yup.string()
        .required('Date of Birth is required')
        .typeError('Invalid date format'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Phone number is not valid')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must not exceed 15 digits'),
});
