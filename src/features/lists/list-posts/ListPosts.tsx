import { useEffect } from "react";
import BoxContainer from "../../../atoms/box"
import { useApiResult } from "../../../hook/api/useApiResult";
import CardPost from "../../../molecules/card-post";
import { listPostsCaller } from "../../../services/posts/list-posts/list-post.svc";
import type { IPost } from "../../../services/posts/type";
import { isNull } from "../../../utils/is-null";

const ListPost = ()=>{
  const {data, isLoading, error, isError} = useApiResult(listPostsCaller)
  const posts = (data ?? []).filter((post): post is IPost => Boolean(post));

  useEffect(()=>{
    listPostsCaller.execute({
      page: 0,
      size: 10
    })
  },[])

  if (isLoading) return <div>Loading...</div>;
  
  if (isError)   return <div>Error: {error}</div>;
  
  if (!isNull(data) && posts.length === 0) return <div>No posts available.</div>;

  return (
    <BoxContainer centered variant="ghost" className="gap-4">
        {
          posts.map((post)=>{
            return <CardPost
              key={post.id ?? `${post.userId}-${post.createdAt}`}
              id={post.id ?? ""}
              author={{
                name: post.username ?? "Unknown",
                time: post.createdAt ? new Date(post.createdAt).toLocaleString() : "",
              }}
              content={post.content ?? ""}
              image={post.mediaUrl ?? undefined}
              stats={{
                likes: post.likeCount ?? 0,
                comments: post.replyCount ?? 0,
                shares: 0,
              }}
          />  
        })
      }
      </BoxContainer>
  )
}

export default ListPost
