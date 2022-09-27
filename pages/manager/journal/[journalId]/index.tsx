import { Listbox } from '@headlessui/react'
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import Button from '../../../../components/Button'
import Layout from '../../../../components/Layout'
import clsx from 'classNames'
import { NextPage } from 'next'
import Input from '../../../../components/Input'

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

const SearchBar = () => {
  const [showAdvanceSearch, setShowAdvanceSearch] = React.useState(false)
  const [inputFocus, setInputFocus] = React.useState(false)
  const searchRef = React.useRef<HTMLDivElement | null>(null)
  const clickBoxRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      let target = (e.target || e.currentTarget) as Node

      if (clickBoxRef.current && !clickBoxRef.current.contains(target)) {
        setShowAdvanceSearch(false)
      }
    }

    document.addEventListener('mousedown', onClick)

    return () => {
      document.removeEventListener('mousedown', onClick)
    }
  })

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
        className={clsx('border flex flex-nowrap items-center w-full mr-3', {
          'rounded-t-lg': showAdvanceSearch,
          'rounded-lg': !showAdvanceSearch,
          'bg-white drop-shadow-md shadow-sm shadow-gray-500': inputFocus,
          'bg-layout-col border-border-col': !inputFocus,
        })}
      >
        <input
          className="w-full p-3 bg-inherit rounded-[inherit] focus:outline-none"
          placeholder="Search by submissions or authors"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {!showAdvanceSearch && (
          <Button
            variant="icon"
            className="h-full"
            onClick={() => setShowAdvanceSearch((prev) => !prev)}
          >
            <AdjustmentsIcon className="w-5 h-5 rotate-90 text-header-col" />
          </Button>
        )}
      </div>
      {/* Search bar */}

      <Button
        className="h-inherit"
        leftIcon={<SearchIcon className="w-5 h-5" />}
      >
        search
      </Button>
      {/* advance search panel */}
      {showAdvanceSearch && searchRef.current && (
        <div
          ref={clickBoxRef}
          className="w-full bg-white absolute z-50 border drop-shadow-md shadow-md shadow-gray-500 rounded-b-lg"
          style={{
            top: searchRef.current.offsetHeight,
            width: searchRef.current.offsetWidth,
          }}
        >
          <div className="flex flex-col p-3 space-y-3">
            <Input label="Submission title" className="w-full" dense />
            <div className="flex space-x-3">
              <Input label="author first name" className="w-1/2" dense />
              <Input label="author last name" className="w-1/2" dense />
            </div>
          </div>
        </div>
      )}
      {/* advance search panel */}
    </div>
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
      <main className="mx-auto container grid grid-cols-8 gap-6 py-6">
        <aside className="bg-layout-col p-3 rounded-lg col-span-2 border-border-col border">
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
        </aside>

        <div className="col-span-6">
          {/* Search bar */}
          <SearchBar />
          {/* second section */}
          <h2 className="text-3xl text-header-col font-bold mb-3">
            Submissions
          </h2>
          <div>
            {/* Toolbar */}
            <div className="flex flex-nowrap rounded-t-lg bg-secondary mb-3 py-2 px-3 items-center">
              <div className="grow" />
              <div className="flex nowrap items-center">
                <Button
                  variant="icon"
                  className="hover:bg-header-col active:border-border-col"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-white" />
                </Button>
                <p className="mx-3 bg-white py-1 px-3 rounded-lg text-header-col">
                  1 - 50 of 550
                </p>
                <Button
                  variant="icon"
                  className="hover:bg-header-col active:border-border-col"
                >
                  <ChevronRightIcon className="w-5 h-5 text-white" />
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
                <Listbox.Options className="absolute z-50 mt-2 border border-gray-200 drop-shadow-lg shadow-xl rounded-b-lg">
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
                          <span className="ml-3 w-5 h-5"></span>
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* toolbar */}
            <ul className="flex flex-col rounded-lg space-y-3">
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
                  <div className="mt-3 flex flex-nowrap items-center space-x-3">
                    <Button variant="outlined" size="x-small">
                      reviewers
                    </Button>
                    <Button variant="outlined" size="x-small">
                      assign editors
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default JournalManagerPage
