import React from 'react'
import clsx from 'classNames'
import { CarouselProps, TransitionEndPayload } from './@types'
import { reducer } from './reducer'
import { getNextPayload, getPrevPayload } from './utils'
import { CarouselItemProps } from '../CarouselItem/@types'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import Indicator from './Indicator'
import { useIsomorphicLayoutEffect } from '../../utils/hooks'
import { debounce } from '../../utils/customFunctions'

const Carousel: React.ComponentType<CarouselProps> = (props) => {
  const SECONDS = 1000
  const CLONE = 2
  const initHeight = Number(props.height) || 0
  const initWidth = Number(props.width) || 0
  const infinite = !!props.infinite
  const isManual = !infinite && !props.autoplay
  const pauseOnMouseEnter = props.autoplay && !!props.pauseOnMouseEnter
  const nChildren = React.Children.count(props.children) || 0
  const count = props.interval ? Math.floor(props.interval / SECONDS) : 5

  const [state, dispatch] = React.useReducer(reducer, {
    slideNo: 1,
    position: 0,
    transition: false,
    activeIndex: 0,
    width: initWidth,
    height: initHeight,
  })

  const childrenWithClone = React.useMemo(() => {
    const insertKey = (el: any, i: number) => {
      if (React.isValidElement<CarouselItemProps>(el)) {
        return React.cloneElement(el, {
          key: `clone_${i}`,
        })
      }
      return el
    }

    const children = React.Children.map(props.children, (child, i) =>
      React.isValidElement<CarouselItemProps>(child)
        ? React.cloneElement(child, {
            __index: i,
          })
        : child,
    )

    const childrenArray = React.Children.toArray(children)
    const firstIndex = 0
    const lastIndex = childrenArray.length - 1
    const childrenArrayCopy = childrenArray.slice()
    const firstChild = childrenArray[firstIndex]
    const lastChild = childrenArray[lastIndex]

    childrenArrayCopy.push(insertKey(firstChild, firstIndex))
    childrenArrayCopy.unshift(insertKey(lastChild, lastIndex))

    return childrenArrayCopy
  }, [props.children])

  const dotDimension = React.useMemo(() => {
    const width = state.width / 50
    const height = state.height / 20

    return { width, height }
  }, [state.width, state.height])

  const slideRef = React.useRef<HTMLDivElement>(null)
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const countDownRef = React.useRef(count)
  const nextFuncRef = React.useRef(() => {})
  const transitionEndRef = React.useRef<null | TransitionEndPayload>(null)

  useIsomorphicLayoutEffect(() => {
    const getDimension = () => {
      let width = 0
      let height = 0

      if (sliderRef.current) {
        width = sliderRef.current.clientWidth
        height = sliderRef.current.clientHeight
      }

      return { width, height }
    }

    const updateSize = () => {
      dispatch({
        type: 'updateSize',
        payload: getDimension(),
      })
    }

    const handleTransitionEnd = () => {
      if (transitionEndRef.current) {
        const { clone, nChildren, slideNo } = transitionEndRef.current
        const isFirstClone = slideNo === 0
        const isLastClone = slideNo === nChildren + clone - 1

        if (isFirstClone) {
          dispatch({
            type: 'reflowToLast',
            payload: { nChildren },
          })
        } else if (isLastClone) {
          dispatch({
            type: 'reflowToFirst',
            payload: { nChildren },
          })
        }
      }
    }

    const destroyTransitionEnd = () => {
      if (slideRef.current && infinite) {
        slideRef.current.removeEventListener(
          'transitionend',
          handleTransitionEnd,
        )
      }
    }

    if (slideRef.current && infinite) {
      slideRef.current.addEventListener('transitionend', handleTransitionEnd)
    }

    window.addEventListener('resize', debounce(updateSize, 500))

    const dimension = getDimension()

    dispatch({
      type: 'moveTo',
      payload: {
        ...state,
        position: 0 - dimension.width,
        height: dimension.height,
        width: dimension.width,
      },
    })

    startTimer()

    return () => {
      window.removeEventListener('resize', debounce(updateSize, 500))
      destroyTransitionEnd()
      destroyTimer()
    }
  }, [])

  React.useEffect(() => {
    transitionEndRef.current = {
      slideNo: state.slideNo,
      nChildren,
      clone: CLONE,
    }
  }, [state.slideNo, nChildren, CLONE])

  const next = React.useCallback(() => {
    // dont run unless it will interfere with the reflow
    if (state.slideNo === nChildren + CLONE - 1) return

    // dont run if index has reach last slide and controls are manual
    if (isManual && state.activeIndex === nChildren - 1) return

    dispatch({
      type: 'moveTo',
      payload: getNextPayload({ nChildren, state, infinite }),
    })
  }, [state, nChildren, infinite, isManual])

  const previous = React.useCallback(() => {
    // dont run unless it will interfere with the reflow
    if (state.slideNo === 0) return

    // dont run if it has reach first slide and controls are manual
    if (isManual && state.activeIndex === 0) return

    dispatch({
      type: 'moveTo',
      payload: getPrevPayload({ nChildren, state, infinite }),
    })
  }, [state, nChildren, infinite, isManual])

  React.useEffect(() => {
    nextFuncRef.current = next
  }, [state, next])

  const startTimer = () => {
    if (props.autoplay) {
      countDownRef.current = count

      timerRef.current = setInterval(() => {
        if (countDownRef.current === 0) {
          countDownRef.current = count
          nextFuncRef.current()
        } else {
          countDownRef.current -= 1
        }
      }, SECONDS)
    }
  }

  const destroyTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const goToIndex = (nextIndex: number) => {
    const payload = { nextIndex }

    if (nextIndex === state.activeIndex) {
      return
    } else if (nextIndex > state.activeIndex) {
      dispatch({
        type: 'jumpforward',
        payload,
      })
    } else {
      dispatch({
        type: 'jumpbackward',
        payload,
      })
    }
  }

  const pause = () => {
    destroyTimer()
  }

  const play = () => {
    startTimer()
  }

  const handleOnMouseEnter = () => {
    if (pauseOnMouseEnter) return pause()
  }

  const handleOnMouseLeave = () => {
    if (pauseOnMouseEnter) return play()
  }

  const Slides = () => {
    return (
      <React.Fragment>
        {childrenWithClone.map(
          (child) =>
            React.isValidElement(child) &&
            React.cloneElement(child, {
              style: {
                transform: `translateX(${state.position}px)`,
                transition: state.transition
                  ? `transform ${props.timeout}ms ease-in`
                  : 'none',
              },
              className: child.props.className,
              ref: slideRef,
            }),
        )}
      </React.Fragment>
    )
  }

  const hideRightBtn = {
    hidden: isManual && state.activeIndex === nChildren - 1,
  }

  const hideLeftBtn = {
    hidden: isManual && state.activeIndex === 0,
  }

  return (
    <div
      ref={sliderRef}
      className={clsx(
        'grow overflow-hidden rounded-lg h-full w-full',
        props.className,
      )}
    >
      {props.children && (
        <div aria-label="slider" className="flex flex-nowrap rounded-lg">
          <div
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            aria-label="slider-wrapper"
            className="flex relative rounded-lg group"
            style={{ height: state.height, width: state.width }}
          >
            {Slides()}
            {!props.disableButtons && (
              <button
                onClick={previous}
                style={{ width: `${state.width / 10}px` }}
                className={clsx(
                  'border-solid border-2 border-transparent active:border-black',
                  `absolute bg-slate-400 h-full z-10 opacity-20 flex`,
                  'items-center justify-center group-hover:opacity-100',
                  'transition-opacity duration-500 ease-in',
                  hideLeftBtn,
                )}
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
            )}

            {!props.disableButtons && (
              <button
                onClick={next}
                className={clsx(
                  'border-solid border-2 border-transparent active:border-black',
                  `bg-slate-400 absolute h-full z-10 opacity-20 flex `,
                  'items-center justify-center group-hover:opacity-100',
                  'transition-opacity duration-500 ease-in',
                  hideRightBtn,
                )}
                style={{
                  width: `${state.width / 10}px`,
                  left: `${state.width - state.width / 10}px`,
                }}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            )}

            {/** dot indicator */}
            {!props.disableIndicator && (
              <Indicator
                nChildren={nChildren}
                setIndex={goToIndex}
                activeIndex={state.activeIndex}
                dotDimension={dotDimension}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

Carousel.defaultProps = {
  interval: 5000,
  disableButtons: false,
  disableIndicator: false,
  autoplay: false,
  height: 300,
  width: 600,
  infinite: false,
  pauseOnMouseEnter: false,
  timeout: 800,
}
export default Carousel
