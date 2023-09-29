import { useState, useEffect } from "react";
type Adress = {
  street: string;
  city: string;
  suite: string;
  zipcode: string;
  geo: {
    lat: string;
    lon: string;
  };
};

type Company = {
  bs: string;
  catchPharase: string;
  name: string;
};

type Items = {
  adress: Adress;
  company: Company;
  name: string;
  id: number;
  email: string;
  phone: string;
  username: string;
  website: string;
};

export function useData() {
  const [apiData, setApiData] = useState<Items[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setApiData(json));
  }, []);

  return apiData;
}
