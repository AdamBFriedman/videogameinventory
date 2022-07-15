import { useCallback, useEffect, useRef } from "react";

export const useIsMounted = () => {
    const isMountedRef = useRef(true)
    useEffect(() => {    
      return () => {
        isMountedRef.current = false
      }
    }, [isMountedRef])
    return useCallback(() => isMountedRef.current, [])
}

export default useIsMounted;