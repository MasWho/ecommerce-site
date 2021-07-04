import { data } from "browserslist";
import { useState, useCallback } from "react"

/**
 * Custom hook for making http requests using the Fetch API.
 * Provides state logic for loading and error.
 */
const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * send request to a url specified with params passed.
     * Optionally pass in a call back to handle the response received.
     * @param {String} url 
     * @param {Object} params 
     * @param {Function} handleSuccessResponse 
     * @param {Function} handleErrorResponse 
     */
    const request = useCallback(async (url, params, handleSuccessResponse, handleErrorResponse) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {...params});
            const data = await response.json();  // Assume always json response
            
            if(!response.ok) {
                let errorMessage = 'Authentication failed!';

                // This is for data structure from firebase auth rest api
                if(data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }

                throw new Error(errorMessage);
            }

            // If response is okay and no errors, then successful request
            handleSuccessResponse && await handleSuccessResponse(data);
        } catch (error) {
            // Handle error if specified
            handleErrorResponse && handleErrorResponse(data);
            setError(error);
        }

        setLoading(false);
    }, []);

    return {
        loading: loading,
        error: error,
        request: request
    };
};

export default useHttp;