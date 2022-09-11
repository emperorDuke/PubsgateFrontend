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
import { EDIT_JOURNAL_INFORMATION } from '../../../../graphql/mutations/journalInformation'
import client from '../../../../server-apollo-client'
import { GET_INFORMATION_HEADINGS } from '../../../../graphql/queries/getInformationHeadings'
import Editor from '../../../../components/Editor'
import { EDIT_JOURNAL_SUBJECT_AREA } from '../../../../graphql/mutations/journalSubjectArea'
import Input from '../../../../components/Input'
import { PlusIcon, XIcon } from '@heroicons/react/solid'
import clsx from 'classNames'

interface JournalSectionProps {
  panelResolver: PanelCallback['resolver']
}

interface InformationSection extends JournalSectionProps {
  informationHeadings: InformationHeading[]
}

interface Props {
  informationHeadings: InformationHeading[]
}

interface SubjectArea {
  id: number | string
  name: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  label: string
  error: string
}

const JournalSection: ComponentType<JournalSectionProps> = (props) => {
  const [editJournal, { error, data, loading }] = useMutation(EDIT_JOURNAL)
  const router = useRouter()

  const publicationFrequencies = [
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
  ]

  const handleSubmission = async (values: Journal) => {
    await editJournal({
      variables: {
        journalId: router.query.journalId,
        ...values,
      },
    })
  }

  const validationSchema = yup.object({
    publicationStartDate: yup.date().notRequired().nullable(),
    isoAbbreviation: yup.string().notRequired(),
    publicationFrequency: yup
      .string()
      .oneOf(publicationFrequencies.map((f) => f.value))
      .notRequired(),
    logo: yup.mixed().notRequired(),
  })

  const initialValue: Journal = {
    name: '',
    issn: '',
    discipline: '',
    publicationStartDate: new Date().toLocaleDateString(),
    publicationFrequency: 'ANNUALLY',
    isoAbbreviation: '',
    logo: '',
  }

  const schema = {
    disabled: false,
    required: true,
  }

  const journalFieldType: FieldSchema<Journal> = {
    logo: {
      fieldType: 'file',
      ...schema,
    },
    name: {
      fieldType: 'input',
      ...schema,
      disabled: true,
    },
    issn: {
      fieldType: 'input',
      ...schema,
      disabled: true,
    },
    discipline: {
      fieldType: 'input',
      ...schema,
      disabled: true,
    },
    publicationStartDate: {
      fieldType: 'input',
      ...schema,
    },
    isoAbbreviation: {
      fieldType: 'input',
      ...schema,
    },
    publicationFrequency: {
      fieldType: 'select',
      ...schema,
      selectOptions: publicationFrequencies,
    },
  }

  return (
    <div className="grid grid-cols-6 bg-layout-col rounded-b-lg border border-border-col">
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-6">
        <p>{error && error.message}</p>
        <h2 className="text-xl font-bold mb-6">Edit Credentials</h2>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmission}
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

  const handleSubmission = async (values: { [key: string]: string }) => {
    await editInformation({
      variables: {
        journalId: router.query.journalId,
        ...values,
      },
    })
  }

  const initialValues = React.useMemo(() => {
    const values: { [key: string]: string } = {}

    props.informationHeadings.forEach((heading) => {
      values[heading.name] = JSON.stringify({
        type: 'paragraph',
        children: [{ text: '' }],
      })
    })

    return values
  }, [props.informationHeadings])

  const validationSchema = React.useMemo(() => {
    const values: { [key: string]: yup.StringSchema } = {}

    props.informationHeadings.forEach((heading) => {
      values[heading.name] = yup
        .string()
        .required(`${heading.name} is required`)
    })

    return yup.object({ ...values })
  }, [props.informationHeadings])

  return (
    <div className="grid grid-cols-6 bg-layout-col rounded-b-lg border border-border-col">
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-3">
        <h2 className="text-2xl font-bold mb-6">Edit information</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmission}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {props.informationHeadings.map((heading) => (
                <div key={heading.id}>
                  <label
                    htmlFor={heading.name}
                    className="text-header-col capitalize block mb-3 font-semibold"
                  >
                    {heading.name}
                  </label>
                  <div id={heading.name}>
                    <Editor
                      onChange={formik.handleChange}
                      value={formik.values[heading.name] as string}
                      size="small"
                      variant="minimal"
                    />
                  </div>
                  <p className="h-4 mb-3 text-xs capitalize text-red-500 p-1">
                    {formik.errors[heading.name] ||
                      (ops.error && ops.error.message)}
                  </p>
                </div>
              ))}

              <Button type="submit" fullWidth disabled={formik.isSubmitting}>
                {ops.loading ? 'loading' : 'submit'}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

const SubjectAreaSection: ComponentType<JournalSectionProps> = (props) => {
  const router = useRouter()
  const [editSubjectArea, ops] = useMutation(EDIT_JOURNAL_SUBJECT_AREA)
  const [subjectAreas, setSubjectArea] = React.useState<SubjectArea[]>([
    {
      id: 1,
      name: '',
      action: 'CREATE',
      label: `subject ${1}`,
      error: '',
    },
  ])

  const checkError = () => {
    const errorId = subjectAreas.findIndex((s) => !s.name)

    return {
      id: errorId !== -1 ? errorId + 1 : 0,
    }
  }

  const handleChange = (id: number | string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubjectArea((subjectAreas) =>
        subjectAreas.map((v) => {
          if (v.id === id) {
            v.name = e.target.value
            v.error = ''
          }

          return v
        }),
      )
    }
  }

  const addSubjectArea = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const errorId = checkError().id

    if (errorId) {
      insertError(errorId)
      return
    }

    setSubjectArea((areas) => [
      ...areas,
      {
        id: areas.length + 1,
        name: '',
        action: 'CREATE',
        label: `subject ${areas.length + 1}`,
        error: '',
      },
    ])
  }

  const deleteSubjectArea = (id: number | string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (subjectAreas.length === 1) return

      setSubjectArea((areas) =>
        areas
          .filter((v) => v.id !== id)
          .map((v, i) => ({ ...v, label: `subject ${i + 1}` })),
      )
    }
  }

  const insertError = (id: number | string) => {
    setSubjectArea((areas) =>
      areas.map((v) => {
        if (v.id === id) {
          v.error = 'Field is empty'
        }

        return v
      }),
    )
  }

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errorId = checkError().id

    if (errorId) {
      insertError(errorId)
      return
    }

    await editSubjectArea({
      variables: {
        journalId: router.query.journalId,
        ...subjectAreas,
      },
    })
  }

  return (
    <div className="grid grid-cols-6 bg-layout-col rounded-b-lg border border-border-col">
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-3">
        <p>{ops.error && ops.error.message}</p>
        <h2 className="text-xl font-bold mb-6">Add Subject Areas</h2>
        <form onSubmit={handleSubmission}>
          {subjectAreas.map((value) => (
            <div key={value.id} className="flex flex-nowrap">
              <Input
                value={value.name}
                label={value.label}
                onChange={handleChange(value.id)}
                errorMessage={value.error}
                rightSlot={
                  <Button
                    variant="icon"
                    className="ml-1"
                    size="x-small"
                    onClick={deleteSubjectArea(value.id)}
                  >
                    <XIcon />
                  </Button>
                }
              />
            </div>
          ))}
          <Button
            variant="icon"
            onClick={addSubjectArea}
            className="border border-2 border-primary mb-6"
          >
            <PlusIcon className="text-primary" />
          </Button>
          <Button fullWidth type="submit">
            submit
          </Button>
        </form>
      </div>
    </div>
  )
}

