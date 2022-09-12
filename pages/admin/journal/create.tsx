import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage } from 'next'
import * as yup from 'yup'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { CREATE_JOURNAL } from '../../../graphql/mutations/createJournal'
import client from '../../../server-apollo-client'
import { GET_SUBJECT_DISCIPLINES } from '../../../graphql/queries/getSubjectDisciplines'
import Select from '../../../components/Select'
import { useRouter } from 'next/router'
import { Discipline } from '../../../@globalTypes'
import Layout from '../../../components/Layout'

interface InitialValues {
  [key: string]: string
  journalName: string
  issn: string
  discipline: string
}

interface Props {
  disciplines: Discipline[]
}

const CreateJournalManager: NextPage<Props> = (props) => {
  const [createJournal, { loading, error, data }] = useMutation(CREATE_JOURNAL)
  const router = useRouter()

  React.useEffect(() => {
    if (!data) return

    const journal = data.createJournal.journal

    router.push(`/admin/journal/${journal.id}/editor`)
  }, [data, router])

  const initialValues: InitialValues = {
    journalName: '',
    issn: '',
    discipline: '',
  }

  const fieldType: InitialValues = {
    journalName: 'input',
    issn: 'input',
    discipline: 'select',
  }

  const validationSchema = yup.object({
    journalName: yup
      .string()
      .required('Please input the journal name')
      .min(1, 'Please inout a valid journal name')
      .max(20, 'Please input a valid journal name'),
    issn: yup
      .string()
      .required('Please input the journal issn')
      .min(1, 'Please inout a valid journal issn')
      .max(20, 'Please input a valid journal issn'),
  })

  const handleSubmit = async (value: InitialValues) => {
    try {
      await createJournal({
        variables: {
          name: value.journalName,
          issn: value.issn,
          discipline: value.discipline,
        },
      })
    } catch (e) {}
  }

  const selectItems = React.useMemo(() => {
    return props.disciplines.map((s) => ({
      label: s.name,
      id: s.id,
      value: s.name,
    }))
  }, [props.disciplines])

  return (
    <Layout>
      <main>
        <div className="container mx-auto">
          <div className="grid grid-cols-6">
            <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
              <span>{error && error.message}</span>
              <h1 className="text-2xl font-bold mb-6">Create Journal</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    {Object.keys(initialValues).map((key) =>
                      fieldType[key] == 'input' ? (
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
                      ) : (
                        <Select
                          required
                          aria-required
                          label={key}
                          value={formik.values[key]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          items={selectItems}
                          errorMessage={
                            formik.touched[key] ? formik.errors[key] : null
                          }
                          key={key}
                        ></Select>
                      ),
                    )}
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

export const getServerSideProps = async (): Promise<{ props: Props }> => {
  const { data } = await client().query({
    query: GET_SUBJECT_DISCIPLINES,
  })

  return { props: { disciplines: data.disciplines } }
}

export default CreateJournalManager
