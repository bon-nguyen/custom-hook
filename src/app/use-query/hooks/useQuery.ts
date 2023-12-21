import { useEffect, useState } from "react";

export const FETCH_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

interface IQueryConfig<T> {
  onSuccess?: (data: T) => void;
  onError?: (data: Error) => void;
}

const defaultConfig = {
  onSuccess: () => {},
  onError: () => {},
};

const useQuery = <T>(
  fn: () => Promise<T>,
  config: IQueryConfig<T> = defaultConfig
) => {
  const [state, setState] = useState({
    data: null as T | null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: "",
  });

  const { onSuccess, onError } = config;

  const runQuery = () => {
    if (!fn) return null;

    setState((prev) => ({ ...prev, isLoading: true }));

    fn()
      .then((data) => {
        setState((prev) => ({
          ...prev,
          data: data,
          isSuccess: true,
          isLoading: false,
        }));
        onSuccess && onSuccess(data);
      })
      .catch((error: Error) => {
        setState({
          data: null,
          isLoading: false,
          isSuccess: false,
          isError: false,
          error: error.message || "Failed to fetch",
        });
        onError && onError(error);
      });
  };

  useEffect(() => {
    runQuery();
  }, []);

  return {
    ...state,
    refetch: runQuery,
  };
};

export default useQuery;
