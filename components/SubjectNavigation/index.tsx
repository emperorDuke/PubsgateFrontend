import Link from 'next/link'
import React from 'react'
import { SubjectNavigationProps } from './@types'

const SubjectNavigation: React.ComponentType<SubjectNavigationProps> = (
  props,
) => {
  return (
    <ul className="space-y-2 rounded-lg">
      {props.subjects.map((subject) => (
        <li
          key={subject.id}
          className="bg-slate-200 first:rounded-t-lg last:rounded-b-lg flex hover:bg-amber-600"
        >
          <Link href={subject.link}>
            <a className="p-3 capitalize text-md md:text-lg w-full hover:underline hover:text-white">
              {subject.label}{' '}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SubjectNavigation
