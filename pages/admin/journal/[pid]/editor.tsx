import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { ADMIN_CREATE_EDITOR } from '../../../../graphql/mutations/adminCreateEditor'
import { useRouter } from 'next/router'
import Layout from '../../../../components/Layout'

interface InitialValues {
  [key: string]: string | undefined
  email: string
  affiliation?: string
  phoneNumber?: string
  specialisation?: string
}

const validationSchema = yup.object({
  affiliation: yup.string().notRequired(),
  phoneNumber: yup.string().notRequired(),
  specialisation: yup.string().notRequired(),
  email: yup
    .string()
    .email('please input a valid email')
    .required('Please input the editor email'),
})

const initialValues: InitialValues = {
  email: '',
  affiliation: '',
  phoneNumber: '',
  specialisation: '',
}

const inputType: { [key: string]: string } = {
  email: 'email',
  affiliation: 'text',
  phoneNumber: 'text',
  specialisation: 'text',
}

const CreateEditorPage: NextPage = () => {
  const [createAdminEditor, { loading, error, data }] = useMutation(
    ADMIN_CREATE_EDITOR,
  )
  const router = useRouter()

  React.useEffect(() => {
    if (!data) return

    const journalId = router.query.pid
    const editor = data.adminCreateEditor.editor

    router.push(`/admin/journal/${journalId}/transfer?editorId=${editor.id}`)
  }, [data, router])

  const handleSubmit = async (value: InitialValues) => {
    try {
      await createAdminEditor({
        variables: {
          journalId: router.query.pid,
          email: value.email,
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
              <h1 className="text-2xl font-bold mb-6">Create Editor</h1>
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

export default CreateEditorPage
