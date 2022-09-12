import { useMutation } from '@apollo/client'
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid'
import clsx from 'classNames'
import { Formik } from 'formik'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Descendant } from 'slate'
import * as yup from 'yup'
import {
  Discipline,
  FieldSchema,
  Journal,
  journalInformation,
  JournalSubjectArea,
  PublicationFrequency,
  ServerPublicationFrequency,
} from '../../../../@globalTypes'
import Button from '../../../../components/Button'
import Editor from '../../../../components/Editor'
import ExpansionPanel from '../../../../components/ExpansionPanel'
import FormBuilder from '../../../../components/FormBuilder'
import Input from '../../../../components/Input'
import Layout from '../../../../components/Layout'
import { EDIT_JOURNAL } from '../../../../graphql/mutations/editJournal'
import { EDIT_JOURNAL_INFORMATION } from '../../../../graphql/mutations/journalInformation'
import { EDIT_JOURNAL_SUBJECT_AREA } from '../../../../graphql/mutations/journalSubjectArea'
import { GET_JOURNAL_CREDENTIALS } from '../../../../graphql/queries/journalCredential'
import { GET_JOURNAL_INFORMATION } from '../../../../graphql/queries/journalInformations'
import { GET_JOURNAL_SUBJECT_AREAS } from '../../../../graphql/queries/journalSubjectAreas'
import client from '../../../../server-apollo-client'

interface InformationSection {
  journalInformation: journalInformation[]
}

interface SubjectAreaSection {
  subjectAreas: JournalSubjectArea[]
}

interface JournalCredential {
  journal: Journal
}

interface SubjectArea {
  id: number | string
  name: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  label: string
  error: string
  fromServer: boolean
}

interface InfoSchema {
  id: number | string
  value: Descendant[]
  name: string
  error: string
}

interface FrequencyType {
  id: number
  label: ServerPublicationFrequency
  value: PublicationFrequency
}

interface Props {
  subjectAreas: JournalSubjectArea[]
  journalInformation: journalInformation[]
  journal: Journal
}

const JournalSection: React.FC<JournalCredential> = (props) => {
  const publicationFrequencies: FrequencyType[] = [
    {
      id: 1,
      label: 'quarterly',
      value: 'QUARTERLY',
    },
    {
      id: 2,
      label: 'tri-annually',
      value: 'TRI_ANNUALLY',
    },
    {
      id: 3,
      label: 'bi-annually',
      value: 'BI_ANNUALLY',
    },
    {
      id: 4,
      label: 'annually',
      value: 'ANNUALLY',
    },
  ]

  const [editJournal, { error, data, loading }] = useMutation(EDIT_JOURNAL)
  const [initialValues, setInitialValues] = React.useState({})
  const router = useRouter()

  React.useEffect(() => {
    const excludeFields = ['id', 'slug', '__typename']
    const values: Partial<Journal> = {}

    Object.keys(props.journal)
      .filter((key) => !excludeFields.includes(key))
      .forEach((field) => {
        if (field === 'discipline') {
          values[field] = (props.journal[field] as Partial<Discipline>).name
        } else if (field === 'publicationFrequency') {
          values[field] = getDefaultFrequency(field)
        } else {
          values[field] = props.journal[field] || ''
        }
      })

    setInitialValues(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.journal])

  const getDefaultFrequency = (field: string): PublicationFrequency => {
    const frequency = publicationFrequencies.find(
      (f) => f.label === props.journal[field],
    )

    return (frequency && frequency.value) || 'BI_ANNUALLY'
  }

  const handleSubmission = async (values: Partial<Journal>) => {
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
    logo: yup.mixed().notRequired(),
    publicationFrequency: yup
      .string()
      .oneOf(publicationFrequencies.map((f) => f.value))
      .notRequired(),
  })

  const schema = {
    disabled: false,
    required: true,
  }

  const journalFieldType: FieldSchema<Partial<Journal>> = {
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
      selectOptions: publicationFrequencies,
      ...schema,
    },
  }

  return (
    <div className="grid grid-cols-6 bg-layout-col rounded-b-lg border border-border-col">
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-6">
        <p>{error && error.message}</p>
        <h2 className="text-xl font-bold mb-6">Edit Credentials</h2>
        {initialValues && Object.keys(initialValues).length && (
          <Formik
            initialValues={initialValues}
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
        )}
      </div>
    </div>
  )
}

