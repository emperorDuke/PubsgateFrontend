import { SearchIcon } from '@heroicons/react/solid'
import React from 'react'
import Button from '../Button'
import { SearchBarProps } from './@types'

const SeachBar: React.ComponentType<SearchBarProps> = () => {
  return (
    <div className="bg-transparent flex flex-col md:flex-row">
      <div className="md:border-r-solid md:border-r-2 md:border-r-slate-500 w-full mb-2 md:mb-0">
        <select className="w-full md:w-44 md:rounded-l-lg bg-white pl-2 rounded-lg md:rounded-none h-11 md:h-12">
          <option value="">All Journals</option>
        </select>
      </div>
      <div className="md:border-r-solid md:border-r-2 md:border-r-slate-500 w-full mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Search for articles"
          className="w-full md:w-96 bg-white pl-3 rounded-lg md:rounded-none h-11 md:h-12"
        />
      </div>
      <div className="md:border-solid md:border-0 w-full mb-2 md:mb-0">
        <select className="w-full md:w-44 md:rounded-r-lg bg-white rounded-lg md:rounded-none h-11 md:h-12 pl-2">
          <option value="">All Articles</option>
        </select>
      </div>
      <div className="md:ml-5 w-full md:w-44mb-2 md:mb-0">
        <Button className="text-white flex items-center h-full">
          <SearchIcon className="w-5 h-5" />
          <span className="ml-2">Search</span>
        </Button>
      </div>
    </div>
  )
}

export default SeachBar
