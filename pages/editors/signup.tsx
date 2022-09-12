import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { CREATE_EDITOR } from '../../graphql/mutations/createEditor'
import Layout from '../../components/Layout'

interface InitialValues {
  [key: string]: string
  affiliation: string
  phoneNumber: string
  specialisation: string
}

const validationSchema = yup.object({
  affiliation: yup
    .string()
    .required('Please input your first name')
    .min(1, 'Please inout a valid first name')
    .max(20, 'Please input a valid first name'),
  phoneNumber: yup
    .string()
    .required('Please input your last name')
    .min(2, 'Please input a valid last name')
    .max(20, 'Please input a valid last name'),
  specialisation: yup.string().required(),
})

const initialValues: InitialValues = {
  affiliation: '',
  phoneNumber: '',
  specialisation: '',
}

const inputType: InitialValues = {
  affiliation: '',
  phoneNumber: '',
  specialisation: '',
}

const EditorSignUpPage: NextPage = () => {
  const [createEditor, { loading, error }] = useMutation(CREATE_EDITOR)

  const handleSubmit = async (value: InitialValues) => {
    try {
      await createEditor({
        variables: {
          affiliation: value.affiliation,
          phoneNumber: value.phoneNumber,
          specialisation: value.specialisation,
        },
      })
    } catch (e) {}
  }

  return (
    <Layout>
      <main>
        <div className="container mx-auto">
          <div className="grid grid-cols-6">
            <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
              <span>{error && error.message}</span>
              <h1 className="text-3xl font-bold mb-6 text-header-col">
                Registration
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

export default EditorSignUpPage
