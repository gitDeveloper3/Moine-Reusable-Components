import React, { useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import useFetchWithAbort from "@/hooks/useFetchStates";

interface FetchDataButtonProps {
  url: string;  // URL to fetch data from
  onSuccess?: (data: any) => void;  // Callback for when data is successfully fetched
  onError?: (error: string) => void; // Callback for when an error occurs
  onAbort?: () => void;             // Callback for when fetch is aborted
  buttonText?: string;              // Custom text for the button
  buttonVariant?: "contained" | "outlined"; // Custom button variant
  children?: React.ReactNode;       // Allow for other children inside the button
}

const FetchDataButton: React.FC<FetchDataButtonProps> = ({
  url,
  onSuccess,
  onError,
  onAbort,
  buttonText = "Fetch Data",
  buttonVariant = "contained",
  children,
}) => {
  const { loading, fetchData, abortFetch, reset, data, error, aborted } = useFetchWithAbort(url);

  // Use useEffect to handle the side effects after state updates
  useEffect(() => {
    if (data && onSuccess) {
      onSuccess(data);
    }
  }, [data, onSuccess]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (aborted && onAbort) {
      onAbort();
    }
  }, [aborted, onAbort]);

  return (
    <div>
      {/* Fetch Data Button */}
      <Button
        variant={buttonVariant}
        onClick={fetchData}
        disabled={loading} // Disable button while loading
        endIcon={loading && <CircularProgress color="inherit" size={20} />}
        sx={{ marginRight: 2 }} // Space between buttons
      >
        {loading ? "Loading..." : buttonText}
        {children}  {/* Allow for additional content like icons or labels */}
      </Button>

      {/* Abort Button */}
      {loading && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={abortFetch}
          sx={{ marginRight: 2 }} // Space between buttons
        >
          Abort Fetch
        </Button>
      )}

      {/* Reset Button */}
      {children && (
        <Button
          variant="outlined"
          color="primary"
          onClick={reset}
          sx={{ marginRight: 2 }} // Space between buttons
        >
          Reset
        </Button>
      )}
    </div>
  );
};

export default FetchDataButton;
