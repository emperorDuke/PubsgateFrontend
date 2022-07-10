import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../components/Button'
import Input from '../components/Input'

interface LoginValue {
  [key: string]: string
  email: string
  password: string
}

const validationSchema = yup.object({
  password: yup.string().required('Please enter your password'),
  email: yup
    .string()
    .email('please input a valid Email')
    .required('Please input your email'),
})

const initialValues: LoginValue = {
  email: '',
  password: '',
}

const inputType: LoginValue = {
  email: 'email',
  password: 'password',
}

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`

const GET_AUTH_USER = gql`
  query GetAuthUser {
    user {
      firstName
      lastName
      email
      country
      state
    }
  }
`

const Login: NextPage = () => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: GET_AUTH_USER }],
  })

  const handleSubmit = (values: LoginValue) => {
    loginUser({ variables: values })
  }

  return (
    <main>
      <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
            {error && (
              <span className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
                {error.message}
              </span>
            )}
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {Object.keys(initialValues).map((key) => (
                    <Input
                      type={inputType[key]}
                      required
                      aria-required
                      label={key}
                      value={formik.values[key]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorMessage={
                        formik.touched[key] ? formik.errors[key] : null
                      }
                      key={key}
                    />
                  ))}
                  <Button
                    type="submit"
                    fullWidth
                    disabled={formik.isSubmitting}
                  >
                    {loading ? 'loading' : 'submit'}
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
