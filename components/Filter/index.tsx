import { Menu } from '@headlessui/react'
import { ChevronDownIcon, FilterIcon, XIcon } from '@heroicons/react/solid'
import React from 'react'
import clsx from 'classNames'
import { FilterProps } from './@types'
import Button from '../Button'

const articleTypes = [
  {
    id: 1,
    label: 'Articles',
  },
  {
    id: 2,
    label: 'Review articles',
  },
  {
    id: 3,
    label: 'Book reviews',
  },
  {
    id: 4,
    label: 'Brief reports',
  },
]

const articleAccess = [
  {
    id: 1,
    label: 'open access',
  },
  {
    id: 2,
    label: 'partial access',
  },
]

const Filter: React.ComponentType<FilterProps> = (props) => {
  return (
    <div>
      <section className="flex mb-3 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold flex flex-nowrap items-center text-slate-600">
          <FilterIcon className="w-6 h-6 mr-3" />
          Filters
        </h1>

        <div className="grow"></div>

        {props.dismissable ? (
          <Button variant="icon" onClick={props.onClose}>
            <XIcon className="w-6 h-6" />
          </Button>
        ) : (
          <div className="h-10 w-5 block" />
        )}
      </section>

      {props.dismissable && <hr className="my-3 bg-gray-300 h" />}

      <section className="p-3 bg-slate-200 rounded-lg space-y-3 border border-solid border-gray-300">
        <Menu as="div">
          {({ open }) => (
            <React.Fragment>
              <Menu.Button className="text-base md:text-lg font-semibold text-slate-600 flex items-center justify-center pl-1 mb-3 hover:underline">
                <span>Article type</span>
                <ChevronDownIcon
                  className={clsx(
                    'h-4 w-4 text-inherit mt-2 transition-rotate duration-200 ease-in',
                    {
                      'rotate-180': open,
                    },
                  )}
                />
              </Menu.Button>
              <Menu.Items static>
                <Menu.Item>
                  <form>
                    {articleTypes.map((type) => (
                      <div
                        className="p-1 flex flex-nowrap items-center"
                        key={type.id}
                      >
                        <input
                          type="checkbox"
                          value=""
                          name={type.label}
                          id={type.label}
                          className="w-5 h-5 accent-primary hover:cursor-pointer"
                        />
                        <label
                          htmlFor="article"
                          className="ml-3 text-base capitalize"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </form>
                </Menu.Item>
              </Menu.Items>
            </React.Fragment>
          )}
        </Menu>

        <Menu as="div">
          {({ open }) => (
            <React.Fragment>
              <Menu.Button className="text-base md:text-lg font-semibold text-slate-600 flex items-center justify-center pl-1 mb-3 hover:underline">
                <span>Article Access</span>
                <ChevronDownIcon
                  className={clsx(
                    'h-4 w-4 text-inherit mt-2 transition-rotate duration-200 ease-in',
                    {
                      'rotate-180': open,
                    },
                  )}
                />
              </Menu.Button>
              <Menu.Items static>
                <Menu.Item>
                  <form>
                    {articleAccess.map((type) => (
                      <div
                        className="p-1 flex flex-nowrap items-center"
                        key={type.id}
                      >
                        <input
                          type="checkbox"
                          value=""
                          name={type.label}
                          id={type.label}
                          className="w-5 h-5 accent-primary hover:cursor-pointer"
                        />
                        <label
                          htmlFor={type.label}
                          className="ml-3 text-base capitalize"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </form>
                </Menu.Item>
              </Menu.Items>
            </React.Fragment>
          )}
        </Menu>
      </section>
    </div>
  )
}

Filter.defaultProps = {
  dismissable: false,
}

export default Filter
