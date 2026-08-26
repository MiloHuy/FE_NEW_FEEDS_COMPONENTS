import * as yup from "yup";

export const schemaFormRegister = yup.object({
  username: yup.string().required("Username is required").min(3, "Min 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});
