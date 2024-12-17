"use client"
import React, { useState } from "react";
import { Typography } from "@mui/material";
import FetchDataButton from "./FetchDataButton";

const StandaloneComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (fetchedData: any) => {
    console.log("success")
    setData(fetchedData);
    setError(null); // Reset error on success
  };

  const handleError = (fetchError: string) => {
    console.log("error")
    setError(fetchError);
    setData(null); // Reset data on error
  };

  const handleAbort = () => {
    console.log("Fetch aborted");
  };

  return (
    <div>
      <FetchDataButton
        url="https://jsonplaceholder.typicode.com/users/1"
        onSuccess={handleSuccess}
        onError={handleError}
        onAbort={handleAbort}
        buttonText="Fetch User Data"
      />
      {error && <Typography color="error">{error}</Typography>}
      {data && (
        <div>
          <h1>User Data</h1>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
        </div>
      )}
    </div>
  );
};

export default StandaloneComponent;
