import { useEffect, useState, useRef } from 'react'

function useSticky() {
    const [isSticky, setSticky] = useState(false);
    const sticky = useRef(null);

    const handleScroll = () => {
        window.scrollY > -40
        ? setSticky(true)
        : setSticky(false)
    }

    const debounce = (func, wait = 20, immediate = true) => {
        let timeOut
        return () => {
          let context = this,
            args = arguments
          const later = () => {
            timeOut = null
            if (!immediate) func.apply(context, args)
          }
          const callNow = immediate && !timeOut
          clearTimeout(timeOut)
          timeOut = setTimeout(later, wait)
          if (callNow) func.apply(context, args)
        }
      }

      useEffect(() => {
        window.addEventListener("scroll", debounce(handleScroll))
        return () => {
          window.removeEventListener("scroll", () => handleScroll)
        }
      }, [debounce, handleScroll])
    
      return { isSticky, sticky }
    }

export default useSticky;