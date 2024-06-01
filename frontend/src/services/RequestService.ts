import { IParamsRequest } from "./interfaces";
export class RequestService {
  url = process.env.REACT_APP_URL_API || "";

  constructor(name_entity: string) {
    this.url += `/${name_entity}`;
  }

  request = async ({
    method = "get",
    path,
    id,
    body,
    queryParams,
    headers,
  }: IParamsRequest) => {
    let fetchURL = this.url;
    const options: any = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (path) fetchURL += `/${path}`;
    if (queryParams) {
      if (typeof queryParams === "string") {
        fetchURL += queryParams;
      } else {
        fetchURL += `?${new URLSearchParams(queryParams)}`;
      }
    }
    if (body) {
      if (options.headers["Content-Type"] === "application/json")
        options["body"] = JSON.stringify(body);

      if (options.headers["Content-Type"] === "multipart/form-data") {
        options["body"] = body;
        delete options.headers["Content-Type"];
      }

      if (
        options.headers["Content-Type"] === "application/x-www-form-urlencoded"
      )
        options["body"] = body;
    }

    if (id) fetchURL += `/${id}`;

    const res = await fetch(fetchURL, options);
    let resJson = null;

    try {
      resJson = await res.json();
    } catch (e) {}

    if (res?.ok && !resJson?.error) {
      return resJson;
    } else {
      let message = resJson?.message;
      if (resJson?.error) message = resJson;
      return Promise.reject(message);
    }
  };
}
