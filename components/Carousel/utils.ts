import { PayloadArgument } from "./@types";

export function jumpforward(
  position: number,
  offset: number,
  nTime: number = 0
) {
  return nTime === 0 ? position + offset : position + (offset * nTime);
}

export function jumpbackward(
  position: number,
  offset: number,
  nTime: number = 0
) {
  return nTime === 0 ? position + -offset : position + -(offset * nTime);
}

export function getNextPayload({
  nChildren,
  state,
  infinite,
}: PayloadArgument) {
  let activeIndex = state.activeIndex === nChildren - 1 ? 0 : state.activeIndex + 1;
  let transition = true;
  let slideNo = 0;
  let position = 0;
  const width = state.width;
  const height = state.height;

  if (infinite) {
    slideNo = state.slideNo + 1;
    position = jumpbackward(state.position, width);

    return {
      activeIndex,
      transition,
      slideNo,
      position,
      height,
      width,
    };
  } else {
    position =
      state.activeIndex === nChildren - 1
        ? jumpforward(state.position, width, nChildren - 1)
        : jumpbackward(state.position, width);

    return {
      activeIndex,
      transition,
      slideNo,
      position,
      height,
      width,
    };
  }
}

export function getPrevPayload({
  nChildren,
  state,
  infinite,
}: PayloadArgument) {
  let activeIndex =
    state.activeIndex === 0 ? nChildren - 1 : state.activeIndex - 1;
  let transition = true;
  let slideNo = 0;
  let position = 0;
  const width = state.width;
  const height = state.height;

  if (infinite) {
    slideNo = state.slideNo - 1;
    position = jumpforward(state.position, width);

    return {
      activeIndex,
      transition,
      slideNo,
      position,
      height,
      width,
    };
  } else {
    position =
      state.activeIndex === 0
        ? jumpbackward(state.position, width, nChildren - 1)
        : jumpforward(state.position, width);

    return {
      activeIndex,
      transition,
      slideNo,
      position,
      height,
      width,
    };
  }
}
