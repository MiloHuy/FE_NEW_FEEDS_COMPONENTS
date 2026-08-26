const PREFIX_POSTS = '/posts'

export const API_POST_ROUTERS = {
  GET: {
    DETAIL: `${PREFIX_POSTS}`,
    LIST: PREFIX_POSTS
  },
  POST: {
    CREATE: "/posts",
    LIKE: "/{id}/like"
  }
}
