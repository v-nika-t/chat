export type method = "get" | "post" | "put" | "delete" | "PATCH";

export interface IParamsRequest {
  method: method;
  path?: string;
  id?: string;
  body?: {};
  queryParams?: {} | string;
  headers?: {};
}
