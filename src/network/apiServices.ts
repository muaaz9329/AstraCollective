import {Method, callApi} from './apiCaller';

type PostRequest = ({
  body,
  url,
  params,
}: {
  body?: {[key: string]: any};
  url: string;
  params?: {[key: string]: any};
  setLoading: (val: boolean) => void;
  OnSuccess: (response: any) => void;
  OnError: (error: any) => void;
}) => Promise<any>;
type GetRequest = ({
  url,
  params,
}: {
  url: string;
  params?: {[key: string]: any};
  setLoading: (val: boolean) => void;
  OnSuccess: (response: any) => void;
  OnError: (error: any) => void;
}) => Promise<any>;
const apiService: {
  Post: PostRequest;
  Get: GetRequest;
  Patch: PostRequest;
  Delete: PostRequest;
} = {
  Post: async ({body, url, params, setLoading, OnSuccess, OnError}) => {
    setLoading(true);
    if (params) {
      let query = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');
      url = url + '?' + query;
    }

    return await callApi(
      Method.POST,
      url,
      body,
      setLoading,
      OnSuccess,
      OnError,
    );
  },
  Get: async ({url, params, setLoading, OnSuccess, OnError}) => {
    setLoading(true);
    if (params) {
      let query = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');
      url = url + '?' + query;
    }
    return callApi(Method.GET, url, null, setLoading, OnSuccess, OnError);
  },
  Patch: async ({body, url, params, setLoading, OnSuccess, OnError}) => {
    setLoading(true);
    if (params) {
      let query = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');
      url = url + '?' + query;
    }

    return await callApi(
      Method.PATCH,
      url,
      body,
      setLoading,
      OnSuccess,
      OnError,
    );
  },
  Delete: async ({body, url, params, setLoading, OnSuccess, OnError}) => {
    setLoading(true);
    if (params) {
      let query = Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&');
      url = url + '?' + query;
    }

    return await callApi(
      Method.DELETE,
      url,
      body,
      setLoading,
      OnSuccess,
      OnError,
    );
  },
};

export default apiService;
