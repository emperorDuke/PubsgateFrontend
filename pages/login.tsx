import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../components/Button'
import Input from '../components/Input'
import { LOGIN_USER } from '../graphql/mutations/loginUser'
import { setCookie } from 'cookies-next'
import { GET_AUTH_USER } from '../graphql/queries/getAuthUser'

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

const Login: NextPage = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: GET_AUTH_USER }],
  })

  React.useEffect(() => {
    if (!data) return

    setCookie('auth-token', data.tokenAuth.token, {
      maxAge: 60 * 60 * 24,
    })

    setCookie('refresh-token', data.tokenAuth.refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
    })
  }, [data])

  const handleSubmit = (values: LoginValue) => {
    loginUser({ variables: values }).catch(() => {})
  }

  return (
    <main>
      <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
            {error && (
              <span className="block h-4 mb-3 text-md capitalize text-red-500 pb-6">
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
                  <Button type="submit" fullWidth>
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
