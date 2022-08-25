import React from 'react'
import * as yup from 'yup'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { EDIT_JOURNAL } from '../../../../graphql/mutations/editJournal'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import { FieldSchema, Journal } from '../../../../@globalTypes'

const journalValidationSchema = yup.object({
  publicationStartDate: yup.date().notRequired().nullable(),
  isoAbbreviation: yup.string().notRequired(),
  publicationFrequency: yup
    .string()
    .oneOf(['ANNUALLY', 'BIANNUALLY', 'TRIANUALLY', 'QUARTERLY'])
    .notRequired(),
  logo: yup.mixed().notRequired(),
})

const journalInitialValue: Journal = {
  name: '',
  issn: '',
  discipline: '',
  publicationStartDate: new Date().toLocaleDateString(),
  publicationFrequency: 'ANNUALLY',
  isoAbbreviation: '',
  logo: '',
}

const journalFieldType: FieldSchema<Journal> = {
  logo: {
    fieldType: 'file',
    disabled: false,
  },
  name: {
    fieldType: 'input',
    disabled: true,
  },
  issn: {
    fieldType: 'input',
    disabled: true,
  },
  discipline: {
    fieldType: 'input',
    disabled: true,
  },
  publicationStartDate: {
    fieldType: 'input',
    disabled: false,
  },
  isoAbbreviation: {
    fieldType: 'input',
    disabled: false,
  },
  publicationFrequency: {
    fieldType: 'select',
    disabled: false,
    selectOptions: [
      {
        id: 1,
        label: 'quarterly',
        value: 'QUARTERLY',
      },
      {
        id: 2,
        label: 'triannually',
        value: 'TRIANUALLY',
      },
      {
        id: 3,
        label: 'biannually',
        value: 'BIANNUALLY',
      },
      {
        id: 4,
        label: 'annually',
        value: 'ANNUALLY',
      },
    ],
  },
}

const EditJournalPage: NextPage = () => {
  const [editJournal, { error, data, loading }] = useMutation(EDIT_JOURNAL)
  const router = useRouter()

  const handleJournalSubmission = async (values: Journal) => {
    await editJournal({
      variables: {
        journalId: router.query.journalId,
        ...values,
      },
    })
  }

  return (
    <main>
      <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
            <span>{error && error.message}</span>
            <h1 className="text-2xl font-bold mb-6">Edit Journal</h1>
            <Formik
              initialValues={journalInitialValue}
              validationSchema={journalValidationSchema}
              onSubmit={handleJournalSubmission}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {Object.keys(journalInitialValue).map((key) => {
                    switch (journalFieldType[key].fieldType) {
                      case 'input':
                        return (
                          <Input
                            required
                            aria-required
                            label={key}
                            value={formik.values[key] as string}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errorMessage={
                              formik.touched[key] ? formik.errors[key] : null
                            }
                            key={key}
                          />
                        )
                      case 'select':
                        return (
                          <Select
                            required
                            aria-required
                            label={key}
                            value={formik.values[key] as string}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            items={journalFieldType[key].selectOptions}
                            errorMessage={
                              formik.touched[key] ? formik.errors[key] : null
                            }
                            key={key}
                          ></Select>
                        )
                      default:
                        return <input type="file" />
                    }
                  })}
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

export default EditJournalPage
