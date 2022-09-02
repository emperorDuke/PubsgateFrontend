import React, { ComponentType } from 'react'
import * as yup from 'yup'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { EDIT_JOURNAL } from '../../../../graphql/mutations/editJournal'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../../../components/Button'
import {
  FieldSchema,
  InformationHeading,
  Journal,
} from '../../../../@globalTypes'
import FormBuilder from '../../../../components/FormBuilder'
import ExpansionPanel from '../../../../components/ExpansionPanel'
import { PanelCallback } from '../../../../components/ExpansionPanel/@types'
import { EDIT_JOURNAL_INFORMATION } from '../../../../graphql/mutations/editJournalInformation'
import client from '../../../../server-apollo-client'
import { GET_INFORMATION_HEADINGS } from '../../../../graphql/queries/getInformationHeadings'
import Editor from '../../../../components/Editor'

interface JournalSectionProps {
  panelResolver: PanelCallback['next']
}

interface InformationSection extends JournalSectionProps {
  informationHeadings: InformationHeading[]
}

interface Props {
  informationHeadings: InformationHeading[]
}

const JournalSection: ComponentType<JournalSectionProps> = (props) => {
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

  return (
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
              <FormBuilder formik={formik} formSchema={journalFieldType} />
              <Button type="submit" fullWidth disabled={formik.isSubmitting}>
                {loading ? 'loading' : 'submit'}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

const JournalInfoSection: ComponentType<InformationSection> = (props) => {
  const [editInformation, ops] = useMutation(EDIT_JOURNAL_INFORMATION)
  const router = useRouter()

  const handleSubmission = async (values: Journal) => {
    await editInformation({
      variables: {
        journalId: router.query.journalId,
        ...values,
      },
    })
  }

  return (
    <div className="grid grid-cols-6">
      <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Journal information</h1>
        {props.informationHeadings.map((heading) => (
          <div key={heading.id}>
            <label>{heading.name}</label>
            <Editor />
          </div>
        ))}
      </div>
    </div>
  )
}

const SubjectAreaSection: ComponentType<JournalSectionProps> = (props) => {
  return <div></div>
}

const EditJournalPage: NextPage<Props> = (props) => {
  return (
    <main>
      <div className="container mx-auto">
        <ExpansionPanel totalPanel={3} accordion>
          {(panel) => (
            <>
              <ExpansionPanel.Item index={0}>
                <ExpansionPanel.Header className="text-2xl font-bold mb-6">
                  Edit Journal
                </ExpansionPanel.Header>
                <JournalSection panelResolver={panel.next} />
              </ExpansionPanel.Item>

              <ExpansionPanel.Item index={1}>
                <ExpansionPanel.Header className="text-2xl font-bold mb-6">
                  Edit Journal information
                </ExpansionPanel.Header>
                <JournalInfoSection
                  panelResolver={panel.next}
                  informationHeadings={props.informationHeadings}
                />
              </ExpansionPanel.Item>

              <ExpansionPanel.Item index={2}>
                <ExpansionPanel.Header className="text-2xl font-bold mb-6">
                  Journal subject areas
                </ExpansionPanel.Header>
                <SubjectAreaSection panelResolver={panel.next} />
              </ExpansionPanel.Item>
            </>
          )}
        </ExpansionPanel>
      </div>
    </main>
  )
}

export default EditJournalPage

export const getServerSideProps = async (): Promise<{ props: Props }> => {
  const { data } = await client().query({
    query: GET_INFORMATION_HEADINGS,
  })

  return { props: { informationHeadings: data.informationHeadings } }
}
