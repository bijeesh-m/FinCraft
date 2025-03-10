import * as yup from "yup";

export const validationSchema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    dateofbirth: yup.date().required("Date of birth is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone: yup
        .string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalcode: yup
        .string()
        .matches(/^\d{5,6}$/, "Postal code must be 5-6 digits")
        .required("Postal code is required"),
    branch: yup.string().required("Branch selection is required"),
});
