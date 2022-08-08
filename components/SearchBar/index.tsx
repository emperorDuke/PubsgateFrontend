import React from 'react'
import Button from '../Button'
import clsx from 'classNames'
import { SearchBarProps } from './@types'
import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/solid'

const SearchBar: React.ComponentType<SearchBarProps> = (props) => {
  const styles = {
    'bg-white': props.variant === 'outlined',
    'bg-slate-200': props.variant === 'contained',
    'border-y-2 border-y-slate-400': props.variant === 'outlined',
  }

  return (
    <div className="bg-transparent flex flex-col md:flex-row">
      <div
        className={clsx(
          'mb-2 md:mb-0 py-1 rounded-lg',
          'md:rounded-none md:rounded-l-lg',
          styles,
          {
            'border-l-2 border-l-slate-400': props.variant === 'outlined',
          },
        )}
      >
        <select className="bg-inherit w-full md:w-48 pl-2 rounded-[inherit] h-11 md:h-12">
          <option value="">All Journals</option>
        </select>
      </div>
      <div
        className={clsx(
          'md:border-x-solid md:border-x-2',
          'md:border-x-slate-500 mb-2 md:mb-0 flex',
          'py-1 pr-1 rounded-lg md:rounded-none',
          styles,
        )}
      >
        <input
          type="text"
          name="search-bar"
          placeholder="Search for articles"
          className="w-full md:w-96 bg-inherit pl-3 rounded-[inherit] h-11 md:h-12"
        />
        <Button variant="icon">
          <AdjustmentsIcon className="w-5 h-5 rotate-90" />
        </Button>
      </div>
      <div
        className={clsx(
          'mb-2 rounded-lg md:mb-0 py-1',
          'md:rounded-none md:rounded-r-lg',
          styles,
          {
            'border-r-2 border-r-slate-400': props.variant === 'outlined',
          },
        )}
      >
        <select className="bg-inherit rounded-[inherit] h-11 md:h-12 pl-2 w-full md:w-48">
          <option value="">All Articles</option>
        </select>
      </div>
      <div className="md:ml-5 w-full md:mb-0 mt-3 md:mt-0">
        <Button
          className={clsx('h-full', { 'shadow-none': props.depressSearchBtn })}
          leftIcon={<SearchIcon className="w-5 h-5" />}
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
