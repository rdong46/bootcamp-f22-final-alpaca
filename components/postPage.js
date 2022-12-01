import React from "react";
import styles from "../styles/Post.module.css";
import { useRouter } from "next/router";

const PostPage = (props) => {
  const { info } = props;
  const router = useRouter();
  return (
    <div className={styles.box}>
      <div className={styles.first}>
        <div className={styles.title}>{info.title}</div>
        <div className={styles.date}>
          <div>{info.date.substr(0, 10)}</div>
          <div>{info.date.substr(11, 8)}</div>
        </div>
      </div>
      <div className={styles.body}>{info.body}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          className={styles.indivPageButton}
          onClick={() => {
            router.push(`/${info._id}/edit`);
          }}
        >
          Edit Post
        </button>
      </div>
    </div>
  );
};

export default PostPage;
