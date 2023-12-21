"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useQuery from "./hooks/useQuery";

const baseURL = "https://jsonplaceholder.typicode.com";

const API = axios.create({
  baseURL,
});

export const getPosts = () => API.get("/posts").then(({ data }) => data);
export const getPostById = (id) =>
  API.get(`/posts/${id}`).then(({ data }) => data);

const Page = () => {
  const { data, isLoading } = useQuery(getPosts, {
    onSuccess: (res) => {
      console.log("Res 123", res);
    },
  });

  // console.log("data", data);

  // const [isSuccess, setIsSuccess] = useState(false);
  // const [errors, setErrors] = useState("");
  // const [status, setStatus] = useState(FETCH_STATUS.IDLE);

  // const getData = async () => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts/")
  //     .then((res) => {
  //       setItems(res?.data);
  //       setStatus(FETCH_STATUS.SUCCESS);
  //     })
  //     .catch((error) => {
  //       setErrors(error);
  //       setStatus(FETCH_STATUS.ERROR);
  //       throw new Error(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // const isLoading = useEffect(() => {
  //   getData();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>123</div>
      {/* {items?.map((item, index) => (
        <div key={index}>{index}</div>
      ))} */}
    </div>
  );
};

export default Page;
