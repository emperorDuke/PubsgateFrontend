import React from 'react'
import { Tab } from '@headlessui/react'
import Layout from '../../../../components/Layout'
import Button from '../../../../components/Button'
import Link from 'next/link'
import Checkbox from '../../../../components/Checkbox'
import {
  ArrowRightIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import Input from '../../../../components/Input'
import ExpansionPanel from '../../../../components/ExpansionPanel'
import clsx from 'classNames'
import TextArea from '../../../../components/TextArea'

type ReviewerCategory = 'assigned' | 'available'

interface ListItem {
  id: number | string
  type: ReviewerCategory
}

interface Reviewer {
  id: number | string
  name: string
}

type ListItemElement = (param: {
  reviewer: Reviewer
  reviewerCategory: ReviewerCategory
  isLast: boolean
  btn: JSX.Element
}) => JSX.Element

const PDFViewer = dynamic(() => import('../../../../components/PDFViewer'))

const SubmissionReviewers = () => {
  const reviewers: Reviewer[] = [
    { id: 1, name: 'Dr andrew Effiom' },
    { id: 2, name: 'Dr andrew Effiom' },
    { id: 3, name: 'Dr andrew Effiom' },
    { id: 4, name: 'Dr andrew Effiom' },
    { id: 5, name: 'Dr andrew Effiom' },
    { id: 6, name: 'Dr andrew Effiom' },
    { id: 7, name: 'Dr andrew Effiom' },
  ]

  const assignedReviewers: Reviewer[] = [
    { id: 8, name: 'Dr andrew Effiom' },
    { id: 9, name: 'Dr andrew Effiom' },
    { id: 10, name: 'Dr andrew Effiom' },
    { id: 11, name: 'Dr andrew Effiom' },
  ]

  const journalReviewersId = React.useId()
  const [hoveredEl, setIsHovered] = React.useState('')
  const [selectedItems, setSelectedItems] = React.useState<ListItem[]>([])

  const handleSelectedItem = (arg: ListItem) => {
    return () => {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.map((item) => item.id).includes(arg.id)
          ? prevSelectedItems.filter((item) => item.id !== arg.id)
          : prevSelectedItems.concat([arg]),
      )
    }
  }

  const handleMouseHover = (param: string) => {
    return () => setIsHovered(param)
  }

  const listItem: ListItemElement = (param) => {
    const { reviewer, reviewerCategory, isLast, btn } = param
    const isActive = hoveredEl === `${reviewer.id}`
    const isSelected = selectedItems.map((s) => s.id).includes(reviewer.id)

    return (
      <li
        key={reviewer.id}
        onMouseEnter={handleMouseHover(`${reviewer.id}`)}
        onMouseLeave={handleMouseHover('')}
        className={clsx(
          'border hover:bg-white hover:elevation-1 last:rounded-b-lg flex flex-nowrap items-stretch bg-slate-300/40',
          {
            'border-b-gray-100': !isLast,
          },
        )}
      >
        <Checkbox
          dense
          aria-labelledby={`checkbox-${reviewer.id}${journalReviewersId}`}
          disabled={!isSelected && !isActive}
          onChange={handleSelectedItem({
            type: reviewerCategory,
            id: reviewer.id,
          })}
        />
        <Link href="/">
          <a
            id={`checkbox-${reviewer.id}${journalReviewersId}`}
            className="pl-3 grow flex flex-nowrap items-center text-base capitalize hover:underline"
          >
            {reviewer.name}
          </a>
        </Link>
        {isActive && btn}
      </li>
    )
  }

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-3">
        <div className="flex flex-nowrap items-center mb-3 bg-slate-400/30 p-3 rounded-t-lg">
          <h2 className="text-lg font-bold">Assigned Reviewers</h2>
          <p className="ml-3 text-sm text-header-col font-semibold">
            ({selectedItems.filter((s) => s.type === 'assigned').length}
            <span className="ml-1">selected</span>)
          </p>
          <div className="grow" />
        </div>
        <div className="max-h-[350px] overflow-y-auto mb-3">
          <ul className="pb-3">
            {assignedReviewers.map((reviewer, i) =>
              listItem({
                reviewer,
                reviewerCategory: 'assigned',
                isLast: i === assignedReviewers.length - 1,
                btn: (
                  <Button variant="icon">
                    <ArrowUturnRightIcon className="w-5 h-5" />
                    <span className="sr-only">assign reviewer</span>
                  </Button>
                ),
              }),
            )}
          </ul>
        </div>

        {!!selectedItems.filter((s) => s.type === 'assigned').length && (
          <Button
            leftIcon={<ArrowUturnRightIcon className="w-5 h-5" />}
            depressed
            size="small"
          >
            unassign reviewer
          </Button>
        )}
      </div>
      <div className="col-span-3">
        <div className="flex flex-nowrap items-center mb-3 bg-slate-400/30 p-3 rounded-t-lg">
          <h2 className="text-xl font-bold">Available Reviewers</h2>
          <p className="ml-3 text-header-col font-semibold">
            ({selectedItems.filter((s) => s.type === 'available').length}
            <span className="ml-1">selected</span>)
          </p>
          <div className="grow" />
          <Button
            link
            href="/"
            size="small"
            rightIcon={<ArrowRightIcon className="w-5 h-5" />}
          >
            invite a reviewer
          </Button>
        </div>

        <div className="max-h-[350px] overflow-y-auto mb-3">
          <ul className="pb-3">
            {reviewers.map((reviewer, i) =>
              listItem({
                reviewer,
                reviewerCategory: 'available',
                isLast: i === reviewers.length - 1,
                btn: (
                  <Button variant="icon">
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    <span className="sr-only">assign reviewer</span>
                  </Button>
                ),
              }),
            )}
          </ul>
        </div>

        {!!selectedItems.filter((s) => s.type === 'available').length && (
          <Button
            leftIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
            size="small"
            depressed
          >
            assign reviewer
          </Button>
        )}
      </div>
    </div>
  )
}

