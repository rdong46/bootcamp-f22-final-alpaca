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
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/get`, {
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
        <div >
         <button
            className={styles.homeButton}
            onClick={() => {
              router.push(`/..`);
            }}
          >
            Home Page
        </button>
    </div>
      <div className={styles.box}>
        <div className={styles.first}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.date}>
            <div>{post.date.substr(0, 10)}</div>
            <div>{post.date.substr(11, 8)}</div>
          </div>
        </div>
        <div className={styles.body}>{post.body}</div>
        <div>
          <button 
            className={styles.indivPageButton}
            onClick={() => {
              router.push(`/${post._id}/edit`);
            }}
          >
            Edit Post
          </button>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.comments}>
          <div className={styles.commentsLogo}>
          <span className="material-symbols-outlined">Comment</span>
          </div>
          <div className={styles.comment}>
            {`${post.comments.length}`} Comments
          </div>
        </div>
        <div>
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

          <div className={styles.form}>
            <form className={styles.input}>
            <textarea
                  id="text"
                  placeholder="Enter new comment here"
                  className={styles.bodyInput}
                  value={comment}
              
                  onChange={(event) => setComment(event.target.value)}
              ></textarea>
          </form>
          </div>

          <button
            className={styles.indivPageButton}
            onClick={() => {
              if (comment !== "") {
                let body = { id: id, content: { body: comment } };
                fetch("http://localhost:3000/api/addComment", {
                  method: "POST",
                  body: JSON.stringify(body),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    let copy = { ...post };
                    copy.comments.unshift({ body: data.body, date: data.date });
                    setPost(copy);
                    console.log(copy);
                  });
                setComment("");
              }
            }}
          >
            Comment
          </button>
    </div>
    </div>
  );
}
