import React from 'react'
import { gql } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import { Journal, ServerProps } from '../../../@globalTypes'
import Layout from '../../../components/Layout'
import UserToggler from '../../../components/UserToggler'
import client from '../../../server-apollo-client'

interface Props {
  journals: Partial<Journal>[]
}

const EditorAffiliations: React.FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-6">
      <section className="col-start-1 col-span-6 md:col-start-2 md:col-span-4 p-3 bg-layout-col rounded-lg border border-border-col">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-header-col">
          Journals
        </h2>
        <ul>
          {props.journals.map((journal) => (
            <li className="text-lg pb-3 capitalize" key={journal.id}>
              <Link href={`/manager/journal/${journal.id}`}>
                <a className="flex flex-nowrap items-center w-full hover:text-primary hover:underline focus:text-blue-500">
                  <div className="relative w-12 h-12 mr-6">
                    {typeof journal.logo == 'string' && (
                      <Image
                        src={journal.logo}
                        alt="green"
                        layout="fill"
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <span className="block truncate">{journal.name}</span>
                  <div className="grow" />
                  <time
                    dateTime={journal.editorLastLogin}
                    className="text-sm ml-3 block"
                  >
                    {journal.editorLastLogin}
                  </time>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const ReviewerAffiliations = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-header-col">
          Journals
        </h2>
        <p>Biofuel ...2days ago</p>
      </div>
    </div>
  )
}

const UserAffiliationPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <main>
        <div className="container mx-auto px-3 md:px-0 py-3">
          <UserToggler
            headings={
              <h1 className="text-4xl font-bold text-header-col">
                Account Affiliations
              </h1>
            }
          >
            {({ userType }) => (
              <React.Fragment>
                {userType === 'editor' ? (
                  <EditorAffiliations {...props} />
                ) : (
                  <ReviewerAffiliations />
                )}
              </React.Fragment>
            )}
          </UserToggler>
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps: ServerProps<Props> = async (ctx) => {
  // const { data } = await client(ctx).query({
  //   query: gql`
  //     query GetEditorJournals {
  //       editorJournals {
  //         id
  //         name
  //         issn
  //         slug
  //         logo
  //         editorLastLogin
  //       }
  //     }
  //   `,
  // })

  return {
    props: {
      journals: [
        {
          __typename: 'Journal',
          id: '345-6646mi-646',
          name: 'biofuel',
          slug: 'biofuel',
          issn: '1234-4576',
          logo: '/green.jpg',
          editorLastLogin: new Date().toISOString(),
        },
        {
          __typename: 'Journal',
          id: '345-66334mi-646',
          name: 'nigerian societies of microbiology',
          slug: 'biofuel',
          issn: '1234-4576',
          logo: '/green.jpg',
          editorLastLogin: new Date().toISOString(),
        },
        {
          __typename: 'Journal',
          id: '345-344546mi-646',
          name: 'mechanical engineering societies of america',
          slug: 'biofuel',
          issn: '1234-4576',
          logo: '/green.jpg',
          editorLastLogin: new Date().toISOString(),
        },
      ],
    },
  }
}

export default UserAffiliationPage
