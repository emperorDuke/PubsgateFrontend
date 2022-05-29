import React from 'react'
import Button from '../Button'
import { SearchBarProps } from './@types'
import { SearchIcon, FilterIcon } from '@heroicons/react/solid'

const SeachBar: React.ComponentType<SearchBarProps> = () => {
  return (
    <section className="bg-transparent flex flex-col md:flex-row">
      <div className="md:border-r-solid md:border-r-2 md:border-r-slate-500 w-full mb-2 md:mb-0">
        <select className="w-full md:w-48 md:rounded-l-lg bg-white pl-2 rounded-lg md:rounded-none h-11 md:h-12">
          <option value="">All Journals</option>
        </select>
      </div>
      <div className="md:border-r-solid md:border-r-2 md:border-r-slate-500 w-full mb-2 md:mb-0 flex">
        <input
          type="text"
          name="search-bar"
          placeholder="Search for articles"
          className="w-full md:w-96 bg-white pl-3 rounded-lg md:rounded-none h-11 md:h-12"
        />
        <Button variant="icon">
          <FilterIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="md:border-solid md:border-0 w-full mb-2 md:mb-0">
        <select className="w-full md:w-48 md:rounded-r-lg bg-white rounded-lg md:rounded-none h-11 md:h-12 pl-2">
          <option value="">All Articles</option>
        </select>
      </div>
      <div className="md:ml-5 w-full md:mb-0 mt-3 md:mt-0">
        <Button
          className="h-full"
          leftIcon={<SearchIcon className="w-5 h-5" />}
        >
          search
        </Button>
      </div>
    </section>
  )
}

export default SeachBar
