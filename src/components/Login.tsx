import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Flex, TextField, Button, Text } from '@aws-amplify/ui-react';
import { authService } from '../services/api';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignItems="center" padding="2rem">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await authService.login(values);
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
              <Button type="submit" isLoading={isSubmitting}>
                Login
              </Button>
              <Text>
                Don't have an account? <a href="/signup">Sign up</a>
              </Text>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Login;