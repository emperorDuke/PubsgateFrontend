import { Dialog } from '@headlessui/react'
import { ArrowRightIcon, FilterIcon, KeyIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import Select from '../components/Select'

const JournalsPage: NextPage = () => {
  let [isOpen, setIsOpen] = React.useState(false)

  const handleDialogOpen = () => {
    setIsOpen(true)
  }

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  return (
    <React.Fragment>
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
        <div className="fixed inset-0 flex items-center justify-center p-1">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto rounded-lg bg-white h-full w-full">
            <Filter onClose={handleDialogClose} />
          </Dialog.Panel>
        </div>
      </Dialog>

      <main>
        <div className="container mx-auto px-3 md:px-0 py-6 grid grid-cols-4 gap-6">
          <div className="col-span-1 hidden md:block rounded-t-lg bg-slate-200 ">
            <Filter onClose={handleDialogClose} />
          </div>
          <div className="md:col-span-3 col-span-full">
            <section>
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-600">
                Find Journals or Articles
              </h1>
              <SearchBar variant="contained" depressSearchBtn />
            </section>

            <div className="md:hidden">
              <hr className="my-3 bg-gray-300 h-[2px]"></hr>

              <section className="flex my-3 items-center">
                <p className="text-2xl md:text-3xl font-bold text-slate-600">
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

              <hr className="my-3 bg-gray-300 h-[2px]"></hr>
            </div>

            <section className="mt-3">
              <h1 className="text-lg md:text-2xl font-bold mb-3 text-slate-600">
                Searched results
              </h1>
              <h3 className="text-base md:text-lg font-semibold mb-3">
                Showing 1-10 of 448,429 results for search: All Subjects:
                Bioscience
              </h3>
              <div className="grid grid-cols-8 gap-6">
                <div className="col-span-4">
                  <Select></Select>
                </div>
                <div className="col-span-4">
                  <Select></Select>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-8 md:col-span-2 shadow-xl border-solid border-x-2 border-b-2 rounded-lg hover:shadow-2xl">
                  <Link href="/">
                    <a>
                      <div className="relative h-40">
                        <Image
                          src="/green.jpg"
                          alt="green"
                          layout="fill"
                          className="rounded-t-lg"
                        />
                      </div>
                      <section className="p-3">
                        <h1 className="text-base md:text-lg font-bold flex flex-nowrap items-center">
                          <span className="pr-3 text-slate-600">
                            Animal Biotechnology
                          </span>
                          <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 mt-1 text-slate-600" />
                        </h1>
                        <p className="text-sm md:text-base font-semibold mb-3 text-slate-600">
                          ISSN: 1234-4567
                        </p>
                        <p className="text-sm md:text-base line-clamp-3">
                          Publishes international open access research in
                          medical sciences with particular focus on diseases in
                          the Middle East and North Africa.
                        </p>
                        <div className="flex mt-3">
                          <div className="flex items-center bg-orange-500 px-2 py-1 border-solid border-2 border-transparent rounded-lg">
                            <KeyIcon className="w-5 h-5 mr-2 text-white" />
                            <span className="text-xs text-white uppercase">
                              open access
                            </span>
                          </div>
                        </div>
                      </section>
                    </a>
                  </Link>
                </div>

                <div className="col-span-8 md:col-span-2 shadow-xl border-solid border-x-2 border-b-2 rounded-lg hover:shadow-2xl">
                  <Link href="/">
                    <a>
                      <div className="relative h-40">
                        <Image
                          src="/green.jpg"
                          alt="green"
                          layout="fill"
                          className="rounded-t-lg"
                        />
                      </div>
                      <section className="p-3">
                        <h1 className="text-base md:text-lg font-bold flex flex-nowrap items-center">
                          <span className="pr-3 text-slate-600">
                            Animal Biotechnology
                          </span>
                          <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 mt-1 text-slate-600" />
                        </h1>
                        <p className="text-sm md:text-base font-semibold mb-3 text-slate-600">
                          ISSN: 1234-4567
                        </p>
                        <p className="text-sm md:text-base line-clamp-3">
                          Publishes international open access research in
                          medical sciences with particular focus on diseases in
                          the Middle East and North Africa.
                        </p>
                        <div className="flex mt-3">
                          <div className="flex items-center bg-orange-500 px-2 py-1 border-solid border-2 border-transparent rounded-lg">
                            <KeyIcon className="w-5 h-5 mr-2 text-white" />
                            <span className="text-xs text-white uppercase">
                              open access
                            </span>
                          </div>
                        </div>
                      </section>
                    </a>
                  </Link>
                </div>

                <div className="col-span-8 md:col-span-2 shadow-xl border-solid border-x-2 border-b-2 rounded-lg hover:shadow-2xl">
                  <Link href="/">
                    <a>
                      <div className="relative h-40">
                        <Image
                          src="/green.jpg"
                          alt="green"
                          layout="fill"
                          className="rounded-t-lg"
                        />
                      </div>
                      <section className="p-3">
                        <h1 className="text-base md:text-lg font-bold flex flex-nowrap items-center">
                          <span className="pr-3 text-slate-600">
                            Animal Biotechnology
                          </span>
                          <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 mt-1 text-slate-600" />
                        </h1>
                        <p className="text-sm md:text-base font-semibold mb-3 text-slate-600">
                          ISSN: 1234-4567
                        </p>
                        <p className="text-sm md:text-base line-clamp-3">
                          Publishes international open access research in
                          medical sciences with particular focus on diseases in
                          the Middle East and North Africa.
                        </p>
                        <div className="flex mt-3">
                          <div className="flex items-center bg-orange-500 px-2 py-1 border-solid border-2 border-transparent rounded-lg">
                            <KeyIcon className="w-5 h-5 mr-2 text-white" />
                            <span className="text-xs text-white uppercase">
                              open access
                            </span>
                          </div>
                        </div>
                      </section>
                    </a>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default JournalsPage
