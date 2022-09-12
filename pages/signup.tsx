import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../components/Button'
import Input from '../components/Input'
import { PASSWORD_REGEX } from '../utils'
import { CREATE_USER } from '../graphql/mutations/createUser'
import Head from 'next/head'
import Layout from '../components/Layout'

interface InitialValues {
  [key: string]: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  country: string
  state: string
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('Please input your first name')
    .min(1, 'Please inout a valid first name')
    .max(20, 'Please input a valid first name'),
  lastName: yup
    .string()
    .required('Please input your last name')
    .min(2, 'Please input a valid last name')
    .max(20, 'Please input a valid last name'),
  email: yup
    .string()
    .email('please input a valid Email')
    .required('Please input your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      PASSWORD_REGEX,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .when('password', {
      is: (password: string | undefined) => !!password,
      then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
    }),
  country: yup.string().required('Please input your country'),
  state: yup.string().required('Please input your state'),
})

const initialValues: InitialValues = {
  firstName: 'John',
  lastName: 'effiom',
  email: 'effiomduke@gmail.com',
  password: 'Pastworld@12',
  confirmPassword: 'Pastworld@12',
  country: 'Nigeria',
  state: 'Lagos',
}

const inputType: InitialValues = {
  firstName: 'text',
  lastName: 'text',
  email: 'email',
  password: 'password',
  confirmPassword: 'password',
  country: 'text',
  state: 'text',
}

const SignUp: NextPage = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER)

  const handleSubmit = async (value: InitialValues) => {
    try {
      await createUser({
        variables: {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          country: value.country,
          state: value.state,
        },
      })
    } catch (e) {}
  }

  return (
    <Layout>
      <Head>
        <title>Author registration | Pubsgate</title>
        <meta name="description" content="create author account" />
      </Head>
      <main>
        <div className="container mx-auto">
          <div className="grid grid-cols-6">
            <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
              <span>{error && error.message}</span>
              <h1 className="text-3xl font-bold mb-6 text-header-col">
                Author Registration
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
    </Layout>
  )
}

export default SignUp
