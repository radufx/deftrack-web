import axios from 'axios';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import * as qs from 'qs';

type Request = {
  url: string;
  params?: { [key in string]: string | number };
  headers?: { [key in string]: string };
  isServer?: NextApiRequestCookies;
};

type PostRequest = {
  url: string;
  body: any;
  headers?: { [key in string]: string };
};

type DeleteRequest = {
  url: string;
  headers?: { [key in string]: string };
};
const client = axios.create({
  validateStatus: () => true,
});

export const request = async ({ url, params, isServer }: Request) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (isServer) {
    try {
      const res = await client
        .get(`${process.env.API_SERVER_URL}${url}`, {
          headers,
          params,
        })
        .then((res) => {
          return res.data;
        });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return await axios
    .get(url, {
      params,
      paramsSerializer: {
        serialize: (params: Record<string, any>) => {
          return qs.stringify(params, { encode: false });
        },
      },
      headers,
    })
    .then((res) => res.data.data);
};

export const post = async ({ url, body }: PostRequest) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return await axios.post(url, body, { headers, data: {} }).then((res) => res.data.data);
};

export const put = async ({ url, body, headers }: PostRequest) => {
  headers = {
    'Content-Type': 'application/json',
    ...headers,
  };
  return await axios.put(url, body, { headers, data: {} }).then((res) => res.data.data);
};

export const deleteRequest = async ({ url }: DeleteRequest) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return await axios.delete(url, { headers, data: {} }).then((res) => res.data.data);
};
