import React from 'react';

export interface CarouselProps {
    children?: React.ReactNode
    /**
   * Css class
   */
  className?: string;
  /**
   * time in ms before slide change
   */
  interval?: number;
  /**
   * Show thumnnails
   */
  disableIndicator?: boolean;
  disableButtons?: boolean;
  autoplay?: boolean;
  /**
   * Width of the slider
   */
  width?: number | string;
  /**
   * Height of the slider
   */
  height?: number | string;
  infinite?: boolean;
  pauseOnMouseEnter?: boolean;
  timeout?: number;
} 


export interface State {
  slideNo: number;
  position: number;
  transition: boolean;
  activeIndex: number;
  width: number;
  height: number;
}

export interface PayloadOne {
  nextIndex: number;
}

export interface PayloadTwo {
  nChildren: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export type Action =
  | { type: "moveTo"; payload: State }
  | { type: "jumpforward"; payload: PayloadOne }
  | { type: "jumpbackward"; payload: PayloadOne }
  | { type: "reflowToFirst"; payload: PayloadTwo }
  | { type: "reflowToLast"; payload: PayloadTwo }
  | { type: "updateSize"; payload: Dimension }

export interface PayloadArgument {
  state: State;
  nChildren: number;
  infinite: boolean;
}

export interface TransitionEndPayload {
  slideNo: number;
    nChildren: number;
    clone: number;
}