const ReviewerReport = () => {
  const report = (
    <>
      <div>
        <p className="text-header-col font-semibold my-3">
          Is manuscript worth reviewing?
        </p>
        <p className="rounded p-3 bg-white">yes</p>
      </div>
      <div>
        <p className="text-header-col font-semibold my-3">
          To what extent does it meet criterion?
        </p>
        <p className="rounded p-3 bg-white h-[150px] overflow-auto">
          it does not meet our criterion because of the concept are unpractical
        </p>
      </div>
      <div>
        <p className="text-header-col font-semibold my-3">Author comments</p>
        <p className="p-3 rounded bg-white h-[350px] overflow-auto">
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
          it does not meet our criterion because of the concept are unpractical
        </p>
      </div>
    </>
  )
  return (
    <div>
      {/* <form className="col-start-3 col-span-2 flex flex-col">
        <Input label="is manuscript worth reviewing?" required />
        <Input label="to what extent does it meet criterion?" required />

        <TextArea label="comments" required />
      </form> */}
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-2">
          <h2 className="text-lg font-bold p-3 bg-slate-400/30 rounded-t-lg truncate mb-3">
            Reviewer 1: Dr andrew Effiom
          </h2>
          <div className="p-3 bg-slate-300/40 rounded-b-lg">{report}</div>
        </div>
        <div className="col-span-2">
          <h2 className="text-lg font-bold p-3 bg-slate-400/30 rounded-t-lg truncate mb-3">
            Reviewer 2: Dr andrew Effiom
          </h2>
          <div className="p-3 bg-slate-300/40 rounded-b-lg">{report}</div>
        </div>
        <div className="col-span-2">
          <h2 className="text-lg font-bold p-3 bg-slate-400/30 rounded-t-lg truncate mb-3">
            Reviewer 3: Dr andrew Effiom
          </h2>
          <div className="p-3 bg-slate-300/40 rounded-b-lg">{report}</div>
        </div>
      </div>
    </div>
  )
}

const SubmissionPage = () => {
  const tabs = [
    {
      id: 1,
      name: 'Manuscript',
    },
    {
      id: 2,
      name: 'Reviewers Activities',
    },
    {
      id: 3,
      name: 'Editors Activities',
    },
  ]

  const expandableItems = [
    {
      id: 1,
      title: 'Submission Reviewers',
      element: <SubmissionReviewers />,
    },
    {
      id: 2,
      title: 'Reviewers Reports',
      element: <ReviewerReport />,
    },
  ]

  return (
    <Layout variant={2}>
      <main className="container mx-auto py-6">
        <Tab.Group>
          <Tab.List className="space-x-3">
            {tabs.map((tab) => (
              <Tab as={React.Fragment} key={tab.id}>
                {({ selected }) => (
                  <button
                    className={clsx(
                      'outline-none uppercase bg-secondary text-white p-3 rounded-t-lg active:bg-white hover:bg-secondary-light/90',
                      {
                        'bg-secondary-light/80': selected,
                      },
                    )}
                  >
                    {tab.name}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="bg-layout-col w-full rounded-b-lg rounded-r-lg">
            <Tab.Panel className="flex justify-center items-center py-6">
              <PDFViewer />
            </Tab.Panel>
            <Tab.Panel className="p-6">
              <ExpansionPanel totalPanel={expandableItems.length}>
                {({ isActive }) => (
                  <>
                    {expandableItems.map((expandableItem, i) => (
                      <ExpansionPanel.Item
                        key={expandableItem.id}
                        index={i}
                        className="mb-3 p-6 rounded-b-lg bg-slate-200/60"
                      >
                        <ExpansionPanel.Button
                          className={clsx(
                            'text-2xl font-bold mb-6 px-3 text-header-col border border-transparent hover:elevation-1',
                            {
                              'rounded-t-lg mb-1 bg-slate-200/60': isActive(i),
                              'rounded-lg mb-3 bg-slate-300': !isActive(i),
                            },
                          )}
                        >
                          {expandableItem.title}
                        </ExpansionPanel.Button>
                        {expandableItem.element}
                      </ExpansionPanel.Item>
                    ))}
                  </>
                )}
              </ExpansionPanel>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>
    </Layout>
  )
}

export default SubmissionPage
