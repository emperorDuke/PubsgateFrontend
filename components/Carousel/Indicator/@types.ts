import { Dimension } from "../@types";

export interface IndicatorProps {
    nChildren?: number;
    activeIndex: number;
    setIndex: (i:number) => void;
    dotDimension: Dimension;
}