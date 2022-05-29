import React from 'react'

const footerData = [
  {
    id: 1,
    title: 'Help and Information',
    navigations: [
      {
        id: 1,
        label: 'About',
        link: '/',
      },
      {
        id: 2,
        label: 'About',
        link: '/',
      },
      {
        id: 3,
        label: 'About',
        link: '/',
      },
      {
        id: 4,
        label: 'About',
        link: '/',
      },
      {
        id: 5,
        label: 'About',
        link: '/',
      },
    ],
  },
  {
    id: 2,
    title: 'Guidelines',
    navigations: [
      {
        id: 1,
        label: 'About',
        link: '/',
      },
      {
        id: 2,
        label: 'About',
        link: '/',
      },
      {
        id: 3,
        label: 'About',
        link: '/',
      },
      {
        id: 4,
        label: 'About',
        link: '/',
      },
      {
        id: 5,
        label: 'About',
        link: '/',
      },
    ],
  },
  {
    id: 3,
    title: 'Opportunities',
    navigations: [
      {
        id: 1,
        label: 'About',
        link: '/',
      },
      {
        id: 2,
        label: 'About',
        link: '/',
      },
      {
        id: 3,
        label: 'About',
        link: '/',
      },
      {
        id: 4,
        label: 'About',
        link: '/',
      },
      {
        id: 5,
        label: 'About',
        link: '/',
      },
    ],
  },
]
const Footer: React.ComponentType = () => {
  return (
    <footer className="bg-black p-6 mt-12">
      <div className="container mx-auto flex flex-wrap space-x-16">
        {footerData.map((data) => (
          <div key={data.id}>
            <h5 className="text-white font-semibold capitalize text-lg mb-3">
              {data.title}
            </h5>
            <ul>
              {data.navigations.map((nav) => (
                <li key={nav.id} className="text-white p-3">
                  {nav.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer
