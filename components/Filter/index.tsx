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
    <div className="rounded-[inherit]">
      <section className="flex p-3 bg-black rounded-t-[inherit]">
        <h1 className="text-lg font-bold text-white flex flex-nowrap items-center">
          <FilterIcon className="w-5 h-5 mr-3" />
          Filters
        </h1>

        <div className="grow"></div>
        <Button
          variant="icon"
          onClick={props.onClose}
          className="hover:border-slate-500"
        >
          <XIcon className="w-5 h-5 text-white" />
        </Button>
      </section>

      <section className="p-3">
        <Menu>
          {({ open }) => (
            <React.Fragment>
              <Menu.Button className="text-base font-semibold text-slate-600 flex items-center justify-center pl-1 mb-3 hover:underline">
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
              <Menu.Items>
                <Menu.Item disabled>
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
                          className="w-5 h-5 accent-amber-600 hover:cursor-pointer"
                        />
                        <label htmlFor="article" className="ml-3 text-base">
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

        <Menu>
          {({ open }) => (
            <React.Fragment>
              <Menu.Button className="text-base font-semibold text-slate-600 flex items-center justify-center pl-1 mb-3 hover:underline">
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
              <Menu.Items>
                <Menu.Item disabled>
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
                          className="w-5 h-5 accent-amber-600 hover:cursor-pointer"
                        />
                        <label htmlFor="article" className="ml-3 text-base">
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

export default Filter
