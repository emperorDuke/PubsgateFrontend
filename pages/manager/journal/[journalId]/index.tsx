import { Dialog, Listbox } from '@headlessui/react'
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  XIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import Button from '../../../../components/Button'
import Layout from '../../../../components/Layout'
import clsx from 'classNames'
import { NextPage } from 'next'
import Input from '../../../../components/Input'
import Head from 'next/head'

interface ClickedSchema {
  id: number | string
  from: 'editor' | 'reviewer'
}

const submissions = [
  {
    id: 1,
    title: 'Pretreatment optimization of bio ethanol production',
    authors: 'John Doe, Duke Effiom, Vitaiij Dagmara',
  },
  {
    id: 2,
    title: 'Pretreatment optimization of bio ethanol production',
    authors: 'John Doe, Duke Effiom, Vitaiij Dagmara',
  },
  {
    id: 3,
    title: 'Pretreatment optimization of bio ethanol production',
    authors: 'John Doe, Duke Effiom, Vitaiij Dagmara',
  },
  {
    id: 4,
    title: 'Pretreatment optimization of bio ethanol production',
    authors: 'John Doe, Duke Effiom, Vitaiij Dagmara',
  },
]

/**
 * Manager search bar
 */
const SearchBar: React.FC = () => {
  const [showAdvanceSearch, setShowAdvanceSearch] = React.useState(false)
  const [inputFocus, setInputFocus] = React.useState(false)
  const [openForm, setOpenForm] = React.useState(false)
  const searchRef = React.useRef<HTMLDivElement | null>(null)
  const advanceSearchFormRef = React.useRef<HTMLFormElement | null>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>()
  const advancedSearchPanelId = React.useId()
  const advancedSearchLabelId = React.useId()

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target || e.currentTarget) as Node
      const el = advanceSearchFormRef.current

      if (el && !el.contains(target)) {
        setOpenForm(false)
        timeoutRef.current = setTimeout(() => setShowAdvanceSearch(false), 100)
      }
    }

    document.addEventListener('mousedown', onClick)

    return () => {
      clearTimeout(timeoutRef.current as number | undefined)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  React.useEffect(() => {
    if (showAdvanceSearch) {
      timeoutRef.current = setTimeout(() => setOpenForm(true), 100)
    }
  }, [showAdvanceSearch])

  const handleInputFocus = () => {
    setInputFocus(true)

    if (showAdvanceSearch) {
      setShowAdvanceSearch(false)
    }
  }

  const handleInputBlur = () => {
    setInputFocus(false)
  }

  return (
    <div className="relative mb-6 w-full flex flex-nowrap items-stretch">
      <div
        ref={searchRef}
        className={clsx('flex flex-nowrap items-center w-full mr-3', {
          'rounded-t-lg': showAdvanceSearch,
          'rounded-lg': !showAdvanceSearch,
          'bg-white elevation-1': inputFocus,
          'bg-layout-col border border-border-col': !inputFocus,
        })}
      >
        <input
          type="search"
          aria-placeholder="Search by submissions or authors"
          className="w-full p-3 bg-inherit rounded-[inherit] focus:outline-none"
          placeholder="Search by submissions or authors"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {!showAdvanceSearch && (
          <Button
            variant="icon"
            className="h-full"
            aria-controls={`advanced-search-panel${advancedSearchPanelId}`}
            aria-haspopup="true"
            aria-expanded={showAdvanceSearch ? 'true' : 'false'}
            onClick={() => setShowAdvanceSearch((prev) => !prev)}
          >
            <AdjustmentsIcon className="w-5 h-5 rotate-90 text-header-col" />
            <span
              className="sr-only"
              id={`advance-search-label${advancedSearchLabelId}`}
            >
              advance search
            </span>
          </Button>
        )}
      </div>
      {/* Search bar */}

      {!showAdvanceSearch && (
        <Button
          className="h-inherit"
          depressed
          leftIcon={<SearchIcon className="w-5 h-5" />}
        >
          search
        </Button>
      )}

      {/* advance search panel */}
      {openForm && searchRef.current && (
        <form
          id={`advanced-search-panel${advancedSearchPanelId}`}
          role="search"
          ref={advanceSearchFormRef}
          aria-labelledby={`advance-search-label${advancedSearchLabelId}`}
          className="w-full bg-white absolute z-50 elevation-2 rounded-b-lg flex flex-col p-3 space-y-3"
          style={{
            top: searchRef.current.offsetHeight,
            width: searchRef.current.offsetWidth,
          }}
        >
          <Input
            label="Submission title"
            className="w-full"
            dense
            role="search"
          />
          <div className="flex space-x-3">
            <Input
              label="author first name"
              className="w-1/2"
              dense
              role="search"
            />
            <Input
              label="author last name"
              className="w-1/2"
              dense
              role="search"
            />
          </div>
          <div className="flex flex-nowrap">
            <div className="grow" aria-hidden="true" />
            <Button leftIcon={<SearchIcon className="w-5 h-5" />}>
              search
            </Button>
          </div>
        </form>
      )}
      {/* advance search panel */}
    </div>
  )
}

