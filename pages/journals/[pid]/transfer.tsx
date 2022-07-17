import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { CREATE_JOURNAL } from '../../../graphql/mutations/createJournal'
import { useRouter } from 'next/router'

interface InitialValues {
  [key: string]: string
  email: string
}

const TransferControlPage: NextPage = () => {
  const [transferControl, { loading, error }] = useMutation(CREATE_JOURNAL)
  const router = useRouter()

  const initialValues: InitialValues = {
    email: '',
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('please input a valid email')
      .required("Please input the editor-in-chief's email"),
  })

  const handleSubmit = async (value: InitialValues) => {
    try {
      await transferControl({
        variables: {
          journalId: router.query.pid,
          email: value.email,
        },
      })
    } catch (e) {}
  }

  return (
    <main>
      <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
            <span>{error && error.message}</span>
            <h1 className="text-2xl font-bold mb-6">Transfer management</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {Object.keys(initialValues).map((key) => (
                    <Input
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

export default TransferControlPage
