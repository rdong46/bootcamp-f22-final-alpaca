import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({
    _id: "",
    title: "",
    body: "",
    comments: [],
    date: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/comments`, {
      method: "POST",
      body: id,
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        console.log(data);
      });
  }, []);

  return (
    <div className={styles.center}>
      <div className={styles.box}>
        <div className={styles.first}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.date}>
            <div>{post.date.substr(0, 10)}</div>
            <div>{post.date.substr(11, 8)}</div>
          </div>
        </div>
        <div className={styles.body}>{post.body}</div>
        <div className={styles.comments}>
          <span className="material-symbols-outlined">Comment</span>
          <div className={styles.comment}>
            {`${post.comments.length}`} Comments
          </div>
        </div>
        <div>
          <form className={styles.input}>
            <input
              type="text"
              id="comment"
              placeholder="Enter comment here"
              className={styles.bodyInput}
              onChange={(event) => setComment({ content: event.target.value })}
            ></input>
          </form>
          <button
            className={styles.submitButton}
            onClick={(event) => {
              comment(event);
              console.log(addComment);
            }}
          >
            Comment
          </button>
        </div>
        {post.comments.length > 0 ? (
          post.comments.map((c, index) => (
            <div key={index}>
              <div>{c.body}</div>
              <div>{c.date}</div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
