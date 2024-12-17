import { FetchAction, FetchState } from "@/types/fetch";

export const fetchActions = {
  start: () => ({ type: "FETCH_START" } as const),
  success: <T>(data: T) => ({ type: "FETCH_SUCCESS", payload: data } as const),
  error: (error: string) => ({ type: "FETCH_ERROR", payload: error } as const),
  aborted: () => ({ type: "FETCH_ABORT" } as const),
  reset: () => ({ type: "RESET" } as const),
};



export const fetchReducer=<T>(state:FetchState<T>,action:FetchAction<T>):FetchState<T>=>{

    switch (action.type) {
        case "FETCH_START":
          return { loading: true, data: null, error: null, aborted: false };
        case "FETCH_SUCCESS":
          return { loading: false, data: action.payload, error: null, aborted: false };
        case "FETCH_ERROR":
          return { loading: false, data: null, error: action.payload, aborted: false };
        case "FETCH_ABORT":
          return { loading: false, data: null, error: null, aborted: true };
        case "RESET":
          return { loading: false, data: null, error: null, aborted: false };
        default:
          return state;
      }
    
}
