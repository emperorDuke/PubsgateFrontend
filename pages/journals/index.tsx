import { Dialog, Tab } from '@headlessui/react'
import { ArrowRightIcon, FilterIcon, KeyIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import Filter from '../../components/Filter'
import Select from '../../components/Select'
import Layout from '../../components/Layout'

const tabs = [
  {
    label: 'journals',
    count: 1234,
  },
  {
    label: 'Articles',
    count: 1234,
  },
]

const journals = [
  {
    id: `1`,
    name: 'Animal biotechnology',
    logo: '/green.jpg',
    isoAbbreviation: 'pgab',
    issn: '1234-4567',
    description:
      'Publishes international open access research in medical sciences with particular focus on diseases in the Middle East and North Africa.',
    accessType: 'OPEN ACCESS',
  },
  {
    id: `2`,
    name: 'Animal biotechnology',
    logo: '/green.jpg',
    isoAbbreviation: 'pgab',
    issn: '1234-4567',
    description:
      'Publishes international open access research in medical sciences with particular focus on diseases in the Middle East and North Africa.',
    accessType: 'OPEN ACCESS',
  },
]

const JournalsPage: NextPage = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleDialogOpen = () => {
    setIsOpen(true)
  }

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  return (
    <Layout>
      <Head>
        <title>Find Journals or Articles | Pubsgate</title>
        <meta
          name="description"
          content="Journals available under this subjects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dialog
        open={isOpen}
        onClose={handleDialogOpen}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-1 rounded">
          <Dialog.Panel className="mx-auto bg-white h-full w-full p-3">
            <Filter onClose={handleDialogClose} dismissable />
          </Dialog.Panel>
        </div>
      </Dialog>

      <main>
        <div className="container mx-auto px-3 md:px-0 py-6 grid grid-cols-4 gap-6">
          <div className="col-span-1 hidden md:block rounded-t-lg">
            <Filter onClose={handleDialogClose} />
          </div>
          <div className="md:col-span-3 col-span-full">
            <section>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-header-col">
                Find Journals or Articles
              </h1>
              <SearchBar variant="contained" depressSearchBtn />
            </section>

            <div className="md:hidden">
              <hr className="my-3 bg-border-col h"></hr>

              <section className="flex my-3 items-center">
                <p className="text-2xl md:text-3xl font-bold text-header-col">
                  Filters
                </p>
                <div className="grow"></div>
                <Button
                  variant="outlined"
                  onClick={handleDialogOpen}
                  leftIcon={<FilterIcon className="w-5 h-5" />}
                >
                  show filters
                </Button>
              </section>

              <hr className="my-3 bg-border-col h"></hr>
            </div>

            <section className="mt-3">
              <h1 className="text-lg md:text-2xl font-bold mb-3 text-header-col">
                Searched results
              </h1>
              <h3 className="text-sms md:text-base font-semibold mb-3">
                Showing 1-10 of 448,429 results for search: All Subjects:
                Bioscience
              </h3>
              <Tab.Group>
                <Tab.List className="space-x-3">
                  {tabs.map((t) => (
                    <Tab
                      as="button"
                      key={t.label}
                      className="uppercase border-solid border border-transparent bg-black text-white p-3 rounded-t-lg active:border-slate-300 hover:bg-slate-500"
                    >
                      {`${t.label} (${t.count})`}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="bg-slate-200 p-6 rounded-b-lg rounded-r-lg border border-solid border-gray-300">
                  <Tab.Panel>
                    <div className="grid grid-cols-8 gap-6">
                      <div className="col-span-4">
                        <Select></Select>
                      </div>
                      <div className="col-span-4">
                        <Select></Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {journals.map((j) => (
                        <div
                          className="col-span-8 md:col-span-2 shadow-xl border-solid border-x border-b rounded-lg hover:shadow-2xl bg-white"
                          key={j.id}
                        >
                          <Link href={`/journals/${j.isoAbbreviation}`}>
                            <a>
                              <div className="relative h-40">
                                <Image
                                  src={j.logo}
                                  alt={j.name}
                                  layout="fill"
                                  className="rounded-t-lg"
                                />
                              </div>
                              <section className="p-3">
                                <h1 className="text-base md:text-lg font-bold flex flex-nowrap items-center">
                                  <span className="pr-3 text-slate-600">
                                    {j.name}
                                  </span>
                                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 mt-1 text-slate-600" />
                                </h1>
                                <p className="text-sm md:text-base font-semibold mb-3 text-slate-600">
                                  {`ISSN: ${j.issn}`}
                                </p>
                                <p className="text-sm md:text-base line-clamp-3">
                                  {j.description}
                                </p>
                                <div className="flex mt-3">
                                  <div className="flex items-center bg-orange-500 px-2 py-1 border-solid border-2 border-transparent rounded-lg">
                                    <KeyIcon className="w-5 h-5 mr-2 text-white" />
                                    <span className="text-xs text-white uppercase">
                                      {j.accessType}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            </a>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="grid grid-cols-8 gap-6">
                      <div className="col-span-4">
                        <Select></Select>
                      </div>
                      <div className="col-span-4">
                        <Select></Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {journals.map((j) => (
                        <div
                          className="col-span-8 md:col-span-2 shadow-xl border-solid border-x border-b rounded-lg hover:shadow-2xl bg-white"
                          key={j.id}
                        >
                          <Link href={`/journals/${j.isoAbbreviation}`}>
                            <a>
                              <div className="relative h-40">
                                <Image
                                  src={j.logo}
                                  alt={j.name}
                                  layout="fill"
                                  className="rounded-t-lg"
                                />
                              </div>
                              <section className="p-3">
                                <h1 className="text-base md:text-lg font-bold flex flex-nowrap items-center">
                                  <span className="pr-3 text-slate-600">
                                    {j.name}
                                  </span>
                                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 mt-1 text-slate-600" />
                                </h1>
                                <p className="text-sm md:text-base font-semibold mb-3 text-slate-600">
                                  {`ISSN: ${j.issn}`}
                                </p>
                                <p className="text-sm md:text-base line-clamp-3">
                                  {j.description}
                                </p>
                                <div className="flex mt-3">
                                  <div className="flex items-center bg-orange-500 px-2 py-1 border-solid border-2 border-transparent rounded-lg">
                                    <KeyIcon className="w-5 h-5 mr-2 text-white" />
                                    <span className="text-xs text-white uppercase">
                                      {j.accessType}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            </a>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default JournalsPage
