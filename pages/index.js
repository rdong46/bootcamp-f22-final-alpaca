import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import temp from "../public/download.jpg";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home(props) {
  const { posts } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCurrentPosts(posts.slice(pageNumber * 10, pageNumber * 10 + 10));
  }, []);

  function moveBack() {
    setPageNumber(pageNumber - 1);
    setCurrentPosts(
      posts.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10)
    );
    setAddPost(false);
  }

  function moveFoward() {
    setPageNumber(pageNumber + 1);
    setCurrentPosts(
      posts.slice((pageNumber + 1) * 10, (pageNumber + 1) * 10 + 10)
    );
    setAddPost(false);
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={temp} alt="logo" width={72} height="auto" />
          <div>ALPACA</div>
        </div>
      </div>
      <div className={styles.posts}>
        {!addPost ? (
          <div className={styles.submit}>
            <Image src={temp} alt="logo" width={36} height="auto" />
            <button
              className={styles.create}
              style={{ color: "inherit", textDecoration: "inherit" }}
              onClick={() => {
                setAddPost(true);
              }}
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className={styles.submit}>
            <div className={styles.input}>
              <form className={styles.input}>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className={styles.titleInput}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                ></input>
                <textarea
                  id="text"
                  placeholder="Text"
                  className={styles.bodyInput}
                  onChange={(e) => {
                    setNewBody(e.target.value);
                  }}
                ></textarea>
              </form>
              <button
                className={styles.submitButton}
                onClick={() => {
                  if (!newBody == "" && !newTitle == "") {
                    const body = {
                      title: newTitle,
                      body: newBody,
                      comments: [],
                    };
                    setAddPost(false);
                    fetch("http://localhost:3000/api/add", {
                      method: "POST",
                      body: JSON.stringify(body),
                    })
                      .then((response) => {
                        return response.json();
                      })
                      .then((data) => router.push(`/${data._id}`));
                  }
                }}
              >
                Post
              </button>
            </div>
          </div>
        )}
        <div>
          {currentPosts.map((post, index) => {
            return (
              <Link
                href={`/${post._id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <div className={styles.box} id={index}>
                  <div className={styles.first}>
                    <div className={styles.title}>{post.title}</div>
                    <div className={styles.date}>
                      <div>{post.date.substr(0, 10)}</div>
                      <div>{post.date.substr(11, 8)}</div>
                    </div>
                  </div>
                  <div className={styles.body}>{post.body}</div>
                  <div className={styles.bottom}>
                    <div className={styles.comments}>
                      <span className="material-symbols-outlined">Comment</span>
                      <div className={styles.comment}>
                        {`${post.comments.length}`} Comments
                      </div>
                    </div>
                    <Link
                      href={`/${post._id}/edit`}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {pageNumber > 0 ? (
              <div className={styles.button} onClick={moveBack}>
                {"<"}
              </div>
            ) : (
              <div></div>
            )}
            {posts.length > pageNumber * 10 + 10 ? (
              <div className={styles.button} onClick={moveFoward}>
                {">"}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/example");
  const data = await response.json();
  return {
    props: {
      posts: data,
    },
  };
}
