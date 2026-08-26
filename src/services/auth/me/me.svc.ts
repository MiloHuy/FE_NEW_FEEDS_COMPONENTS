import { RxAxiosCaller } from "../../api.svc";
import { API_AUTH_ROUTERS } from "../router";
import type { IMeRequest, IMeResponse } from "./me.type";

class MeSvcCaller extends RxAxiosCaller<
  IMeResponse,
  IMeRequest,
  IMeResponse
> {
  constructor() {
    super(API_AUTH_ROUTERS.GET.ME, "GET", (raw) => raw)
  }
}

export const meSvcCaller = new MeSvcCaller();
