import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, []);

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
}
