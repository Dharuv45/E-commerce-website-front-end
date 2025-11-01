import { useEffect,useState } from "react";

export const useDebounce = (value,delay=3000)=>{
    const [deBouncedValue, setDeBouncedValue] = useState(value);

    useEffect(()=>{
        
        const timeout = setTimeout(()=>{
            setDeBouncedValue(value)
        })

        return ()=> clearTimeout(timeout)
    },[value,delay])

    return deBouncedValue
}