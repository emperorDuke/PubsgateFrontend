import React from 'react'
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
  JournalSubjectArea,
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
import { Descendant } from 'slate'
import { GET_JOURNAL_SUBJECT_AREAS } from '../../../../graphql/queries/journalSubjectAreas'

interface JournalSectionProps {
  panelResolver: PanelCallback['resolver']
}

interface InformationSection extends JournalSectionProps {
  informationHeadings: InformationHeading[]
}

interface SubjectAreaSection extends JournalSectionProps {
  subjectAreas: JournalSubjectArea[]
}

interface Props {
  informationHeadings: InformationHeading[]
  subjectAreas: JournalSubjectArea[]
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

const JournalSection: React.FC<JournalSectionProps> = (props) => {
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

const JournalInfoSection: React.FC<InformationSection> = (props) => {
  const router = useRouter()
  const [editInformation, ops] = useMutation(EDIT_JOURNAL_INFORMATION)
  const [sections, setSections] = React.useState<InfoSchema[]>([])

  React.useEffect(() => {
    setSections(
      props.informationHeadings.map((heading) => {
        return {
          id: heading.id,
          name: heading.name,
          error: '',
          value: [
            {
              type: 'paragraph',
              children: [{ text: '' }],
            } as Descendant,
          ],
        }
      }),
    )
  }, [setSections, props.informationHeadings])

  const hasError = () => {
    return sections.some(
      (s: any) =>
        !s.value[0].children[0].text || s.value[0].children[0].text.length < 20,
    )
  }

  const updateErrorSection = () => {
    setSections((sections) =>
      sections.map((s: any) => {
        if (
          !s.value[0].children[0].text ||
          s.value[0].children[0].text.length < 20
        ) {
          s.error = `${s.name} is required`
          return s
        }

        return s
      }),
    )
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

    if (hasError()) {
      updateErrorSection()

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
      sections.map((s) =>
        id === s.id
          ? {
              ...s,
              value,
            }
          : s,
      ),
    )
  }

  return (
    <div className="grid grid-cols-6 bg-layout-col rounded-b-lg border border-border-col">
      <div className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-3">
        <h2 className="text-2xl font-bold mb-6">Edit information</h2>
        <form onSubmit={handleSubmission}>
          {sections.map((section) => (
            <div key={section.id}>
              <label
                htmlFor={section.name}
                className="text-header-col capitalize block mb-3 font-semibold"
              >
                {section.name}
              </label>
              <div id={section.name}>
                <Editor
                  onChange={handleChange(section.id)}
                  value={section.value}
                  size="small"
                  variant="minimal"
                />
              </div>
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

  const addSubjectArea = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e && e.preventDefault()

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
      areas.map((v) => {
        if (v.id === id) {
          v.error = 'Field is empty'
        }

        return v
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
                    <SubjectAreaSection
                      panelResolver={resolver}
                      subjectAreas={props.subjectAreas}
                    />
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
  const {
    data: { informationHeadings },
  } = await client().query({
    query: GET_INFORMATION_HEADINGS,
  })

  // const {
  //   data: { subjectAreas },
  // } = await client().query({
  //   query: GET_JOURNAL_SUBJECT_AREAS,
  // })

  return { props: { informationHeadings, subjectAreas: [] } }
}