const JournalInfoSection: React.FC<InformationSection> = (props) => {
  const router = useRouter()
  const [editInformation, ops] = useMutation(EDIT_JOURNAL_INFORMATION)
  const [sections, setSections] = React.useState<InfoSchema[]>([])

  React.useEffect(() => {
    if (props.journalInformation && props.journalInformation.length) {
      setSections(
        props.journalInformation.map((info) => {
          return {
            id: info.id,
            name: info.heading.name || '',
            error: '',
            value: (info.content && JSON.parse(info.content)) || [
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
            ],
          }
        }),
      )
    }
  }, [setSections, props.journalInformation])

  const errorChecker = () => {
    const hasError = ({ value }: InfoSchema) => {
      return value.every(({ children }) => {
        if (
          children &&
          typeof children !== 'boolean' &&
          typeof children !== 'string'
        ) {
          return children.every(({ text }) => !text && text.length < 50)
        } else {
          return true
        }
      })
    }

    return {
      hasError: sections.some((section) => hasError(section)),
      nextSections: sections.map((section) => {
        if (hasError(section)) {
          section.error = `${section.name} is required`
          return section
        }

        return section
      }),
    }
  }

  const getValues = () => {
    return sections.map((section) => {
      return {
        headingId: section.id,
        content: JSON.stringify(section.value),
      }
    })
  }

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault()

    const error = errorChecker()

    if (error.hasError) {
      setSections(error.nextSections)
      return
    }

    await editInformation({
      variables: {
        journalId: router.query.journalId,
        information: getValues(),
      },
    })
  }

  const handleChange = (id: number | string) => (value: Descendant[]) => {
    setSections((sections) =>
      sections.map((section) => {
        if (id === section.id) {
          return {
            ...section,
            value,
          }
        }
        return section
      }),
    )
  }

  return (
    <div className="grid grid-cols-6 bg-layout-col rounded-b-lg border border-border-col">
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-3">
        <h2 className="text-xl font-bold mb-6">Edit information</h2>
        <form onSubmit={handleSubmission}>
          {sections.map((section) => (
            <div key={section.id}>
              <p className="text-header-col capitalize block mb-3 font-semibold">
                {section.name}
              </p>
              <Editor
                onChange={handleChange(section.id)}
                value={section.value}
                size="small"
                variant="minimal"
              />
              <p className="h-4 mb-3 text-xs capitalize text-red-500 p-1">
                {section.error || (ops.error && ops.error.message)}
              </p>
            </div>
          ))}

          <Button type="submit" fullWidth>
            {ops.loading ? 'loading' : 'submit'}
          </Button>
        </form>
      </div>
    </div>
  )
}