const EditJournalPage: NextPage<Props> = (props) => {
  const cssClassNames = [
    'text-2xl font-bold mb-1',
    'bg-layout-col p-3 text-header-col',
    'border border-border-col',
    'active:border-black',
  ]

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-6 text-header-col">
          Journal Management Settings
        </h1>
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-6">
            <ExpansionPanel totalPanel={3} accordion>
              {({ resolver, activeIndex }) => (
                <>
                  <ExpansionPanel.Item index={0}>
                    <ExpansionPanel.Header
                      className={clsx(cssClassNames, {
                        'rounded-t-lg': activeIndex === 0,
                        'rounded-lg': activeIndex !== 0,
                      })}
                    >
                      Journal credentials
                    </ExpansionPanel.Header>
                    <JournalSection panelResolver={resolver} />
                  </ExpansionPanel.Item>

                  <ExpansionPanel.Item index={1}>
                    <ExpansionPanel.Header
                      className={clsx(cssClassNames, {
                        'rounded-t-lg': activeIndex === 1,
                        'rounded-lg': activeIndex !== 1,
                      })}
                    >
                      Journal information
                    </ExpansionPanel.Header>
                    <JournalInfoSection
                      panelResolver={resolver}
                      informationHeadings={props.informationHeadings}
                    />
                  </ExpansionPanel.Item>

                  <ExpansionPanel.Item index={2}>
                    <ExpansionPanel.Header
                      className={clsx(cssClassNames, {
                        'rounded-t-lg': activeIndex === 2,
                        'rounded-lg': activeIndex !== 2,
                      })}
                    >
                      Journal subject areas
                    </ExpansionPanel.Header>
                    <SubjectAreaSection panelResolver={resolver} />
                  </ExpansionPanel.Item>
                </>
              )}
            </ExpansionPanel>
          </div>
        </div>
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
