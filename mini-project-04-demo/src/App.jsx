import { useCallback, useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "./public/movie.json",
      );
      if (!response.ok) throw new Error("failed to fetch");
      const myData = await response.json();
      setData(myData);
      setError(null);
      console.log(myData);
    } catch (err) {
      setError(err);
      console.log(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1>Mini Project 04</h1>
      {isLoading && <h1 className="text-7xl">Loading data ... please wait</h1>}
      {error && <h1 className="text-3xl text-red-600">Error: {error.message}</h1>}
      {!isLoading && data && (
        <ul className="m-10 p-3">
          {data.map((d, index) => (
            <li key={index} className="text-3xl">
              {d.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;