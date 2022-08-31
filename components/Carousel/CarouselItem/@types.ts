import React from "react";

export interface CarouselItemProps {
    children?: React.ReactNode;
    __setIndex?: (i: number) => void;
    __index?: number;
    className?: string;
    caption?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties
}