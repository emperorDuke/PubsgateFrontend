import React from 'react'
import { IndicatorProps } from './@types'
import clsx from 'classNames'

const Indicator: React.ComponentType<IndicatorProps> = (props) => {
  const [idx, setIdx] = React.useState(props.activeIndex)
  const [dimension, setDimension] = React.useState(props.dotDimension)

  React.useEffect(() => setDimension(props.dotDimension), [props.dotDimension])
  React.useEffect(() => setIdx(props.activeIndex), [props.activeIndex])

  const handleClick = (i: number) => () => props.setIndex(i)

  return (
    <div
      className="flex justify-center absolute w-full bottom-[5%]"
      aria-label="indicator"
    >
      <div className="flex flex-row" aria-label="dots-wrapper">
        {Array.apply(null, Array(props.nChildren)).map((c, i) => (
          <button
            key={i}
            onClick={handleClick(i)}
            aria-label="dot"
            style={{ height: dimension.height, width: dimension.width }}
            className={clsx(
              `transition-all duration-500 ease-in rounded-[50%] ml-2`,
              {
                'bg-slate-300 shadow-xl': idx === i,
                'bg-slate-500 hover:cursor-pointer shadow-md': idx !== i,
              },
            )}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Indicator
