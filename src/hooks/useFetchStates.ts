
import { fetchActions, fetchReducer } from "@/reducers/fetchReducer";
import { useCallback, useReducer, useRef, useState } from "react"


const useFetchWithAbort=<T>(url:string)=>{
  const [state,dispatch]=useReducer(fetchReducer<T>,{
    loading: false,
    data: null,
    error: null,
    aborted: false,
  })
  const abortControllerRef = useRef<AbortController | null>(null);
    const fetchData=useCallback( async()=>{
      if(abortControllerRef.current)abortControllerRef.current.abort();
      dispatch(fetchActions.start())
      const controller=new AbortController()
      abortControllerRef.current=controller;
      try{
        const response=await fetch(url,{signal:controller.signal})
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result=(await response.json())as T
        dispatch(fetchActions.success(result))
      }
      catch(err:any){
        if(err.name==="AbortError"){
            dispatch(fetchActions.aborted())
        } else {
            dispatch(fetchActions.error(err.message));
          }
      }
      finally{
        abortControllerRef.current = null;

      }
      
    },[url])

    const abortFetch = useCallback(() => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
      }, []);

      const reset = useCallback(() => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        dispatch(fetchActions.reset());
      }, []);
return{
    ...state,fetchData,abortFetch,reset
}
}

export default useFetchWithAbort;


