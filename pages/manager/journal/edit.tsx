import React from 'react'
import { NextPage } from 'next'

const EditJournalPage: NextPage = () => {
  // make a collapseable form to accommodate all the sections
  return (
    <main>
      <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="col-start-1 col-span-6 md:col-start-3 md:col-span-2 p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Journal</h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EditJournalPage
