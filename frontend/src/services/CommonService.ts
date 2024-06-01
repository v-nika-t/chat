import { RequestService } from "./RequestService";

export class CommonService extends RequestService {
  entity;

  constructor(name_entity: string) {
    super(`${name_entity}`);
    this.entity = name_entity;
  }

  getAll = (queryParams?: {}) =>
    this.request({
      method: "get",
      queryParams,
    });

  getOne = (id: string, queryParams?: {}) =>
    this.request({ method: "get", id, queryParams });

  update = (id: string, body: {}, method?: "PATCH" | "put", headers?: {}) =>
    this.request({ method: method || "put", id, body, headers });

  create = (body: {}, headers?: {}) =>
    this.request({ method: "post", body, headers });

  delete = (id: string, body?: {}, queryParams?: {}) =>
    this.request({ method: "delete", body, queryParams, id });
}
