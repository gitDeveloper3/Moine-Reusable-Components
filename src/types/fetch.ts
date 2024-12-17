export interface FetchState<T>{
    loading:boolean;
    data:T|null;
    error:string|null;
    aborted:boolean;
}

export type FetchAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "FETCH_ABORT" }
  | { type: "RESET" };
