import React from 'react'

interface Icon {
  [key: string]: JSX.Element
}

export const editorActionIcons: Icon = {
  'format-bold': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z"
      />
    </svg>
  ),
  'format-underlined': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z"
      />
    </svg>
  ),
  'format-italic': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z"
      />
    </svg>
  ),
  'format-quote-close': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"
      />
    </svg>
  ),
  'looks-one': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M14,17H12V9H10V7H14M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
      />
    </svg>
  ),
  'looks-two': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M15,11C15,12.11 14.1,13 13,13H11V15H15V17H9V13C9,11.89 9.9,11 11,11H13V9H9V7H13A2,2 0 0,1 15,9M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
      />
    </svg>
  ),
  'format-align-center': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z"
      />
    </svg>
  ),
  'format-align-justify': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z"
      />
    </svg>
  ),
  'format-align-left': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z"
      />
    </svg>
  ),
  'format-align-right': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z"
      />
    </svg>
  ),
  'format-list-bulleted': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
      />
    </svg>
  ),
  'format-list-numbered': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z"
      />
    </svg>
  ),
  'table-large': (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M4,3H20A2,2 0 0,1 22,5V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V5A2,2 0 0,1 4,3M4,7V10H8V7H4M10,7V10H14V7H10M20,10V7H16V10H20M4,12V15H8V12H4M4,20H8V17H4V20M10,12V15H14V12H10M10,20H14V17H10V20M20,20V17H16V20H20M20,12H16V15H20V12Z"
      />
    </svg>
  ),
  image: (
    <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"
      />
    </svg>
  ),
}
