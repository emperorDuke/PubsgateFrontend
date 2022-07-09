import React from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  window.document 
    ? React.useLayoutEffect
    : React.useEffect;