import { RxAxiosCaller } from "../../api.svc";
import { API_POST_ROUTERS } from "../router";
import type { IListPostsRequest, IListPostsResponse } from "./list-post.type";

class ListPostsCaller extends RxAxiosCaller<
  IListPostsResponse['data']['content'],
  IListPostsRequest,
  IListPostsResponse> {
  constructor() {
    super(API_POST_ROUTERS.GET.LIST, "GET", (raw) => raw.data.content)
  }
}

export const listPostsCaller = new ListPostsCaller()
