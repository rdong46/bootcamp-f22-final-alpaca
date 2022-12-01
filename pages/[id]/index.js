import { useRouter } from "next/router";
import { useState } from "react";
import Comment from "../../components/comment";
import PostPage from "../../components/postPage";
import styles from "../../styles/Post.module.css";

const Post = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { post } = props;
  const [comment, setComment] = useState("");

  return (
    <div className={styles.center}>
      <div>
        <button
          className={styles.homeButton}
          onClick={() => {
            router.push(`/..`);
          }}
        >
          Home Page
        </button>
      </div>

      <PostPage info={post} />

      <div className={styles.box}>
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
                });
              setComment("");
            }
          }}
        >
          Comment
        </button>
        <div className={styles.comments}>
          <div className={styles.commentsLogo}>
            <span className="material-symbols-outlined">Comment</span>
          </div>
          <div className={styles.comment}>
            {`${post.comments.length}`} Comments
          </div>
        </div>
        {post.comments.length > 0 ? (
          post.comments.map((c, index) => (
            <div key={index}>
              <Comment info={c} />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/example");
  const data = await response.json();
  return {
    paths: data.map((post) => ({ params: { id: post._id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const response = await fetch(`http://localhost:3000/api/${id}`);
  const data = await response.json();
  return {
    props: {
      post: data,
    },
  };
}

export default Post;
