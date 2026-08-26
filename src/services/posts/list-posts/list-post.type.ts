import type { IPost } from "../type";

export interface IListPostsRequest {
  page: number;
  size: number;
  search?: string
}

export interface IListPostsSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface IListPostsPageable {
  pageNumber: number;
  pageSize: number;
  sort: IListPostsSort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface IListPostsData {
  totalPages: number;
  totalElements: number;
  size: number;
  content: IPost[];
  number: number;
  sort: IListPostsSort;
  pageable: IListPostsPageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type IListPostsResponse =  {
  data: IListPostsData;
}