/**
 * Manger Navigations
 */
const Navigation: React.FC = () => {
  return (
    <nav>
      <div>
        <h2 className="text-xl font-bold mb-3 text-header-col ">
          Editor todo list
        </h2>
        <div className="space-y-3">
          <p>Assigned submissions</p>
          <p>Resolved submussions</p>
          <p>submissions under review</p>
        </div>

        <div className="mt-3">
          <h2 className="capitalize text-md text-header-col font-bold">
            Reviewers invited
          </h2>
          <div className="ml-6">
            <p className="mt-3">Response (0)</p>
          </div>
        </div>

        <div>
          <h3 className="capitalize text-md mt-3 text-header-col font-bold">
            pending submissions
          </h3>
          <div className="ml-6 space-y-3">
            <p className="mt-3">Additional reviews</p>
            <p>Late reviews</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="text-xl text-header-col font-bold mb-3">
          View all assigned
        </h2>
        <div className="space-y-3">
          <p>submissions assigned</p>
          <p>submissions assigned being edited</p>
        </div>
      </div>
    </nav>
  )
}

const JournalManagerPage: NextPage = () => {
  const filters = React.useMemo(
    () => [
      {
        name: 'Order by: Title',
        value: 'title',
        type: 'asc',
        id: 1,
      },
      {
        name: 'Order by: Time',
        value: 'time',
        type: 'asc',
        id: 4,
      },
      {
        name: 'Order by: Title',
        value: 'title',
        type: 'desc',
        id: 2,
      },
      {
        name: 'Order by: Time',
        value: 'time',
        type: 'desc',
        id: 3,
      },
    ],
    [],
  )
  const [selectedFilter, setSelectedFilter] = React.useState(filters[0])
  const [isOpen, setIsOpen] = React.useState(false)
  const [clickSubmission, setClickSubmission] = React.useState<ClickedSchema>({
    id: '0',
    from: 'editor',
  })

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const handleClickedSubmission = (schema: ClickedSchema) => {
    return () => {
      setIsOpen(true)
      setClickSubmission(schema)
    }
  }

  const sortIcon = (type: string) => {
    return (
      <div className="mr-3">
        {type === 'asc' ? (
          <SortAscendingIcon className="w-5 h-5" />
        ) : (
          <SortDescendingIcon className="w-5 h-5" />
        )}
      </div>
    )
  }

  return (
    <Layout variant={2}>
      <Head>
        <title>Submissions Manager | Pubsgate</title>
        <meta name="description" content="Journals submissions manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <Dialog.Panel className="fixed inset-0 flex items-center justify-center">
          <div className="mx-auto bg-white h-1/2 w-1/2 rounded-lg">
            <div className="flex flex-nowrap items-center bg-primary rounded-t-lg py-2 px-3">
              <span className="text-2xl text-white font-bold">
                {clickSubmission.from === 'editor' ? 'Editors' : 'Reviewers'}
              </span>
              <div className="grow" aria-hidden="true" />
              <Button
                variant="icon"
                onClick={handleDialogClose}
                className="hover:!bg-secondary-light/40 active:!bg-secondary-light/70"
              >
                <XIcon className="w-6 h-6 text-white" />
                <span className="sr-only">close dialog</span>
              </Button>
            </div>
            <div className="px-6 py-3">
              <ul className="list-disc">
                <li className="ml-3">Dr Effiom Duke: Line Editor</li>
                <li className="ml-3">Dr Effiom Duke: Line Editor</li>
                <li className="ml-3">Dr Effiom Duke: Line Editor</li>
                <li className="ml-3">Dr Effiom Duke: Line Editor</li>
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <main className="mx-auto container grid grid-cols-8 gap-6 py-6">
        <aside className="bg-layout-col p-3 rounded-lg col-span-2 border-border-col border">
          <Navigation />
        </aside>

        <section className="col-span-6">
          {/* Search bar */}
          <SearchBar />
          {/* second section */}
          <h1 className="text-3xl text-header-col font-bold mb-3">
            Submissions
          </h1>
          <div>
            {/* Toolbar */}
            <div
              className="flex flex-nowrap rounded-t-lg bg-secondary mb-3 py-2 px-3 items-center"
              role="toolbar"
            >
              <div className="grow" />
              <div className="flex nowrap items-center">
                <Button
                  variant="icon"
                  className="hover:!bg-secondary-light/60 active:!bg-secondary-light/80"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-white" />
                  <span className="sr-only">previous group of submissions</span>
                </Button>
                <p className="mx-3 bg-white py-1 px-3 rounded-lg text-header-col">
                  1 - 50 of 550
                </p>
                <Button
                  variant="icon"
                  className="hover:!bg-secondary-light/60 active:!bg-secondary-light/80"
                >
                  <ChevronRightIcon className="w-5 h-5 text-white" />
                  <span className="sr-only">next group of submissions</span>
                </Button>
              </div>

              <hr className="w-5 bg-white rotate-90 mx-3" />

              <Listbox
                value={selectedFilter}
                onChange={setSelectedFilter}
                as="div"
              >
                <Listbox.Button className="border bg-white py-1 px-3 rounded-lg flex flex-nowrap items-center active:border-border-col text-header-col">
                  {sortIcon(selectedFilter.type)}
                  {selectedFilter.name}
                  <ChevronDownIcon className="w-5 h-5 ml-3" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 mt-2 elevation-3 rounded-b-lg">
                  {filters.map((filter) => (
                    <Listbox.Option
                      key={filter.id}
                      value={filter}
                      as={React.Fragment}
                    >
                      {({ active }) => (
                        <li
                          className={clsx(
                            `flex flex-nowrap items-center p-3 capitalize last:rounded-b-lg`,
                            {
                              'bg-secondary text-white': active,
                              'bg-white text-black': !active,
                            },
                          )}
                        >
                          {sortIcon(filter.type)}
                          {filter.name}
                          <span className="ml-3 w-5 h-5" aria-hidden="true" />
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* toolbar */}
            <ul
              className="flex flex-col rounded-lg space-y-3"
              aria-live="polite"
            >
              {submissions.map((submission) => (
                <li
                  key={submission.id}
                  className="w-full border-border-col border p-3 last:rounded-b-lg bg-layout-col"
                >
                  <Link href="/">
                    <a className="font-bold text-header-col group">
                      <div className="group-hover:text-primary group-hover:underline group-focus:text-blue-500 flex flex-nowrap items-center">
                        <div className="w-[90%]">
                          <p>{submission.title}</p>
                          <p className="font-semibold text-sm truncate py-2">
                            {submission.authors}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">40 min ago</p>
                      </div>
                    </a>
                  </Link>

                  <hr className="border border-t-border-col w-full" />

                  <div className="mt-3 flex flex-nowrap items-center space-x-3">
                    <Button
                      aria-haspopup="dialog"
                      variant="outlined"
                      size="x-small"
                      onClick={handleClickedSubmission({
                        id: submission.id,
                        from: 'reviewer',
                      })}
                    >
                      reviewers
                    </Button>
                    <Button
                      aria-haspopup="dialog"
                      variant="outlined"
                      size="x-small"
                      onClick={handleClickedSubmission({
                        id: submission.id,
                        from: 'editor',
                      })}
                    >
                      editors
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default JournalManagerPage
