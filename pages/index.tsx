import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SeachBar from '../components/SearchBar'
import SubjectNavigation from '../components/SubjectNavigation'
import Link from 'next/link'
import { ArrowRightIcon, KeyIcon } from '@heroicons/react/solid'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'

const subjects = [
  {
    id: '1',
    label: 'arts',
    link: '/',
  },
  {
    id: '2',
    label: 'life sciences',
    link: '/',
  },
  {
    id: '3',
    label: 'engineering',
    link: '/',
  },
  {
    id: '4',
    label: 'social sciences',
    link: '/',
  },
  {
    id: '5',
    label: 'Education',
    link: '/',
  },
  {
    id: '6',
    label: 'Agricultural sciences',
    link: '/',
  },
  {
    id: 7,
    label: 'Chemistry',
    link: '/',
  },
  {
    id: 8,
    label: 'Physics',
    link: '/',
  },
  {
    id: 9,
    label: 'Architecture and Building',
    link: '/',
  },
  {
    id: 10,
    label: 'Management sciences',
    link: '/',
  },
  {
    id: 11,
    label: 'Phamaceutical sciences',
    link: '/',
  },
  {
    id: 12,
    label: 'Basic medical sciences',
    link: '/',
  },
]

const resources = [
  {
    heading: 'For authors',
    body:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed, open access journals across a wide range of scientific and medical disciplines. Choose the journal that fits your niche.',
    link: '/',
  },
  {
    heading: 'For editors',
    body:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed, open access journals across a wide range of scientific and medical disciplines. Choose the journal that fits your niche.',
    link: '/',
  },
  {
    heading: 'For societies',
    body:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed, open access journals across a wide range of scientific and medical disciplines. Choose the journal that fits your niche.',
    link: '/',
  },
]

const articles = [
  {
    link: '/',
    title:
      'Boquila trifoliolata mimics leaves of an artificial plastic host plants',
    abstract:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed',
    authors: [{}],
  },
  {
    link: '/',
    title:
      'Boquila trifoliolata mimics leaves of an artificial plastic host plants',
    abstract:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed',
  },
  {
    link: '/',
    title:
      'Boquila trifoliolata mimics leaves of an artificial plastic host plants',
    abstract:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed',
  },
  {
    link: '/',
    title:
      'Boquila trifoliolata mimics leaves of an artificial plastic host plants',
    abstract:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed',
  },
  {
    link: '/',
    title:
      'Boquila trifoliolata mimics leaves of an artificial plastic host plants',
    abstract:
      'With the researcher at the heart of the publishing experience, we have created a diverse portfolio of peer-reviewed',
  },
]

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Pubsgate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-72 relative">
        <div className="absolute z-20 w-full h-full">
          <div className="container mx-auto flex items-center justify-center h-full px-3 md:px-0">
            <div className="w-full md:w-auto">
              <h5 className="mb-2 text-white text-2xl font-bold block">
                Search for Articles:
              </h5>
              <SeachBar />
            </div>
          </div>
        </div>
        <Image
          src="/green.jpg"
          alt="green"
          layout="fill"
          className="opacity-50"
        />
      </div>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1 md:gap-6 mt-6">
          <div className=" col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-600">
              Explore by subject disciplines
            </h2>
            <div className="rounded-xl">
              <SubjectNavigation subjects={subjects} />
            </div>
          </div>
          <div className="col-span-3 w-full">
            <div className="flex flex-col flex-nowrap">
              {/** Carousel start */}
              <Carousel
                width="500"
                height="300"
                infinite
                autoplay
                pauseOnMouseEnter
              >
                <CarouselItem>
                  <div className="bg-red-500">vvfvffffffvfvfvfvfvfvf</div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-blue-500">p4444444444444</div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-amber-500">p4444444444444</div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative">
                    <Image
                      src="/green.jpg"
                      alt="green"
                      layout="fill"
                      className="rounded-t-lg"
                    />
                  </div>
                </CarouselItem>
              </Carousel>
              {/**end */}

              {/** resources start */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {resources.map((resource) => (
                  <div
                    className="w-full shadow-xl border-solid border-x-2 border-b-2 rounded-lg"
                    key={resource.heading}
                  >
                    <div className="bg-amber-600 w-full h-2 rounded-t-lg"></div>
                    <div className="p-3">
                      <h3 className="text-xl md:text-2xl text-slate-600 font-semibold mb-2">
                        {resource.heading}
                      </h3>
                      <article className="text-lg">{resource.body}</article>
                      <div className="mt-6 flex">
                        <div className="grow"></div>
                        <Button
                          rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                          link
                          href="/"
                        >
                          resources
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/** resource end */}
            </div>
          </div>
        </div>
        {/** Latest articles start */}
        <div className="mt-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-600">
            Recent articles
          </h2>
          <div className="grid grid-cols-5 gap-6">
            {articles.map((article, i) => (
              <Link href={article.link} key={i + 1}>
                <a className="col-span-5 md:col-span-1 shadow-xl border-solid border-x-2 border-b-2 rounded-lg hover:shadow-2xl group">
                  <div className="bg-black w-full h-2 rounded-t-lg group-hover:bg-amber-600"></div>
                  <div className="p-3">
                    <div className="capitalize text-xs mb-2 text-slate-500 flex items-center group-hover:text-amber-500 font-medium">
                      <div className="p-1 text-inherit px-2 py-1 capitalize border-solid border-2 border-slate-500 rounded-lg inline group-hover:border-amber-500">
                        research article
                      </div>
                      <div className="grow"></div>
                      <span>20 May 2020</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2 leading-snug group-hover:text-amber-600">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm truncate py-2">
                      John Doe, Duke Effiom, Vitaiij Dagmara
                    </p>
                    <p className="mb-3 text-base line-clamp-3">
                      {article.abstract}
                    </p>
                    <div className="flex flex-reverse">
                      <div className="flex items-center bg-green-500 px-2 py-1 border-solid border-2 border-transparent rounded-lg">
                        <KeyIcon className="w-5 h-5 mr-2 text-white" />
                        <span className="text-xs text-white uppercase">
                          open access
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
        {/** latest articles end */}

        <div className="mt-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-600">
            News
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <Link href="/">
              <a className="col-span-1 shadow-xl border-solid border-x-2 border-b-2 rounded-lg hover:shadow-2xl">
                <div className="relative w-full h-44">
                  <Image
                    src="/green.jpg"
                    alt="green"
                    layout="fill"
                    className="rounded-t-lg"
                  />
                </div>
                <h4>dedeeded</h4>
                <p>deddeddedeed</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
