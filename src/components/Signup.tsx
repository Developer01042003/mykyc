import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Flex, TextField, SelectField, Button } from '@aws-amplify/ui-react';
import { authService } from '../services/api';

const SignupSchema = Yup.object().shape({
  full_name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  whatsapp: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
});

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignItems="center" padding="2rem">
      <Formik
        initialValues={{
          full_name: '',
          username: '',
          email: '',
          password: '',
          whatsapp: '',
          gender: '',
          address: '',
          country: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await authService.signup(values);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
          } catch (error) {
            console.error(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, values, errors }) => (
          <Form>
            <Flex direction="column" gap="1rem">
              <TextField
                name="full_name"
                label="Full Name"
                onChange={handleChange}
                value={values.full_name}
                hasError={!!errors.full_name}
                errorMessage={errors.full_name}
              />
              <TextField
                name="username"
                label="Username"
                onChange={handleChange}
                value={values.username}
                hasError={!!errors.username}
                errorMessage={errors.username}
              />
              <TextField
                name="email"
                label="Email"
                onChange={handleChange}
                value={values.email}
                hasError={!!errors.email}
                errorMessage={errors.email}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                value={values.password}
                hasError={!!errors.password}
                errorMessage={errors.password}
              />
              <TextField
                name="whatsapp"
                label="WhatsApp"
                onChange={handleChange}
                value={values.whatsapp}
                hasError={!!errors.whatsapp}
                errorMessage={errors.whatsapp}
              />
              <SelectField
                name="gender"
                label="Gender"
                onChange={handleChange}
                value={values.gender}
                hasError={!!errors.gender}
                errorMessage={errors.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </SelectField>
              <TextField
                name="address"
                label="Address"
                onChange={handleChange}
                value={values.address}
                hasError={!!errors.address}
                errorMessage={errors.address}
              />
              <TextField
                name="country"
                label="Country"
                onChange={handleChange}
                value={values.country}
                hasError={!!errors.country}
                errorMessage={errors.country}
              />
              <Button type="submit" isLoading={isSubmitting}>
                Sign Up
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Signup;