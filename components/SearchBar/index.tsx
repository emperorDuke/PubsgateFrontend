import React from 'react'
import Button from '../Button'
import clsx from 'classNames'
import { SearchBarProps } from './@types'
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/solid'

const SearchBar: React.ComponentType<SearchBarProps> = (props) => {
  const styles = {
    'bg-white': props.variant === 'outlined',
    'bg-layout-col': props.variant === 'contained',
  }

  return (
    <div className="bg-transparent flex flex-col md:flex-row">
      <div
        className={clsx(
          'mb-2 md:mb-0 rounded-lg',
          'md:rounded-none md:rounded-l-lg',
          // 'border-r border-r-gray-300',
          // 'md:border-r-transparent',
          // 'border-y border-y-gray-300',
          // 'border-l border-l-gray-300',
          styles,
        )}
      >
        <select className="bg-inherit w-full md:w-48 pl-2 py-3 rounded-[inherit]">
          <option value="">All Journals</option>
        </select>
      </div>
      <div
        className={clsx(
          // 'border-x border-x-gray-300',
          // 'md:border-x-solid md:border-x-2',
          // 'border-y border-y-gray-300 md:border-x-slate-500',
          'mb-2 md:mb-0 flex md:mx-1',
          'rounded-lg md:rounded-none',

          styles,
        )}
      >
        <input
          type="search"
          name="search-bar"
          placeholder="Search for articles"
          className="w-full md:w-96 bg-inherit p-3 rounded-[inherit]"
        />
        <Button variant="icon">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
        </Button>
      </div>
      <div
        className={clsx(
          'mb-2 rounded-lg md:mb-0',
          'md:rounded-none md:rounded-r-lg',
          // 'border-l border-l-gray-300',
          // 'md:border-l-transparent',
          // 'border-y border-y-gray-300',
          // 'border-r border-r-gray-300',
          styles,
        )}
      >
        <select className="bg-inherit rounded-[inherit] pl-2 py-3 w-full md:w-48">
          <option value="">All Articles</option>
        </select>
      </div>
      <div className="md:ml-3 w-full md:mb-0 mt-3 md:mt-0">
        <Button
          className="h-full"
          depressed
          leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
        >
          search
        </Button>
      </div>
    </div>
  )
}

SearchBar.defaultProps = {
  variant: 'outlined',
  depressSearchBtn: false,
}

export default SearchBar
