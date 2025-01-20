"use client";
import React, { useState, useEffect } from "react";

interface ApiResponseItem {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [data, setData] = useState<ApiResponseItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: ApiResponseItem[]) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      {error ? (
        <p>Error fetching data: {error}</p>
      ) : data.length > 0 ? (
        <div>
          <h2>Data Received</h2>
          {data.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
