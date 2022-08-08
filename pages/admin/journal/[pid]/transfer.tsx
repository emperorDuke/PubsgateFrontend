import React from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { NextPage, NextPageContext } from 'next'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { useRouter } from 'next/router'
import client from '../../../../server-apollo-client'
import { GET_EDITOR } from '../../../../graphql/queries/getEditor'
import { Editor } from '../../../../@globalTypes'
import { TRANSFER_JOURNAL } from '../../../../graphql/mutations/transferJournal'

interface InitialValues {
  [key: string]: string | undefined
  email?: string
  affiliation?: string
  firstName?: string
  lastName?: string
}

interface Props {
  editor: Editor
}

const TransferControlPage: NextPage<Props> = (props) => {
  const [transferControl, { data, loading, error }] = useMutation(
    TRANSFER_JOURNAL,
  )
  const router = useRouter()

  React.useEffect(() => {
    if (!data) return
    router.push('/')
  }, [data, router])

  const initialValues: InitialValues = {
    affiliation: props.editor.affiliation,
    firstName: props.editor.user.firstName,
    lastName: props.editor.user.lastName,
    email: props.editor.user.email,
  }

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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {Object.keys(initialValues).map((key) => (
                    <Input
                      required
                      disabled
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
                    {loading ? 'loading' : 'transfer'}
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

export const getServerSideProps = async (
  ctx: NextPageContext,
): Promise<{ props: Props }> => {
  const { data } = await client(ctx).query({
    query: GET_EDITOR,
    variables: { id: ctx.query.editorId },
  })

  return { props: { editor: data.editor } }
}

export default TransferControlPage
