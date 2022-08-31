import { State, Action, Dimension } from './Carousel/@types'
import { jumpbackward, jumpforward } from './utils'

const getPosition = (state: State, { width }: Dimension) => {
  const startPosition = 0 - width

  if (state.activeIndex === 0) {
    return startPosition
  }

  return jumpbackward(startPosition, width, state.activeIndex)
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'moveTo':
      return {
        ...state,
        ...action.payload,
      }
    case 'jumpforward':
      return {
        ...state,
        transition: true,
        activeIndex: action.payload.nextIndex,
        slideNo: action.payload.nextIndex + 1,
        position: jumpbackward(
          state.position,
          state.width,
          Math.abs(action.payload.nextIndex - state.activeIndex),
        ),
      }
    case 'jumpbackward':
      return {
        ...state,
        transition: true,
        activeIndex: action.payload.nextIndex,
        slideNo: action.payload.nextIndex + 1,
        position: jumpforward(
          state.position,
          state.width,
          Math.abs(action.payload.nextIndex - state.activeIndex),
        ),
      }
    case 'reflowToFirst':
      return {
        ...state,
        slideNo: 1,
        activeIndex: 0,
        transition: false,
        position:
          state.slideNo !== 1
            ? jumpforward(state.position, state.width, action.payload.nChildren)
            : state.position,
      }

    case 'reflowToLast':
      return {
        ...state,
        slideNo: action.payload.nChildren,
        activeIndex: action.payload.nChildren - 1,
        transition: false,
        position:
          state.slideNo !== action.payload.nChildren
            ? jumpbackward(
                state.position,
                state.width,
                action.payload.nChildren,
              )
            : state.position,
      }
    case 'updateSize':
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        transition: false,
        position: getPosition(state, action.payload),
      }
    default:
      return state
  }
}