const SubjectAreaSection: React.FC<SubjectAreaSection> = (props) => {
  const router = useRouter()
  const [editSubjectArea, ops] = useMutation(EDIT_JOURNAL_SUBJECT_AREA)
  const [subjectAreas, setSubjectArea] = React.useState<SubjectArea[]>([])
  const [subjectTrash, setTrash] = React.useState<Partial<SubjectArea>[]>([])

  React.useEffect(() => {
    if (props.subjectAreas && props.subjectAreas.length) {
      setSubjectArea(
        props.subjectAreas.map((area, i) => ({
          ...area,
          label: `subject ${i + 1}`,
          error: '',
          action: 'UPDATE',
          fromServer: true,
        })),
      )
    } else {
      setSubjectArea([
        {
          id: 1,
          name: '',
          action: 'CREATE',
          label: `subject ${1}`,
          error: '',
          fromServer: false,
        },
      ])
    }
  }, [props.subjectAreas])

  const checkError = () => {
    const errorId = subjectAreas.findIndex((s) => !s.name)

    return {
      id: errorId !== -1 ? errorId + 1 : 0,
    }
  }

  const handleChange = (id: number | string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubjectArea((subjectAreas) =>
        subjectAreas.map((area) => {
          if (area.id === id) {
            area.name = e.target.value
            area.error = ''
          }

          return area
        }),
      )
    }
  }

  const addSubjectArea = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()

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
        fromServer: false,
      },
    ])
  }

  const trashSubjectArea = (id: number | string) => {
    setTrash((trash) =>
      trash.concat(
        subjectAreas
          .filter((area) => area.id === id && area.fromServer)
          .map((area) => ({
            name: area.name,
            id: area.id,
            action: 'DELETE',
          })),
      ),
    )

    setSubjectArea((areas) =>
      areas
        .filter((area) => area.id !== id)
        .map((area, i) => ({ ...area, label: `subject ${i + 1}` })),
    )
  }

  const deleteSubjectArea = (id: number | string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (subjectAreas.length === 1 && !subjectAreas[0].fromServer) {
        return
      }

      if (subjectAreas.length === 1 && subjectAreas[0].fromServer) {
        trashSubjectArea(id)
        addSubjectArea()

        return
      }

      trashSubjectArea(id)
    }
  }

  const insertError = (id: number | string) => {
    setSubjectArea((areas) =>
      areas.map((area) => {
        if (area.id === id) {
          area.error = 'Field is empty'
        }

        return area
      }),
    )
  }

  const getValues = (): Array<Partial<SubjectArea>> => {
    return subjectAreas.map((area) => {
      if (area.action === 'CREATE') {
        return {
          name: area.name,
          action: area.action,
        }
      } else {
        return {
          name: area.name,
          action: area.action,
          id: area.id,
        }
      }
    })
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
        subjectAreas: getValues().concat(subjectTrash),
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
                    onClick={deleteSubjectArea(value.id)}
                  >
                    <XCircleIcon className="text-header-col" />
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
    <Layout>
      <main>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold my-6 text-header-col">
            Journal Management Settings
          </h1>
          <div className="grid grid-cols-6">
            <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-6">
              <ExpansionPanel totalPanel={3} accordion>
                {({ activeIndex }) => (
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
                      <JournalSection journal={props.journal} />
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
                        journalInformation={props.journalInformation}
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
                      <SubjectAreaSection subjectAreas={props.subjectAreas} />
                    </ExpansionPanel.Item>
                  </>
                )}
              </ExpansionPanel>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default EditJournalPage

export const getServerSideProps = async (
  ctx: NextPageContext,
): Promise<{ props: Props }> => {
  // const {
  //   data: { subjectAreas },
  // } = await client().query({
  //   query: GET_JOURNAL_SUBJECT_AREAS,
  // })

  // const {
  //   data: { journalInformation },
  // } = await client().query({
  //   query: GET_JOURNAL_INFORMATION,
  //   variables: {
  //     journalId: ctx.query.journalId,
  //   },
  // })

  // const {
  //   data: { journal },
  // } = await client().query({
  //   query: GET_JOURNAL_CREDENTIALS,
  //   variables: {
  //     id: ctx.query.journalId,
  //   },
  // })

  return {
    props: {
      subjectAreas: [
        {
          __typename: 'JournalSubjectArea',
          id: '2424',
          name: 'cell biology',
        },
      ],
      journalInformation: [
        {
          __typename: 'JournalInformation',
          id: '1',
          content: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'we are the best in the world', bold: true }],
            },
          ]),
          heading: {
            id: '1',
            name: 'about',
          },
        },
        {
          __typename: 'JournalInformation',
          id: '2',
          content: null,
          heading: {
            id: '2',
            name: 'aims and scope',
          },
        },
        {
          __typename: 'JournalInformation',
          id: '3',
          content: null,
          heading: {
            id: '3',
            name: 'author guidelines',
          },
        },
      ],
      journal: {
        __typename: 'Journal',
        id: '345-6646mi-646',
        name: 'biofuel',
        slug: 'biofuel',
        issn: '1234-4576',
        publicationStartDate: new Date().toISOString().split('T')[0],
        publicationFrequency: 'bi-annually',
        discipline: {
          id: 3,
          name: 'life science',
        },
        isoAbbreviation: null,
        logo: null,
      },
    },
  }
}
