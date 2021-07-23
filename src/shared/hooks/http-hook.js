import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //this is for canceling the request if the page changes while still loading
  const activeHttpRequest = useRef([]);

  //method = "GET" means that the default method will be GET. The same stands for body and headers
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method, //method: method
          body,
          headers,
          signal: httpAbortCtrl.signal, // links AbortController to this request
        });
        const responseData = await response.json(); // parse response data

        //Removes abort controller when request finishes
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          //Check for 400ish and 500ish errors
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  //Clenup function
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
