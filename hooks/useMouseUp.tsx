import { useEffect, useRef } from "react";

export default function useMouseUp(ref: any,callback: any) {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      callback(e);
    }
    document.addEventListener('mouseup', listener);
    return () => {
      document.removeEventListener('mouseup', listener);
    }
  } , [ref]);
  return null;
}
